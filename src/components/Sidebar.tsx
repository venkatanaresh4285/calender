import React, { useState } from 'react';
import { 
  Home, 
  Calendar as CalendarIcon, 
  Users, 
  GraduationCap, 
  CreditCard, 
  Bell, 
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const menuItems = [
    {
      id: 'main',
      title: 'Main',
      items: [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
      ]
    },
    {
      id: 'manage',
      title: 'Manage',
      items: [
        { id: 'programs', label: 'Programs', icon: GraduationCap },
        { id: 'events', label: 'Events', icon: CalendarIcon },
        { id: 'memberships', label: 'Memberships', icon: CreditCard },
      ]
    },
    {
      id: 'members',
      title: 'Members',
      items: [
        { id: 'people', label: 'People', icon: Users },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
      ]
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">CalendarPro</h1>
            <p className="text-xs text-gray-500">Event Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {menuItems.map((section) => (
          <div key={section.id} className="mb-4">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide hover:text-gray-700 transition-colors duration-200"
            >
              <span>{section.title}</span>
              {expandedSections.includes(section.id) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            {expandedSections.includes(section.id) && (
              <div className="mt-2 space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSectionChange(item.id)}
                      className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium rounded-lg mx-2 transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => onSectionChange('settings')}
          className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeSection === 'settings'
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Settings className="w-5 h-5 text-gray-400" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;