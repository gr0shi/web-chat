import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USERNAME_KEY = 'chat_username';    // Ключ для хранения пользователей в localStorage

  // Получает имя пользователя из localStorage
  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  // Устанавливает имя пользователя в localStorage
  setUsername(username: string): void {
    localStorage.setItem(this.USERNAME_KEY, username);
  }

  // Проверяет, есть ли пользователь в localStorage
  hasUsername(): boolean {
    return this.getUsername() !== null;
  }
}
