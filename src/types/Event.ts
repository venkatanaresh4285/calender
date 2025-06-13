export interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  category: 'meeting' | 'personal' | 'work' | 'reminder' | 'social';
  color: string;
  description?: string;
  location?: string;
}

export interface CalendarDay {
  date: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Event[];
}