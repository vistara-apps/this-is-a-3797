import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { AppProvider } from './context/AppContext';

/**
 * Main App component that sets up providers and routing
 */
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <LocationProvider>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </LocationProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
