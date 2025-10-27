import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

// Your app components
import { YearView } from './year-view/year-view';

// Bühler UI Core modules
import { BuiAppShellModule } from '@buhler/ui-core';
import { BuiButtonModule } from '@buhler/ui-core';
import { BuiNavbarModule } from '@buhler/ui-core';
import { BuiHeaderModule } from '@buhler/ui-core';
import { BuiLogoModule } from '@buhler/ui-core';
import { BuiIconModule } from '@buhler/ui-core';
import { BuiSearchModule } from '@buhler/ui-core';
import { BuiToolbarModule } from '@buhler/ui-core';
import { BuiIconButtonComponent } from '@buhler/ui-core';
import { UiCoreModule } from '@buhler/ui-core'; 


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,

    // custom components
    YearView,

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
export class AppComponent {
  username = 'Jane Doe';
}

