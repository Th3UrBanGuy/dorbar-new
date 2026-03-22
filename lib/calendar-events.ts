export type Sect = 'sunni' | 'shia' | 'sufi' | 'wahabi' | 'all';

export interface CalendarEvent {
  id: string;
  title: string;
  dateStr: string; // ISO format YYYY-MM-DD
  time?: string;
  location?: string;
  sect: Sect;
  description: string;
  icon?: string; // e.g., 'star', 'moon', 'award'
}

// Current Year: 2026 for context
export const specialDays: CalendarEvent[] = [
  // ALL (General Islamic)
  { id: 'e1', title: 'Start of Ramadan', dateStr: '2026-02-18', sect: 'all', description: 'The beginning of the holy month of fasting.', icon: 'moon' },
  { id: 'e2', title: 'Eid al-Fitr', dateStr: '2026-03-20', sect: 'all', time: '08:00 AM', location: 'Grand Mosque', description: 'Holiday marking the end of Ramadan.', icon: 'star' },
  { id: 'e3', title: 'Eid al-Adha', dateStr: '2026-05-27', sect: 'all', description: 'Feast of the Sacrifice.', icon: 'star' },
  
  // SUNNI
  { id: 's1', title: 'Mawlid al-Nabi (Sunni)', dateStr: '2026-08-25', sect: 'sunni', description: 'The observance of the birthday of the Islamic prophet Muhammad.', icon: 'award' },
  { id: 's2', title: 'Day of Ashura (Sunni)', dateStr: '2026-06-25', sect: 'sunni', description: 'Observed with fasting to commemorate Musa crossing the Red Sea.', icon: 'sun' },

  // SHIA
  { id: 'sh1', title: 'Eid al-Ghadir', dateStr: '2026-06-03', sect: 'shia', description: 'Commemorates the appointment of Ali ibn Abi Talib by the Islamic prophet Muhammad as his successor.', icon: 'award' },
  { id: 'sh2', title: 'Ashura (Shia)', dateStr: '2026-06-25', sect: 'shia', description: 'Commemorates the martyrdom of Husayn ibn Ali, the grandson of Muhammad.', icon: 'bookmark' },
  { id: 'sh3', title: 'Arbaeen', dateStr: '2026-08-04', sect: 'shia', description: 'Marks 40 days after the Day of Ashura.', icon: 'flag' },

  // SUFI
  { id: 'sf1', title: 'Urs of Khwaja Moinuddin Chishti', dateStr: '2026-10-12', sect: 'sufi', description: 'Death anniversary of the revered Sufi saint.', icon: 'heart' },
  { id: 'sf2', title: 'Urs of Rumi', dateStr: '2026-12-17', sect: 'sufi', description: 'Commemoration of Jalaluddin Rumi passing.', icon: 'heart' },

  // WAHABI
  { id: 'w1', title: 'Arafa Day', dateStr: '2026-05-26', sect: 'wahabi', description: 'The holiest day in the Islamic calendar, preceding Eid al-Adha.', icon: 'map-pin' },
];

export const sectColors: Record<Sect, string> = {
  all: 'bg-slate-500',
  sunni: 'bg-emerald-500', // Green
  shia: 'bg-blue-500',    // Blue
  sufi: 'bg-purple-500',  // Purple
  wahabi: 'bg-amber-500', // Amber/Yellow
};

export const sectTextColors: Record<Sect, string> = {
  all: 'text-slate-600',
  sunni: 'text-emerald-600',
  shia: 'text-blue-600',
  sufi: 'text-purple-600',
  wahabi: 'text-amber-600',
};
