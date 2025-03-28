import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { MessageService } from './../../shared/services/Message.service';

@Component({
  selector: 'app-message-list',
  imports: [ MatCardModule, CommonModule ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.messageService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = [...messages]; // Создаем новый массив
        this.cdr.detectChanges(); // Принудительно запускаем обнаружение изменений
      });
  }

  trackByMessage(index: number, message: any): string {
    return message.timestamp + message.tabId; // Уникальный ключ для трекинга
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
