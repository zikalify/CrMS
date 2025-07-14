import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ObservationEntry from './components/ObservationEntry';
import CalendarView from './components/CalendarView';
import EducationHub from './components/EducationHub';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [cycleData, setCycleData] = useState([]);

  // Load data from localStorage on app start
  useEffect(() => {
    const savedData = localStorage.getItem('crms-cycle-data');
    if (savedData) {
      setCycleData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever cycleData changes
  useEffect(() => {
    localStorage.setItem('crms-cycle-data', JSON.stringify(cycleData));
  }, [cycleData]);

  const addObservation = (observation) => {
    setCycleData(prevData => {
      // Remove any existing observation for the same date
      const filteredData = prevData.filter(entry => entry.date !== observation.date);
      // Add the new observation
      return [...filteredData, observation].sort((a, b) => new Date(a.date) - new Date(b.date));
    });
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  // Register service worker for PWA functionality
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'entry':
        return (
          <ObservationEntry 
            onNavigate={handleNavigation}
            addObservation={addObservation}
          />
        );
      case 'calendar':
        return (
          <CalendarView 
            onNavigate={handleNavigation}
            cycleData={cycleData}
          />
        );
      case 'education':
        return (
          <EducationHub 
            onNavigate={handleNavigation}
          />
        );
      default:
        return (
          <Dashboard 
            onNavigate={handleNavigation}
            cycleData={cycleData}
            addObservation={addObservation}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentView()}
    </div>
  );
}

export default App;
