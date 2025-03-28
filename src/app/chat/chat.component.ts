import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../shared/services/User.service';

import { MessageListComponent } from './message-list/message-list.component';
import { MessageFormComponent } from "./message-form/message-form.component";
import { UsernameModalComponent } from "./UsernameModal/UsernameModal.component";

@Component({
  selector: 'app-chat',
  imports: [ MessageListComponent, MessageFormComponent, UsernameModalComponent, CommonModule ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  onUsernameSaved(): void {
    console.log('Имя пользователя сохранено');
  }
}
