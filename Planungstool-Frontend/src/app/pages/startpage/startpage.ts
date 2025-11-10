import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'

// Your app components
import { YearView } from '../../components/year-view/year-view';
import { WeekViewComponent } from '../../components/week-view/week-view';

// Bühler UI Core modules
import {
  BuiAppShellModule,
  BuiNavbarModule,
  BuiButtonModule,
  BuiHeaderModule,
  BuiLogoModule,
  BuiIconModule,
  BuiSearchModule,
  BuiToolbarModule,
  BuiIconButtonComponent,
  UiCoreModule
} from '@buhler/ui-core';

@Component({
  selector: 'app-start-page',
  standalone: true,
  templateUrl: './startpage.html',
  styleUrls: ['./startpage.css'],
  imports: [
    CommonModule,
    RouterLink,

    // custom components
    YearView,
    WeekViewComponent,

    // Bühler UI Core modules for App Shell
    BuiAppShellModule,
    BuiNavbarModule,
    BuiButtonModule,
    BuiHeaderModule,
    BuiLogoModule,
    BuiIconModule,
    BuiSearchModule,
    BuiToolbarModule,
    BuiIconButtonComponent,
    UiCoreModule
  ]
})
export class StartPageComponent {
  username = 'Jane Doe';
  editMode = false;

  onToggleEditMode(): void {
    this.editMode = !this.editMode;
    console.log('Edit Mode:', this.editMode);
  }
}
