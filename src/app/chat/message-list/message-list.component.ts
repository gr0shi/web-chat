import { Component } from '@angular/core';
import { MessageUserComponent } from "./message-user/message-user.component";

@Component({
  selector: 'app-message-list',
  imports: [MessageUserComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {

}
