import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuiIconComponent } from '@buhler/ui-core';
import { RouterLink } from '@angular/router'; 

type TaskStatus = 'done' | 'pending' | 'empty';

interface WeekItem {
  title?: string;
  status: TaskStatus;
  empty?: boolean;
}

interface DayColumn {
  dayLabel: string;   
  dateLabel: string;  
  items: WeekItem[];
}

@Component({
  selector: 'app-week-view',
  standalone: true,
  imports: [CommonModule, BuiIconComponent, RouterLink],
  templateUrl: './week-view.html',
  styleUrls: ['./week-view.css'],
})
export class WeekViewComponent {
  @Input() weekTitle = 'Week';
  @Input() rangeLabel = 'day month – day month';

  @Input() columns: DayColumn[] = [
    {
      dayLabel: 'Monday',
      dateLabel: 'day month',
      items: [
        { title: '', status: 'empty' },
        { title: '', status: 'done' },
        { title: '', status: 'empty' },
        { title: '', status: 'pending' },
        { title: '', status: 'empty' },
      ],
    },
    {
      dayLabel: 'Tuesday',
      dateLabel: 'day month',
      items: [
        { title: '', status: 'empty' },
        { title: '', status: 'pending' },
        { title: '', status: 'done' },
        { title: '', status: 'done' },
      ],
    },
    {
      dayLabel: 'Wednesday',
      dateLabel: 'day month',
      items: [
        { title: '', status: 'empty' },
        { title: '', status: 'done' },
        { title: '', status: 'pending' },
        { title: '', status: 'empty' },
      ],
    },
    {
      dayLabel: 'Thursday',
      dateLabel: 'day month',
      items: [
        { title: '', status: 'empty' },
        { title: '', status: 'done' },
        { title: '', status: 'done' },
        { title: '', status: 'pending' },
      ],
    },
    {
      dayLabel: 'Friday',
      dateLabel: 'day month',
      items: [
        { title: '', status: 'empty' },
        { title: '', status: 'pending' },
        { title: '', status: 'pending' },
        { title: '', status: 'pending' },
      ],
    },
  ];
}
