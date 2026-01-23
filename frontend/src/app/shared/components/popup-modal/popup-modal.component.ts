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
  @Input() isLoading: boolean = false;
  @Output() closed = new EventEmitter<void>();
  @Output() openChange = new EventEmitter<boolean>();

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
    if (this.isLoading) return;
    this.openChange.emit(false);
    this.closed.emit();
  }

  onBackdropClick() {
    if (this.isLoading) return;
    if (!this.closeOnBackdrop) return;
    this.openChange.emit(false);
    this.closed.emit();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) this.requestClose();
  }
}
