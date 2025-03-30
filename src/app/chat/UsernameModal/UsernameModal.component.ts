import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserService } from '../../shared/services/User.service';

import { EnterSubmitDirective } from '../../shared/directives/EnterSubmit.directive';

@Component({
  selector: 'app-username-modal',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EnterSubmitDirective
  ],
  templateUrl: './UsernameModal.component.html',
  styleUrl: './UsernameModal.component.css'
})
export class UsernameModalComponent {
  username: string = '';
  @Output() usernameSaved = new EventEmitter<void>();

  constructor(
    public userService: UserService
  ) {}

  saveUsername(): void {
    if (this.username.trim()) {
      this.userService.setUsername(this.username.trim());
      this.usernameSaved.emit();
    }
  }
}
