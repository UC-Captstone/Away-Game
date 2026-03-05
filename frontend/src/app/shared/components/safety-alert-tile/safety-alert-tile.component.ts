import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ISafetyAlert } from '../../models/safety-alert';

@Component({
  selector: 'app-safety-alert-tile',
  templateUrl: './safety-alert-tile.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class SafetyAlertTileComponent {
  @Input() alert!: ISafetyAlert;
}
