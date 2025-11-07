import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  standalone: true,
})
export class PopupModalComponent {
  @Input() open: boolean = false;
  @Input() title: string = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
  @Input() closeOnBackdrop: boolean = true;
  @Output() closed = new EventEmitter<void>();

  titleID = `modal-title-${Math.random().toString(36).slice(2)}`;

  get panelSizeClass(): string {
    switch (this.size) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'xl':
        return 'max-w-xl';
      default:
        return 'max-w-lg';
    }
  }

  requestClose() {
    this.closed.emit();
  }

  onBackdropClick() {
    this.closed.emit();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) this.requestClose();
  }
}
