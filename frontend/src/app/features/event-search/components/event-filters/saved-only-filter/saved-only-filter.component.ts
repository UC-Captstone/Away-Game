import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-saved-only-filter',
  templateUrl: './saved-only-filter.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SavedOnlyFilterComponent {
  @Input() savedOnly: boolean = false;
  @Output() savedOnlyChange = new EventEmitter<boolean>();
}
