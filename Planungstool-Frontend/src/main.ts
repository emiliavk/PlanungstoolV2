import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { BuiIconModule } from '@buhler/ui-core';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      BuiIconModule.forRoot({
      })
    )
  ]
}).catch(err => console.error(err));
