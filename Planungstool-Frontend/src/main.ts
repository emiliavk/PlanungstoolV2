import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { BuiIconModule } from '@buhler/ui-core';
import { completeIconSet } from '@buhler/ui-icons';

import { AppComponent } from './app/app';
import { appRoutes } from './app/app.routes';
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(appRoutes),
    importProvidersFrom(
      BuiIconModule.forRoot({ icons: completeIconSet })
    )
  ]
}).catch(err => console.error(err));
