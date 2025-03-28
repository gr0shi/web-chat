import { Injectable } from '@angular/core';
import { UserService } from './User.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private userService: UserService) {}

  private getMessageKey(): string {
    const username = this.userService.getUsername();
    return `user_${username}_messages`;
  }

  getMessage(): string | null {
    return localStorage.getItem(this.getMessageKey());
  }

  setMessage(chatMessage: string): void {
    localStorage.setItem(this.getMessageKey(), chatMessage);
  }

}
