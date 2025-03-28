import { Component } from '@angular/core';
import { MessageInputComponent } from "./message-input/message-input.component";
import { MessageButtonComponent } from "./message-button/message-button.component";

@Component({
  selector: 'app-message-form',
  imports: [ MessageInputComponent, MessageButtonComponent ],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.css'
})
export class MessageFormComponent {

}
