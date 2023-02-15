import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-confirmation-prompt',
  templateUrl: './confirmation-prompt.component.html',
  styleUrls: ['./confirmation-prompt.component.css']
})
export class ConfirmationPromptComponent {
  @Input() message = "";

  @Output() answer: EventEmitter<boolean> = new EventEmitter<boolean>();

  public closePrompt() {
    this.answer.emit(false);
  }

  public confirm() {
    this.answer.emit(true);
  }
}
