import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'start',
    loadComponent: () =>
      import('./pages/startpage/startpage').then(m => m.StartPageComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/aboutday/aboutday').then(m => m.AboutDayPageComponent),
  },
  {
    path: 'editmode',
    loadComponent: () =>
      import('./pages/editingquarter/editingquarter').then(m => m.EditingQuarterComponent),
  },
  { path: '', pathMatch: 'full', redirectTo: 'start' },
  { path: '**', redirectTo: 'start' },
];
