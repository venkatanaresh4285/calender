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
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
      
      {activeSection === 'calendar' ? (
        <div className="flex-1 overflow-hidden">
          <Calendar />
        </div>
      ) : (
        <SectionContent activeSection={activeSection} />
      )}
    </div>
  );
}

export default App;