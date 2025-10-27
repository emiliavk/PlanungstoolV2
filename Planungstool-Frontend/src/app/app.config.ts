import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuiIconModule } from '@buhler/ui-core';
import { completeIconSet } from '@buhler/ui-icons';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(
      [
        BrowserModule,
        BrowserAnimationsModule,
        BuiIconModule.forRoot(
          {
            icons: completeIconSet
          }
        )
      ]
    )
  ],
};
