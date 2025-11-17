import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuiIconComponent } from '@buhler/ui-core';
import { DayMeta, DayTask } from '../../types/day.types';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-day-view',
  standalone: true,
  imports: [CommonModule, BuiIconComponent, RouterLink, RouterOutlet], 
  templateUrl: './day-view.html',
  styleUrls: ['./day-view.scss']
})
export class DayViewComponent {
  @Input() meta!: DayMeta;
  @Input() tasks: DayTask[] = [];

  constructor(private router: Router) { } 

  navigateToAbout(): void {
    console.log('navigateToAbout clicked');
    this.router.navigate(['/about']);
  }
}
