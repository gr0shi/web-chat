import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USERNAME_KEY = 'chat_username';    // Ключ для хранения пользователей в localStorage

  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  // Получает имя пользователя из localStorage
  getUsername(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.USERNAME_KEY);
    }
    return null;
  }

  // Устанавливает имя пользователя в localStorage
  setUsername(username: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.USERNAME_KEY, username);
    }
  }

  // Проверяет, есть ли пользователь в localStorage
  hasUsername(): boolean {
    return this.getUsername() !== null;
  }
}
