import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MessageService } from '../../shared/services/Message.service';

import { EnterSubmitDirective } from '../../shared/directives/EnterSubmit.directive';

@Component({
  selector: 'app-message-form',
  imports: [ MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule, EnterSubmitDirective ],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.css'
})
export class MessageFormComponent {
  constructor(private messageService: MessageService) { }
  chatMessage = '';

  submitMessage() {
    console.log('Отправлено:', this.chatMessage);
    this.messageService.setMessage(this.chatMessage);
    this.chatMessage = '';
  }
}
