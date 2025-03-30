import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnDestroy {
  private readonly MESSAGES_KEY = 'chat_messages';                    // Ключ для хранения сообщений в localStorage
  private readonly channelName = 'chat_channel';                      // Имя канала для BroadcastChannel
  private broadcastChannel = new BroadcastChannel(this.channelName);  // Канал для межвкладкового взаимодействия
  private destroy$ = new Subject<void>();                             // Subject для управления отпиской от observable
  private tabId = Math.random().toString(36).substr(2, 9);            // Уникальный ID вкладки для идентификации сообщений

  // BehaviorSubject для хранения текущего состояния сообщений
  private messagesSubject = new BehaviorSubject<any[]>(this.getMessages());
  // Public observable для компонентов
  messages$ = this.messagesSubject.asObservable();

  constructor(private ngZone: NgZone) {
    this.setupChannelListener();
  }

  // Настраивает обработчик сообщений из BroadcastChannel
  private setupChannelListener() {
    this.broadcastChannel.onmessage = (event) => {
      // Запускаем обработку в зоне Angular, чтобы обновления UI работали корректно
      this.ngZone.run(() => {
        // Обработка нового сообщения из другой вкладки
        if (event.data.type === 'NEW_MESSAGE' && event.data.tabId !== this.tabId) {
          this.handleNewMessage(event.data.payload);
        }
        // Обработка запроса синхронизации
        if (event.data.type === 'SYNC_REQUEST') {
          this.sendSyncResponse();
        }
      });
    };
  }

  addMessage(message: string, author: string): void {
    const newMessage = {
      text: message,
      author: author,
      time: new Date().toISOString(), // Время
      tabId: this.tabId // Идентификатор вкладки-отправителя
    };

    // Получаем текущие сообщения и добавляем новое
    const messages = this.getMessages();
    messages.push(newMessage);

    // Сохраняем в localStorage
    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
    // Уведомляем подписчиков
    this.messagesSubject.next(messages);

    // Отправляем сообщение в другие вкладки
    this.broadcastChannel.postMessage({
      type: 'NEW_MESSAGE',
      payload: newMessage,
      tabId: this.tabId
    });
  }

  // Получает сообщения из localStorage
  getMessages(): any[] {
    const messages = localStorage.getItem(this.MESSAGES_KEY);
    return messages ? JSON.parse(messages) : [];
  }

  private handleNewMessage(message: any) {
    const messages = this.getMessages();
    // Проверяем, нет ли уже такого сообщения (защита от дублирования)
    if (!messages.some(m =>
      m.time === message.time &&
      m.tabId === message.tabId
    )) {
      messages.push(message);
      localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
      this.messagesSubject.next(messages);
    }
  }

  // Отправляет текущее состояние сообщений в ответ на запрос синхронизации
  private sendSyncResponse() {
    this.broadcastChannel.postMessage({
      type: 'SYNC_RESPONSE',
      payload: this.getMessages()
    });
  }

  // Запрашивает синхронизацию сообщений с другими вкладками
  requestSync() {
    this.broadcastChannel.postMessage({ type: 'SYNC_REQUEST' });
  }


  // Очистка ресурсов при уничтожении сервиса
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.broadcastChannel.close();
  }
}
