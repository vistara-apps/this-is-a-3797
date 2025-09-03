import React, { createContext, useState, useEffect } from 'react';

// Create the location context
export const LocationContext = createContext();

/**
 * LocationProvider component that provides location state and methods
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  
  // Get user's location on mount
  useEffect(() => {
    const getLocation = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Check if geolocation is supported
        if (!navigator.geolocation) {
          throw new Error('Geolocation is not supported by your browser');
        }
        
        // Get current position
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Create location object
            const locationData = {
              latitude,
              longitude,
              timestamp: new Date().toISOString(),
            };
            
            // Get state from coordinates using reverse geocoding
            try {
              const stateData = await getStateFromCoordinates(latitude, longitude);
              setState(stateData);
              
              // Add state to location data
              locationData.state = stateData;
            } catch (stateError) {
              console.error('Error getting state:', stateError);
              // Continue without state data
            }
            
            // Update location
            setLocation(locationData);
            
            // Add to location history
            setLocationHistory((prevHistory) => [
              locationData,
              ...prevHistory,
            ].slice(0, 10)); // Keep only the 10 most recent locations
            
            setIsLoading(false);
          },
          (error) => {
            console.error('Error getting location:', error);
            setError(error.message);
            setIsLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } catch (error) {
        console.error('Location error:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };
    
    getLocation();
  }, []);
  
  /**
   * Get state from coordinates using reverse geocoding
   * @param {number} latitude - Latitude
   * @param {number} longitude - Longitude
   * @returns {Promise<string>} - State name
   */
  const getStateFromCoordinates = async (latitude, longitude) => {
    try {
      // In a real app, you would use a geocoding API like Google Maps or Mapbox
      // For demo purposes, we'll return a hardcoded state
      return 'California';
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  };
  
  /**
   * Manually set the state
   * @param {string} stateName - State name
   */
  const setStateManually = (stateName) => {
    setState(stateName);
    
    // Update location with new state
    if (location) {
      const updatedLocation = {
        ...location,
        state: stateName,
      };
      
      setLocation(updatedLocation);
      
      // Add to location history
      setLocationHistory((prevHistory) => [
        updatedLocation,
        ...prevHistory,
      ].slice(0, 10));
    }
  };
  
  /**
   * Refresh the user's location
   */
  const refreshLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }
      
      // Get current position
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Create location object
          const locationData = {
            latitude,
            longitude,
            timestamp: new Date().toISOString(),
          };
          
          // Get state from coordinates using reverse geocoding
          try {
            const stateData = await getStateFromCoordinates(latitude, longitude);
            setState(stateData);
            
            // Add state to location data
            locationData.state = stateData;
          } catch (stateError) {
            console.error('Error getting state:', stateError);
            // Continue without state data
          }
          
          // Update location
          setLocation(locationData);
          
          // Add to location history
          setLocationHistory((prevHistory) => [
            locationData,
            ...prevHistory,
          ].slice(0, 10));
          
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError(error.message);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } catch (error) {
      console.error('Location error:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };
  
  // Context value
  const value = {
    location,
    state,
    isLoading,
    error,
    locationHistory,
    setStateManually,
    refreshLocation,
  };
  
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
