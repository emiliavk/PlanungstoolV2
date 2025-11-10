// edit-decision.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Bühler UI Core (standalone) imports used by the template
import {
  BuiIconComponent,
  BuiIconButtonComponent,
  BuiMenuModule,
  BuiButtonModule,
  UiCoreModule
} from '@buhler/ui-core';

type Quarter = { id: number; title: string };
type YearItem = {
  year: number;
  expanded: boolean;
  quarters: Quarter[];
};

@Component({
  selector: 'edit-decision',
  standalone: true,
  imports: [
    CommonModule,
    BuiIconComponent,
    BuiIconButtonComponent,
    BuiMenuModule,
    BuiButtonModule,
    UiCoreModule
  ],
  templateUrl: './edit-decision.html',
  styleUrls: ['./edit-decision.scss']
})
export class EditDecisionComponent {
  // Sidebar data
  public years = signal<YearItem[]>([
    { year: 2025, expanded: false, quarters: [] },
    { year: 2026, expanded: false, quarters: [] },
    {
      year: 2027,
      expanded: true,
      quarters: [
        { id: 1, title: 'Quarter 1' },
        { id: 2, title: 'Quarter 2' }
      ]
    }
  ]);

  public tags = signal<string[]>(['Year', 'Quarter', 'Module', 'Template']);

  // Safe deep copy (avoids depending on structuredClone)
  private cloneYears(list: YearItem[]): YearItem[] {
    return list.map(y => ({
      year: y.year,
      expanded: y.expanded,
      quarters: y.quarters.map(q => ({ id: q.id, title: q.title }))
    }));
  }

  // Helper to mutate the years signal
  private mutateYears(mutator: (list: YearItem[]) => void): void {
    const copy = this.cloneYears(this.years());
    mutator(copy);
    this.years.set(copy);
  }

  // Toggle expand/collapse for a year row
  public toggleYear(index: number): void {
    this.mutateYears(list => {
      list[index].expanded = !list[index].expanded;
    });
  }

  // Actions (hook up your dialogs/navigation as needed)
  public editYear(year: number): void {
    console.log('Edit year', year);
  }

  public editQuarter(year: number, q: Quarter): void {
    console.log(`Edit ${year} ${q.title}`);
  }

  // Context for kebab menu (shared <bui-menu>)
  private _menuCtx = signal<{ index: number; year: YearItem } | null>(null);

  public setMenuContext(index: number, year: YearItem): void {
    this._menuCtx.set({ index, year });
  }

  public onEditYearMeta(): void {
    const ctx = this._menuCtx();
    if (ctx) {
      console.log('Edit year metadata', ctx.year.year);
    }
  }

  public onDeleteYear(): void {
    const ctx = this._menuCtx();
    if (!ctx) return;

    this.mutateYears(list => {
      list.splice(ctx.index, 1);
    });
    this._menuCtx.set(null);
  }
}
