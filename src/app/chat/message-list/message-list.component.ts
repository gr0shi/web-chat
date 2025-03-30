import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { MessageService } from './../../shared/services/Message.service';

@Component({
  selector: 'app-message-list',
  imports: [
    MatCardModule,
    MatDividerModule,
    MatListModule,
    CommonModule
  ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  welcomeTime = new Date();
  private destroy$ = new Subject<void>();

  constructor(
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.messageService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = [...messages];
        this.cdr.detectChanges();
      });
  }

  trackByMessage(index: number, message: any): string {
    return message.time + message.tabId;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
