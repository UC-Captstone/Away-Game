import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class BackButtonComponent {
  @Input() routerLink?: string;
  @Input() label: string = 'Back';
  @Input() position: 'absolute' | 'relative' = 'absolute';
  @Input() positionClasses: string = 'left-6';
  @Input() disabled: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
