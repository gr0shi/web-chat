import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MessageService } from '../../shared/services/Message.service';
import { UserService } from '../../shared/services/User.service';

// import { MessageListComponent } from '../message-list/message-list.component';

import { EnterSubmitDirective } from '../../shared/directives/EnterSubmit.directive';

@Component({
  selector: 'app-message-form',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    EnterSubmitDirective
  ],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.css'
})
export class MessageFormComponent {
  newMessage: string = '';

  constructor(
    public userService: UserService,
    private messageService: MessageService,
    // private messageListComponent: MessageListComponent
  ) {}

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messageService.addMessage(this.newMessage.trim());
      this.newMessage = '';
      // this.messageListComponent.loadMessages();
    }
  }
}
