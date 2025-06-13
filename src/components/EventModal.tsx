import React, { useState } from 'react';
import { X, Clock, MapPin, Tag, Calendar as CalendarIcon } from 'lucide-react';
import { Event } from '../types/Event';
import dayjs from 'dayjs';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, 'id'>) => void;
  selectedDate?: string;
  editingEvent?: Event | null;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  editingEvent
}) => {
  const [formData, setFormData] = useState({
    title: editingEvent?.title || '',
    date: editingEvent?.date || selectedDate || dayjs().format('YYYY-MM-DD'),
    startTime: editingEvent?.startTime || '09:00',
    endTime: editingEvent?.endTime || '10:00',
    category: editingEvent?.category || 'work' as Event['category'],
    color: editingEvent?.color || '#3B82F6',
    description: editingEvent?.description || '',
    location: editingEvent?.location || ''
  });

  const categories = [
    { value: 'work', label: 'Work', color: '#3B82F6', icon: '💼' },
    { value: 'meeting', label: 'Meeting', color: '#8B5CF6', icon: '👥' },
    { value: 'personal', label: 'Personal', color: '#10B981', icon: '🏠' },
    { value: 'social', label: 'Social', color: '#F59E0B', icon: '🎉' },
    { value: 'reminder', label: 'Reminder', color: '#EF4444', icon: '⏰' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startTime = dayjs(`${formData.date} ${formData.startTime}`);
    const endTime = dayjs(`${formData.date} ${formData.endTime}`);
    const duration = endTime.diff(startTime, 'minute');

    const selectedCategory = categories.find(cat => cat.value === formData.category);
    
    onSave({
      ...formData,
      duration,
      color: selectedCategory?.color || formData.color
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter event title"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CalendarIcon className="w-4 h-4 inline mr-1" />
              Date *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Start Time *
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time *
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              Category *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleInputChange('category', category.value)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-2 ${
                    formData.category === category.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter location (optional)"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Enter event description (optional)"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;