import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

/**
 * Custom hook for accessing app context
 * @returns {Object} App context value
 */
export const useApp = () => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
};
