import { Injectable } from '@angular/core';
import { UserService } from './User.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly MESSAGES_KEY = 'chat_messages';
  private messagesSubject = new BehaviorSubject<any[]>(this.getMessages())

  messages$ = this.messagesSubject.asObservable();

  constructor(private userService: UserService) {}

  // Получаем все сообщения
  getMessages(): any[] {
    const messages = localStorage.getItem(this.MESSAGES_KEY);
    return messages ? JSON.parse(messages) : [];
  }

  // Добавляем новое сообщение
  addMessage(message: string): void {
    const messages = this.getMessages();
    const newMessage = {
      text: message,
      author: this.userService.getUsername(),
      time: new Date().toISOString()
    };
    messages.push(newMessage);
    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
    this.messagesSubject.next(messages);
  }
}
