import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-search-filter',
  templateUrl: './event-search-filter.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EventSearchFilterComponent {
  @Input() keyword = '';
  @Output() keywordChange = new EventEmitter<string>();

  onKeywordInput(value: string): void {
    this.keywordChange.emit(value);
  }
}
