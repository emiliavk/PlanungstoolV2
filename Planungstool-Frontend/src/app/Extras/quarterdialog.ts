import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UiCoreModule,
  BuiButtonModule,
  BuiDatePickerModule,
  DialogRef,
  BUI_DIALOG_DATA
} from '@buhler/ui-core';

export interface QuarterDialogData {
  year: number;
  quarter: { id: number; title: string };
  startDate?: Date | null;
  endDate?: Date | null;
}

export interface QuarterDialogResult {
  id: number;
  title: string;
  startDate: Date | null;
  endDate: Date | null;
}

@Component({
  selector: 'quarter-dialog',
  standalone: true,
  imports: [CommonModule, UiCoreModule, BuiButtonModule, BuiDatePickerModule],
  template: `
    <bui-dialog class="qd-reset">
      <bui-dialog-content class="qd-content">
        <div class="qd-row">
          <input
            buiFormFieldControl
            class="qd-input"
            [value]="name()"
            (input)="onNameInput($event)"
            placeholder="Quarter name"
            aria-label="Quarter name"
          />
        </div>

        <div class="qd-row">
          <bui-date-range-input [rangePicker]="picker" buiFormFieldControl class="qd-input qd-date">
            <input buiStartDate [value]="start()" placeholder="Start date" aria-label="Start date" />
            <input buiEndDate [value]="end()" placeholder="End date" aria-label="End date" />
          </bui-date-range-input>
          <bui-date-range-picker #picker></bui-date-range-picker>
        </div>
      </bui-dialog-content>

      <bui-dialog-actions class="qd-actions">
        <button bui-tertiary-button class="qd-btn qd-btn--ghost" type="button" (click)="onCancel()">
          <span>cancel</span>
        </button>
        <button bui-primary-button class="qd-btn qd-btn--primary" type="button" (click)="onSave()" cdkFocusInitial>
          <span>save</span>
        </button>
      </bui-dialog-actions>
    </bui-dialog>
  `,
  styles: [`
    /* Base panel */
    .qd-reset {
      background: #062e3f;
      color: #eaf4f9;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
      /* No header content */
    }
    .qd-reset bui-dialog-title,
    .qd-reset bui-dialog-description {
      display: none !important;
    }

    /* Content area: flat, equal spacing */
    .qd-content {
      padding: 18px 22px 10px;
      display: grid;
      gap: 14px;
    }
    .qd-row {
      display: block;
    }

    /* Single-outline input row (remove nested borders/shadows) */
    .qd-input {
      display: flex;
      align-items: center;
      width: 100%;
      height: 46px;

      background: transparent !important;
      color: #eaf4f9 !important;
      border-radius: 10px !important;

      /* The only visible outline */
      box-shadow: inset 0 0 0 1.5px rgba(226, 236, 241, 0.35) !important;

      /* Remove all library paddings that create stacked borders */
      padding: 0 14px !important;
      border: 0 !important;
      outline: none !important;
    }

    /* Date range inner inputs must be flat too */
    .qd-date input {
      background: transparent !important;
      border: 0 !important;
      outline: none !important;
      border-radius: 0 !important;
      color: #eaf4f9 !important;
      padding: 0 6px !important;
    }

    /* Actions: no divider, right aligned */
    .qd-actions {
      padding: 12px 22px 18px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;

      background: transparent !important;
      box-shadow: none !important;
      border-top: 0 !important;
    }

    /* Buttons: consistent size, flat pills */
    .qd-btn {
      min-width: 96px;
      height: 40px;
      border-radius: 12px;
      padding: 8px 16px;
    }
    .qd-btn--ghost {
      background: #3f5560;
      color: #cfe5ea;
    }
    .qd-btn--primary {
      background: #1fb39d;
      color: #ffffff;
    }
    .qd-btn--primary:hover { filter: brightness(1.06); }
  `]
})
export class QuarterDialogComponent {
  public name = signal<string>('');
  public start = signal<Date | null>(null);
  public end = signal<Date | null>(null);

  constructor(
    private readonly dialogRef: DialogRef<QuarterDialogComponent>,
    @Inject(BUI_DIALOG_DATA) data: QuarterDialogData
  ) {
    this.name.set(data?.quarter?.title ?? '');
    this.start.set(data?.startDate ?? null);
    this.end.set(data?.endDate ?? null);
  }

  public onNameInput(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value ?? '';
    this.name.set(value);
  }

  public onCancel(): void {
    this.dialogRef.close(undefined);
  }

  public onSave(): void {
    const result: QuarterDialogResult = {
      id: (this as any).data?.quarter?.id ?? 0,
      title: this.name(),
      startDate: this.start(),
      endDate: this.end()
    };
    this.dialogRef.close(result);
  }
}
