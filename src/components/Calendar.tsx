import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventSidebar from './EventSidebar';
import EventModal from './EventModal';
import { eventsData } from '../data/events';
import { getCalendarDays, getEventsForDate } from '../utils/dateUtils';
import { Event } from '../types/Event';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>(eventsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const calendarDays = getCalendarDays(currentDate, events);
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate, events) : [];

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handleTodayClick = () => {
    setCurrentDate(dayjs());
    setSelectedDate(dayjs().format('YYYY-MM-DD'));
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(selectedDate === date ? null : date);
  };

  const handleCloseSidebar = () => {
    setSelectedDate(null);
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    if (editingEvent) {
      // Update existing event
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id 
          ? { ...eventData, id: editingEvent.id }
          : event
      ));
    } else {
      // Create new event
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString()
      };
      setEvents(prev => [...prev, newEvent]);
    }
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isModalOpen) {
          setIsModalOpen(false);
        } else {
          setSelectedDate(null);
        }
      } else if (event.key === 'ArrowLeft' && event.metaKey) {
        handlePreviousMonth();
      } else if (event.key === 'ArrowRight' && event.metaKey) {
        handleNextMonth();
      } else if (event.key === 't' && event.metaKey) {
        event.preventDefault();
        handleTodayClick();
      } else if (event.key === 'n' && event.metaKey) {
        event.preventDefault();
        handleAddEvent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          onToday={handleTodayClick}
          onAddEvent={handleAddEvent}
        />
        
        <div className="flex">
          <div className={`flex-1 transition-all duration-300 ${selectedDate ? 'mr-96' : ''}`}>
            <CalendarGrid
              calendarDays={calendarDays}
              allEvents={events}
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
              onEditEvent={handleEditEvent}
            />
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {selectedDate && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={handleCloseSidebar}
          />
        )}

        <EventSidebar
          selectedDate={selectedDate}
          events={selectedDateEvents}
          allEvents={events}
          onClose={handleCloseSidebar}
          onAddEvent={handleAddEvent}
        />

        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
          selectedDate={selectedDate}
          editingEvent={editingEvent}
        />
      </div>

      {/* Keyboard shortcuts help */}
      <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 text-xs text-gray-600 max-w-xs hidden lg:block">
        <div className="font-medium mb-2">Keyboard Shortcuts</div>
        <div className="space-y-1">
          <div><kbd className="px-1 bg-gray-100 rounded">⌘</kbd> + <kbd className="px-1 bg-gray-100 rounded">←</kbd> Previous month</div>
          <div><kbd className="px-1 bg-gray-100 rounded">⌘</kbd> + <kbd className="px-1 bg-gray-100 rounded">→</kbd> Next month</div>
          <div><kbd className="px-1 bg-gray-100 rounded">⌘</kbd> + <kbd className="px-1 bg-gray-100 rounded">T</kbd> Go to today</div>
          <div><kbd className="px-1 bg-gray-100 rounded">⌘</kbd> + <kbd className="px-1 bg-gray-100 rounded">N</kbd> New event</div>
          <div><kbd className="px-1 bg-gray-100 rounded">Esc</kbd> Close modal/sidebar</div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;