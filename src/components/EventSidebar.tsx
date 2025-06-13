import React from 'react';
import { X, Plus } from 'lucide-react';
import { Event } from '../types/Event';
import EventCard from './EventCard';
import dayjs from 'dayjs';

interface EventSidebarProps {
  selectedDate: string | null;
  events: Event[];
  allEvents: Event[];
  onClose: () => void;
  onAddEvent: () => void;
}

const EventSidebar: React.FC<EventSidebarProps> = ({
  selectedDate,
  events,
  allEvents,
  onClose,
  onAddEvent
}) => {
  if (!selectedDate) return null;

  const formattedDate = dayjs(selectedDate).format('dddd, MMMM D, YYYY');
  const isToday = dayjs(selectedDate).isSame(dayjs(), 'day');

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl border-l border-gray-200 z-30 transform transition-transform duration-300">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {isToday ? 'Today' : formattedDate}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {events.length} event{events.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Add Event Button */}
        <div className="p-4 border-b border-gray-100">
          <button 
            onClick={onAddEvent}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>

        {/* Events List */}
        <div className="flex-1 overflow-y-auto p-4">
          {events.length > 0 ? (
            <div className="space-y-4">
              {events
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    allEvents={allEvents}
                    isCompact={false}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events</h3>
              <p className="text-gray-500 mb-4">
                No events scheduled for this date.
              </p>
              <button 
                onClick={onAddEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventSidebar;