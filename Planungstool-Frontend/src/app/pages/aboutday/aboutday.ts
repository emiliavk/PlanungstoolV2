import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


import { DayChecklistComponent } from '../../components/day-checklist/day-checklist';
import { DayViewComponent } from '../../components/day-view/day-view';
import { DayChecklistItem, DayMeta, DayTask } from '../../types/day.types';

import {
  BuiAppShellModule,
  BuiHeaderModule,
  BuiLogoModule,
  BuiSearchModule,
  BuiButtonModule,
  BuiIconButtonComponent,
  BuiIconComponent,
  BuiSegmentedButtonComponent,
  BuiCheckboxComponent
} from '@buhler/ui-core';

@Component({
  selector: 'app-about-day',
  standalone: true,
  templateUrl: './aboutday.html',
  styleUrls: ['./aboutday.css'],
  imports: [
    CommonModule,
    RouterLink,

    // Bühler Shell/Header
    BuiAppShellModule,
    BuiHeaderModule,
    BuiLogoModule,
    BuiSearchModule,
    BuiButtonModule,
    BuiIconButtonComponent,
    BuiCheckboxComponent,

    // Icons
    BuiIconComponent,

    BuiSegmentedButtonComponent,

    BuiCheckboxComponent,

    DayChecklistComponent,
    DayViewComponent
  ]
})
export class AboutDayPageComponent {

  public segSelection: Record<string, string | null> = {};

  getSegSelected(taskId: string): string | null {

    return this.segSelection[taskId] ?? null;
  }

  setSegSelected(taskId: string, value: string | null): void {
    const current = this.segSelection[taskId] ?? null;
    this.segSelection[taskId] = current === value ? null : value;
  }

  checklist: DayChecklistItem[] = [
    { id: 'c1', label: 'Label', checked: false },
    { id: 'c2', label: 'Label', checked: false },
    { id: 'c3', label: 'Label', checked: false },
    { id: 'c4', label: 'Label', checked: false },
    { id: 'c5', label: 'Label', checked: false }
  ];

  // Checkbox-Änderung behandeln: Index i toggeln (oder auf Wert setzen)
  onChecklistToggle(i: number, checked: boolean): void {
    const curr = this.checklist[i];
    this.checklist[i] = { ...curr, checked };
  }


  meta: DayMeta = {
    dayLabel: 'Planung vom',
    dateLabel: '08.05.2025',
    module: 'Modul',
    lastEdited: '12:37',
    note: 'Löten wird erklärt'
  };

  tasks: DayTask[] = [
    { id: 't1', from: '07:30', to: '07:45', status: 'pending' },
    { id: 't2', from: '07:45', to: '09:30', status: 'done', title: 'Mustertext', note: 'Peter war krank', linkText: 'link' },
    { id: 't3', from: '09:45', to: '12:00', status: 'done', title: 'Text aus dem Template', linkText: 'link' },
    { id: 't4', from: '13:00', to: '16:00', status: 'done', linkText: 'link' },
    { id: 't5', from: '16:00', to: '16:15', status: 'pending', linkText: 'link' }
  ];

  onContentClick(e: MouseEvent) {
    console.log('content-col clicked', e);
  }


  trackByTask(index: number, item: DayTask): string | number {
    return item.id ?? index;
  }

  navigateToAbout(): void {
    window.location.assign('http://localhost:52643/about');
    window.location.href = 'http://localhost:52643/about';
  }
}
