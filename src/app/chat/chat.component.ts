import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { UserService } from '../shared/services/User.service';

import { MessageListComponent } from './message-list/message-list.component';
import { MessageFormComponent } from "./message-form/message-form.component";
import { UsernameModalComponent } from "./UsernameModal/UsernameModal.component";

@Component({
  selector: 'app-chat',
  imports: [
    MessageListComponent,
    MessageFormComponent,
    UsernameModalComponent,
    CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  isBrowser = false;

  constructor(
    public userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
