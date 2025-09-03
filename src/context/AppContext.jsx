import React, { createContext, useState } from 'react';

// Create the app context
export const AppContext = createContext();

/**
 * AppProvider component that provides application state and methods
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AppProvider = ({ children }) => {
  // App settings
  const [settings, setSettings] = useState({
    language: 'en', // Default language (en = English, es = Spanish)
    theme: 'light', // Default theme
    notifications: true, // Default notifications setting
    emergencyContacts: [], // Default emergency contacts
  });
  
  // App state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState(null); // 'audio' or 'video'
  const [recordings, setRecordings] = useState([]);
  const [generatedCards, setGeneratedCards] = useState([]);
  
  /**
   * Update settings
   * @param {Object} newSettings - New settings
   */
  const updateSettings = (newSettings) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  };
  
  /**
   * Add emergency contact
   * @param {Object} contact - Contact object
   */
  const addEmergencyContact = (contact) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      emergencyContacts: [...prevSettings.emergencyContacts, contact],
    }));
  };
  
  /**
   * Remove emergency contact
   * @param {string} contactId - Contact ID
   */
  const removeEmergencyContact = (contactId) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      emergencyContacts: prevSettings.emergencyContacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };
  
  /**
   * Start recording
   * @param {string} type - Recording type ('audio' or 'video')
   */
  const startRecording = (type) => {
    setIsRecording(true);
    setRecordingType(type);
  };
  
  /**
   * Stop recording
   * @param {Object} recordingData - Recording data
   */
  const stopRecording = (recordingData) => {
    setIsRecording(false);
    setRecordingType(null);
    
    // Add recording to list
    if (recordingData) {
      setRecordings((prevRecordings) => [
        {
          id: `recording-${Date.now()}`,
          timestamp: new Date().toISOString(),
          ...recordingData,
        },
        ...prevRecordings,
      ]);
    }
  };
  
  /**
   * Add generated card
   * @param {Object} cardData - Card data
   */
  const addGeneratedCard = (cardData) => {
    setGeneratedCards((prevCards) => [
      {
        id: `card-${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...cardData,
      },
      ...prevCards,
    ]);
  };
  
  // Context value
  const value = {
    settings,
    updateSettings,
    addEmergencyContact,
    removeEmergencyContact,
    isRecording,
    recordingType,
    recordings,
    startRecording,
    stopRecording,
    generatedCards,
    addGeneratedCard,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
