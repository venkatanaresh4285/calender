import dayjs, { Dayjs } from 'dayjs';
import { Event, CalendarDay } from '../types/Event';

export const formatDate = (date: Dayjs, format: string = 'YYYY-MM-DD'): string => {
  return date.format(format);
};

export const isToday = (date: Dayjs): boolean => {
  return date.isSame(dayjs(), 'day');
};

export const isSameMonth = (date: Dayjs, referenceDate: Dayjs): boolean => {
  return date.isSame(referenceDate, 'month');
};

export const getCalendarDays = (currentDate: Dayjs, events: Event[]): CalendarDay[] => {
  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startOfCalendar = startOfMonth.startOf('week');
  const endOfCalendar = endOfMonth.endOf('week');

  const days: CalendarDay[] = [];
  let date = startOfCalendar;

  while (date.isBefore(endOfCalendar) || date.isSame(endOfCalendar, 'day')) {
    const dateString = formatDate(date);
    const dayEvents = events.filter(event => event.date === dateString);

    days.push({
      date: dateString,
      isCurrentMonth: isSameMonth(date, currentDate),
      isToday: isToday(date),
      events: dayEvents
    });

    date = date.add(1, 'day');
  }

  return days;
};

export const getEventsForDate = (date: string, events: Event[]): Event[] => {
  return events.filter(event => event.date === date);
};

export const hasTimeConflict = (event1: Event, event2: Event): boolean => {
  if (event1.date !== event2.date) return false;
  
  const start1 = dayjs(`${event1.date} ${event1.startTime}`);
  const end1 = dayjs(`${event1.date} ${event1.endTime}`);
  const start2 = dayjs(`${event2.date} ${event2.startTime}`);
  const end2 = dayjs(`${event2.date} ${event2.endTime}`);

  return start1.isBefore(end2) && start2.isBefore(end1);
};

export const getConflictingEvents = (targetEvent: Event, allEvents: Event[]): Event[] => {
  return allEvents.filter(event => 
    event.id !== targetEvent.id && hasTimeConflict(targetEvent, event)
  );
};

export const formatTime = (time: string): string => {
  return dayjs(`2000-01-01 ${time}`).format('h:mm A');
};

export const getWeekDays = (): string[] => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};