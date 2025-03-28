import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USERNAME_KEY = 'chat_username';
  private readonly SESSION_FLAG = 'active_session';

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  setUsername(username: string): void {
    localStorage.setItem(this.USERNAME_KEY, username);
    sessionStorage.setItem(this.SESSION_FLAG, 'true');
  }

  hasUsername(): boolean {
    return !!this.getUsername() && !!sessionStorage.getItem(this.SESSION_FLAG);
  }
}
