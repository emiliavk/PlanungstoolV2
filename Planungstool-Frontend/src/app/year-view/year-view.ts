import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuiCheckboxComponent, BuiCheckboxModule } from '@buhler/ui-core';

interface WeekItem {
  label: string;
  checked: boolean;
}

@Component({
  selector: 'app-year-view',
  standalone: true,
  imports: [CommonModule, BuiCheckboxComponent, BuiCheckboxModule],
  templateUrl: './year-view.html',
  styleUrls: ['./year-view.css']
})
export class YearView {
  @Input() year = new Date().getFullYear();

  today = new Date();
  activeModulesCount = 3;

  weekItems: WeekItem[] = [
    { label: 'Label 1', checked: true },
    { label: 'Label 2', checked: false },
    { label: 'Label 3', checked: false },
    { label: 'Label 4', checked: true },
    { label: 'Label 5', checked: false }
  ];

  get dayLabel(): string {
    return this.today.toLocaleDateString(undefined, { day: '2-digit' });
  }

  get monthLabel(): string {
    return this.today.toLocaleDateString(undefined, { month: 'long' });
  }

  toggle(i: number): void {
    this.weekItems[i].checked = !this.weekItems[i].checked;
  }
}
