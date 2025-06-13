import React from 'react';
import { CalendarDay } from '../types/Event';
import { getWeekDays } from '../utils/dateUtils';
import EventCard from './EventCard';
import dayjs from 'dayjs';
import { Event } from '../types/Event';

interface CalendarGridProps {
  calendarDays: CalendarDay[];
  allEvents: Event[];
  onDateClick: (date: string) => void;
  selectedDate: string | null;
  onEditEvent: (event: Event) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  calendarDays,
  allEvents,
  onDateClick,
  selectedDate,
  onEditEvent
}) => {
  const weekDays = getWeekDays();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wide"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          const dayNumber = dayjs(day.date).date();
          const isSelected = selectedDate === day.date;
          const hasEvents = day.events.length > 0;

          return (
            <div
              key={day.date}
              className={`min-h-32 border-r border-b border-gray-100 p-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                !day.isCurrentMonth ? 'bg-gray-25 text-gray-400' : ''
              } ${isSelected ? 'bg-blue-50 ring-2 ring-blue-500' : ''}`}
              onClick={() => onDateClick(day.date)}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200 ${
                    day.isToday
                      ? 'bg-blue-600 text-white'
                      : day.isCurrentMonth
                      ? 'text-gray-900 hover:bg-gray-200'
                      : 'text-gray-400'
                  }`}
                >
                  {dayNumber}
                </span>
                {hasEvents && (
                  <div className="flex space-x-1">
                    {day.events.slice(0, 3).map((event, idx) => (
                      <div
                        key={event.id}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: event.color }}
                      />
                    ))}
                    {day.events.length > 3 && (
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                    )}
                  </div>
                )}
              </div>

              {/* Events for this day */}
              <div className="space-y-1">
                {day.events.slice(0, 2).map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    allEvents={allEvents}
                    isCompact={true}
                    onEdit={onEditEvent}
                  />
                ))}
                {day.events.length > 2 && (
                  <div className="text-xs text-gray-500 text-center py-1">
                    +{day.events.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;