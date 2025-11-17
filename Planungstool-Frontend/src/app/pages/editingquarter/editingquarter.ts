import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  BuiAppShellModule,
  BuiHeaderModule,
  BuiLogoModule,
  BuiSearchModule,
  BuiIconModule,
  BuiButtonModule,
  BuiIconButtonComponent,
  UiCoreModule
} from '@buhler/ui-core';

import { EditDecisionComponent } from '../../components/edit-decision/edit-decision';

interface ModuleTile { id: string; title: string; }

@Component({
  selector: 'app-editing-quarter',
  standalone: true,
  templateUrl: './editingquarter.html',
  styleUrls: ['./editingquarter.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BuiAppShellModule,
    BuiHeaderModule,
    BuiLogoModule,
    BuiSearchModule,
    BuiIconModule,
    BuiButtonModule,
    BuiIconButtonComponent,
    UiCoreModule,
    EditDecisionComponent
  ]
})
export class EditingQuarterComponent {
  moduleSearch = '';
  private readonly _modules = signal<ModuleTile[]>(
    Array.from({ length: 18 }).map((_, i) => ({ id: String(i + 1), title: 'module' }))
  );

  filteredModules = computed<ModuleTile[]>(() => {
    const q = this.moduleSearch.trim().toLowerCase();
    const items = this._modules();
    return q ? items.filter(m => m.title.toLowerCase().includes(q)) : items;
  });

  openModule(m: ModuleTile) {
    console.log('Open module', m);
  }

  openModuleContext(evt: MouseEvent, m: ModuleTile) {
    evt.preventDefault();
    console.log('Context for module', m);
  }
}
