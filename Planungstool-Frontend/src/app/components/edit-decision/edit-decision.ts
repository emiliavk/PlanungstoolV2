import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BuiIconComponent,
  BuiIconButtonComponent,
  BuiMenuModule,
  BuiButtonModule,
  UiCoreModule,
  DialogService
} from '@buhler/ui-core';

// Dialog component and result type
import { QuarterDialogComponent, QuarterDialogResult } from '../../Extras/quarterdialog';

type Quarter = { id: number; title: string; startDate?: Date | null; endDate?: Date | null };
type YearItem = { year: number; expanded: boolean; quarters: Quarter[] };

@Component({
  selector: 'edit-decision',
  standalone: true,
  imports: [
    CommonModule,
    UiCoreModule,         // provides form-field, menu, dialog, etc.
    BuiMenuModule,        // explicitly include menu
    BuiButtonModule,      // button components
    BuiIconComponent,
    BuiIconButtonComponent
  ],
  templateUrl: './edit-decision.html',
  styleUrls: ['./edit-decision.scss']
})
export class EditDecisionComponent implements OnDestroy {
  constructor(private readonly _dialog: DialogService) { }

  // Demo data
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

  // Helper to deep clone the current years list
  private cloneYears(list: YearItem[]): YearItem[] {
    return list.map(y => ({
      year: y.year,
      expanded: y.expanded,
      quarters: y.quarters.map(q => ({
        id: q.id,
        title: q.title,
        startDate: q.startDate ?? null,
        endDate: q.endDate ?? null
      }))
    }));
  }

  // Mutation helper with copy‑on‑write
  private mutateYears(mutator: (list: YearItem[]) => void): void {
    const copy = this.cloneYears(this.years());
    mutator(copy);
    this.years.set(copy);
  }

  // Find a year by its value
  private findYear(list: YearItem[], year: number): YearItem | undefined {
    return list.find(y => y.year === year);
  }

  // Find and update quarter title/dates
  private updateQuarter(list: YearItem[], year: number, result: QuarterDialogResult): void {
    const y = this.findYear(list, year);
    if (!y) return;

    const i = y.quarters.findIndex(qq => qq.id === result.id);
    if (i >= 0) {
      y.quarters[i].title = result.title;
      y.quarters[i].startDate = result.startDate;
      y.quarters[i].endDate = result.endDate;
    }
  }

  // Expand/collapse specific year
  public toggleYear(index: number): void {
    this.mutateYears(list => {
      list[index].expanded = !list[index].expanded;
    });
  }

  // Edit actions (demo)
  public editYear(year: number): void {
    console.log('Edit year', year);
  }

  public editQuarter(year: number, q: Quarter): void {
    // Open Quarter dialog — ensure DateAdapter is set in app (BuiNativeDateModule or Moment/Dayjs)
    const ref = this._dialog.open(QuarterDialogComponent, {
      minWidth: '520px',
      minHeight: '320px',
      showCloseButton: true,
      data: { year, quarter: q } // pass only needed data
    });

    // Subscribe to the dialog's close stream.
    // Use closed$() if your DialogRef exposes it as a METHOD (most versions):
    const sub = ref.closed$().subscribe({
      next: (result?: QuarterDialogResult) => {
        if (!result) return;
        this.mutateYears(list => this.updateQuarter(list, year, result));
      },
      error: (err: unknown) => console.error('Dialog error', err)
    });

    // If your DialogRef exposes closed$ as a PROPERTY instead, use:
    // const sub = ref.closed$.subscribe({ next: ..., error: ... });

    // Keep reference to unsubscribe if needed later
    this._subs.push(sub);
  }

  // Optional: create and remove operations
  public addYear(): void {
    const next = (this.years().length ? Math.max(...this.years().map(y => y.year)) + 1 : new Date().getFullYear());
    this.mutateYears(list => {
      list.unshift({ year: next, expanded: true, quarters: [] });
    });
  }

  public removeYear(year: number): void {
    this.mutateYears(list => {
      const i = list.findIndex(y => y.year === year);
      if (i >= 0) list.splice(i, 1);
    });
  }

  public addQuarter(year: number): void {
    this.mutateYears(list => {
      const y = this.findYear(list, year);
      if (!y) return;
      const nextId = y.quarters.length ? Math.max(...y.quarters.map(q => q.id)) + 1 : 1;
      y.quarters.push({ id: nextId, title: `Quarter ${nextId}` });
    });
  }

  public duplicateYear(year: number): void {
    this.mutateYears(list => {
      const y = this.findYear(list, year);
      if (!y) return;
      const clone: YearItem = {
        year: y.year + 1, // Example strategy: duplicate to next year
        expanded: y.expanded,
        quarters: y.quarters.map(q => ({
          id: q.id,
          title: q.title,
          startDate: q.startDate ?? null,
          endDate: q.endDate ?? null
        }))
      };
      list.splice(list.findIndex(item => item.year === year) + 1, 0, clone);
    });
  }

  // Menu context (optional, used when you DO pass trigger data)
  private _menuCtx = signal<{ index: number; year: YearItem } | null>(null);
  public setMenuContext(index: number, year: YearItem): void {
    this._menuCtx.set({ index, year });
  }

  // Menu actions — data independent fallback
  public onDeleteYear(): void {
    const ctx = this._menuCtx();
    if (!ctx) {
      console.log('No menu context, delete disabled');
      return;
    }
    this.mutateYears(list => { list.splice(ctx.index, 1); });
    this._menuCtx.set(null);
  }

  public onDuplicateYear(): void {
    const ctx = this._menuCtx();
    if (!ctx) {
      console.log('No menu context, duplicate disabled');
      return;
    }
    this.duplicateYear(ctx.year.year);
  }

  // Footer buttons (demo)
  public onYear(): void { console.log('Year button clicked'); }
  public onQuarter(): void { console.log('Quarter button clicked'); }
  public onModule(): void { console.log('Module button clicked'); }
  public onTemplate(): void { console.log('Template button clicked'); }

  // Subscription cleanup
  private _subs: Array<{ unsubscribe: () => void }> = [];
  public ngOnDestroy(): void {
    this._subs.forEach(s => s?.unsubscribe?.());
    this._subs = [];
  }
}
