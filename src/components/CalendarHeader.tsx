import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';
import dayjs, { Dayjs } from 'dayjs';

interface CalendarHeaderProps {
  currentDate: Dayjs;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onAddEvent: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onAddEvent
}) => {
  const monthYear = currentDate.format('MMMM YYYY');
  const isCurrentMonth = currentDate.isSame(dayjs(), 'month');

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        </div>
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-gray-800">{monthYear}</h2>
          <div className="flex items-center space-x-1">
            <button
              onClick={onPreviousMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={onAddEvent}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
        {!isCurrentMonth && (
          <button
            onClick={onToday}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Today
          </button>
        )}
        <div className="text-sm text-gray-500">
          {dayjs().format('dddd, MMMM D, YYYY')}
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;