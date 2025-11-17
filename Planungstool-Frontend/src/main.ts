import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { UiCoreModule } from '@buhler/ui-core';
import { BuiNativeDateModule } from '@buhler/ui-core'; // or BuiMomentDateModule / BuiDayjsDateModule
import { BuiIconModule } from '@buhler/ui-core';
import { completeIconSet } from '@buhler/ui-icons';

import { AppComponent } from './app/app';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),            // Required for CDK overlays/animations
    provideRouter(appRoutes),
    importProvidersFrom(
      UiCoreModule,                 
      BuiNativeDateModule,          
      BuiIconModule.forRoot({ icons: completeIconSet })
    )
  ]
}).catch(err => console.error(err));
