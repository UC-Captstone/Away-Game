import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class DateRangeFilterComponent {
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Output() startDateChange = new EventEmitter<string>();
  @Output() endDateChange = new EventEmitter<string>();

  onStartDateChange(value: string): void {
    this.startDateChange.emit(value);
  }

  onEndDateChange(value: string): void {
    this.endDateChange.emit(value);
  }
}
