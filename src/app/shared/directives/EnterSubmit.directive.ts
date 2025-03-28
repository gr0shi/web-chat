import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appEnterSubmit]'
})
export class EnterSubmitDirective {
  @Output() appEnterSubmit = new EventEmitter();

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.preventDefault();
    this.appEnterSubmit.emit();
  }

  constructor() { }
}
