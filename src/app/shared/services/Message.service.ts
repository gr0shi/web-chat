import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnDestroy {
  private readonly MESSAGES_KEY = 'chat_messages';
  private readonly channelName = 'chat_channel';
  private broadcastChannel = new BroadcastChannel(this.channelName);
  private destroy$ = new Subject<void>();
  private tabId = Math.random().toString(36).substr(2, 9); // Уникальный ID вкладки

  private messagesSubject = new BehaviorSubject<any[]>(this.getMessages());
  messages$ = this.messagesSubject.asObservable();

  constructor(private ngZone: NgZone) {
    this.setupChannelListener();
  }

  private setupChannelListener() {
    this.broadcastChannel.onmessage = (event) => {
      this.ngZone.run(() => { // Запускаем в зоне Angular
        if (event.data.type === 'NEW_MESSAGE' && event.data.tabId !== this.tabId) {
          this.handleNewMessage(event.data.payload);
        }
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
      time: new Date().toISOString(),
      tabId: this.tabId // Добавляем идентификатор вкладки
    };

    const messages = this.getMessages();
    messages.push(newMessage);
    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
    this.messagesSubject.next(messages);

    this.broadcastChannel.postMessage({
      type: 'NEW_MESSAGE',
      payload: newMessage,
      tabId: this.tabId // Отправляем ID текущей вкладки
    });
  }

  getMessages(): any[] {
    const messages = localStorage.getItem(this.MESSAGES_KEY);
    return messages ? JSON.parse(messages) : [];
  }

  private handleNewMessage(message: any) {
    const messages = this.getMessages();
    if (!messages.some(m =>     // Проверяем, нет ли уже такого сообщения
      m.time === message.time &&
      m.tabId === message.tabId
    )) {
      messages.push(message);
      localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
      this.messagesSubject.next(messages);
    }
  }

  private sendSyncResponse() {
    this.broadcastChannel.postMessage({
      type: 'SYNC_RESPONSE',
      payload: this.getMessages()
    });
  }

  requestSync() {
    this.broadcastChannel.postMessage({ type: 'SYNC_REQUEST' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.broadcastChannel.close();
  }
}
