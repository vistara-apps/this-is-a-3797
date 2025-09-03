import { useContext } from 'react';
import { LocationContext } from '../context/LocationContext';

/**
 * Custom hook for accessing location context
 * @returns {Object} Location context value
 */
export const useLocation = () => {
  const context = useContext(LocationContext);
  
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  
  return context;
};
