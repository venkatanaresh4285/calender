import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';
import SectionContent from './components/SectionContent';

function App() {
  const [activeSection, setActiveSection] = useState('calendar');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar: full width on mobile, 1/4 on md+ */}
      <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />
      </div>

      {/* Main Content: full width on mobile, remaining width on md+ */}
      <div className="w-full md:flex-1 overflow-y-auto">
        {activeSection === 'calendar' ? (
          <div className="p-4">
            <Calendar />
          </div>
        ) : (
          <div className="p-4">
            <SectionContent activeSection={activeSection} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
