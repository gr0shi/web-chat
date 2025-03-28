import { Component } from '@angular/core';
import { MessageUserComponent } from "./message-user/message-user.component";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-message-list',
  imports: [ MessageUserComponent, MatCardModule ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {

}
