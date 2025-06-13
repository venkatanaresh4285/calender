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
  <div className="flex flex-col md:flex-row h-screen bg-gray-50">
    {/* Sidebar on top in mobile, side in desktop */}
    <Sidebar 
      activeSection={activeSection} 
      onSectionChange={handleSectionChange} 
    />
    
    {/* Content section takes remaining space */}
    <div className="flex-1 overflow-y-auto">
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
