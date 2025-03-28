import { Component } from '@angular/core';
import { MessageListComponent } from "./message-list/message-list.component";
import { MessageFormComponent } from "./message-form/message-form.component";

@Component({
  selector: 'app-chat',
  imports: [ MessageListComponent, MessageFormComponent ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
