import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayChecklistItem } from '../../types/day.types';

@Component({
  selector: 'app-day-checklist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-checklist.html',
  styleUrls: ['./day-checklist.css']
})
export class DayChecklistComponent {
  @Input() items: DayChecklistItem[] = [];
  @Output() itemsChange = new EventEmitter<DayChecklistItem[]>();
  @Output() itemToggled = new EventEmitter<DayChecklistItem>();

  onToggle(item: DayChecklistItem) {
    item.checked = !item.checked;
    this.itemToggled.emit(item);
    this.itemsChange.emit(this.items.slice());
  }
}
