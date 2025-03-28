import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { MessageService } from './../../shared/services/Message.service';
// import { UserService } from '../../shared/services/User.service';

@Component({
  selector: 'app-message-list',
  imports: [ MatCardModule, CommonModule ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {

  messages: any[] = [];

  constructor(
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadMessages();

    this.messageService.messages$.subscribe(
      messages => {
        this.messages = messages;
      }
    )
  }

  loadMessages(): void {
    this.messages = this.messageService.getMessages();
  }
}
