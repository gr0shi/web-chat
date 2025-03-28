import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-message-user',
  imports: [ MatCardModule ],
  templateUrl: './message-user.component.html',
  styleUrl: './message-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageUserComponent {
  LoremIpsum: string = `Ipsum justo et duo diam voluptua sadipscing. Kasd no ea sit invidunt sadipscing no erat dolore ipsum. Et et rebum lorem magna diam sed rebum nonumy. Kasd aliquyam at amet takimata aliquyam, et et ea sea vero voluptua sanctus, sanctus aliquyam consetetur ea diam diam. Ut eirmod tempor ipsum amet.`
}
