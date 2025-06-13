import React from 'react';
import { Clock, MapPin, AlertCircle, Edit } from 'lucide-react';
import { Event } from '../types/Event';
import { formatTime, getConflictingEvents } from '../utils/dateUtils';

interface EventCardProps {
  event: Event;
  allEvents: Event[];
  isCompact?: boolean;
  onEdit?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, allEvents, isCompact = false, onEdit }) => {
  const conflictingEvents = getConflictingEvents(event, allEvents);
  const hasConflicts = conflictingEvents.length > 0;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meeting':
        return '👥';
      case 'personal':
        return '🏠';
      case 'work':
        return '💼';
      case 'reminder':
        return '⏰';
      case 'social':
        return '🎉';
      default:
        return '📅';
    }
  };

  const getTimeDisplay = () => {
    if (event.duration === 0) {
      return formatTime(event.startTime);
    }
    return `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`;
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(event);
    }
  };

  if (isCompact) {
    return (
      <div
        className="relative p-2 mb-1 rounded-md text-xs transition-all duration-200 hover:shadow-md group cursor-pointer"
        style={{ backgroundColor: `${event.color}15`, borderLeft: `3px solid ${event.color}` }}
      >
        <div className="flex items-center space-x-1">
          <span className="text-xs">{getCategoryIcon(event.category)}</span>
          <span className="font-medium text-gray-800 truncate flex-1">{event.title}</span>
          {hasConflicts && (
            <AlertCircle className="w-3 h-3 text-amber-500 flex-shrink-0" />
          )}
          {onEdit && (
            <button
              onClick={handleEdit}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white hover:bg-opacity-50 rounded transition-all duration-200"
            >
              <Edit className="w-3 h-3 text-gray-600" />
            </button>
          )}
        </div>
        <div className="flex items-center space-x-1 mt-1 text-gray-600">
          <Clock className="w-3 h-3" />
          <span>{getTimeDisplay()}</span>
        </div>
        
        {/* Tooltip */}
        <div className="absolute left-0 top-full mt-2 p-3 bg-white rounded-lg shadow-lg border z-20 min-w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">{getCategoryIcon(event.category)}</span>
            <h3 className="font-semibold text-gray-900">{event.title}</h3>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{getTimeDisplay()}</span>
            </div>
            {event.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            )}
            {event.description && (
              <p className="mt-2 text-gray-700">{event.description}</p>
            )}
            {hasConflicts && (
              <div className="mt-2 p-2 bg-amber-50 rounded border-l-2 border-amber-400">
                <div className="flex items-center space-x-1 text-amber-700">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium">Time Conflict</span>
                </div>
                <p className="text-xs text-amber-600 mt-1">
                  Overlaps with {conflictingEvents.length} other event{conflictingEvents.length > 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md cursor-pointer group"
      style={{ backgroundColor: `${event.color}10`, borderColor: `${event.color}40` }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getCategoryIcon(event.category)}</span>
          <h3 className="font-semibold text-gray-900">{event.title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          {hasConflicts && (
            <AlertCircle className="w-5 h-5 text-amber-500" />
          )}
          {onEdit && (
            <button
              onClick={handleEdit}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white hover:bg-opacity-50 rounded transition-all duration-200"
            >
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{getTimeDisplay()}</span>
        </div>
        {event.location && (
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
        </div>
        )}
        {event.description && (
          <p className="text-gray-700 mt-2">{event.description}</p>
        )}
      </div>

      {hasConflicts && (
        <div className="mt-3 p-2 bg-amber-50 rounded border-l-2 border-amber-400">
          <div className="flex items-center space-x-1 text-amber-700">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium text-sm">Time Conflict</span>
          </div>
          <p className="text-xs text-amber-600 mt-1">
            Overlaps with: {conflictingEvents.map(e => e.title).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default EventCard;