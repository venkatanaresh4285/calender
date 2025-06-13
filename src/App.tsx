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
      {/* Sidebar: full width on mobile, 1/4 width on md+ */}
      <div className="w-full md:w-1/4 border-r border-gray-200">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />
      </div>

      {/* Main content: responsive */}
      <div className="w-full md:flex-1 overflow-y-auto">
        {activeSection === 'calendar' ? (
          <Calendar />
        ) : (
          <SectionContent activeSection={activeSection} />
        )}
      </div>
    </div>
  );
}

export default App;
