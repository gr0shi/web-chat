import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog';

import { MessageService } from '../../shared/services/Message.service';
import { UserService } from '../../shared/services/User.service';

import { EnterSubmitDirective } from '../../shared/directives/EnterSubmit.directive';

@Component({
  selector: 'app-message-form',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogActions,
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
    private messageService: MessageService,
    private userService: UserService
  ) {}

  sendMessage(): void {
    if (this.newMessage.trim() && this.userService.getUsername()) {
      this.messageService.addMessage(
        this.newMessage.trim(),
        this.userService.getUsername()!
      );
      this.newMessage = '';
    }
  }
}
