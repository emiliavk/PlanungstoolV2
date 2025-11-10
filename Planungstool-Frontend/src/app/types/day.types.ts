export type TaskStatus = 'done' | 'pending' | 'empty';

export interface DayChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface DayTask {
  id: string;
  from: string;   // '07:30'
  to?: string;    // '09:45'
  title?: string;
  note?: string;
  status: TaskStatus;
  linkText?: string;
  pictureUrl?: string;
}

export interface DayMeta {
  dayLabel: string;    // 'Planung vom'
  dateLabel: string;   // '08.05.2025'
  module?: string;     // 'Modul'
  lastEdited?: string; // '12:37'
  note?: string;       // 'Löten wird erklärt'
}
