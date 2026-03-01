import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LocationFilterComponent {
  @Input() locationQuery: string = '';
  @Output() locationQueryChange = new EventEmitter<string>();
}
