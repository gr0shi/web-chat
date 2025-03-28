import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  imports: [FormsModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent {

}
