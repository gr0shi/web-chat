import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { UsernameModalComponent } from './chat/UsernameModal/UsernameModal.component';
import { MessageFormComponent } from './chat/message-form/message-form.component';
import { MessageListComponent } from './chat/message-list/message-list.component';

@NgModule({
  declarations: [
    // AppComponent,
    // ChatComponent,
    // UsernameModalComponent,
    // MessageFormComponent,
    // MessageListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }
