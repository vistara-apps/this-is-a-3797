import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import Home from './features/home/Home';
import RightsGuide from './features/rights-guide/RightsGuide';
import ScriptsContainer from './features/scripts/ScriptsContainer';
import RecordingControls from './features/recording/RecordingControls';
import ShareCard from './features/share/ShareCard';

/**
 * Application routes
 */
const AppRoutes = () => {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rights-guide" element={<RightsGuide />} />
        <Route path="/scripts" element={<ScriptsContainer />} />
        <Route path="/record" element={<RecordingControls />} />
        <Route path="/share" element={<ShareCard />} />
        
        {/* Protected routes */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <div>Account Page</div>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/pricing"
          element={
            <div>Pricing Page</div>
          }
        />
        
        <Route
          path="/login"
          element={
            <div>Login Page</div>
          }
        />
        
        <Route
          path="/register"
          element={
            <div>Register Page</div>
          }
        />
        
        {/* 404 page */}
        <Route
          path="*"
          element={
            <div className="text-center py-12">
              <h1 className="text-heading font-bold mb-4">Page Not Found</h1>
              <p className="mb-6">The page you're looking for doesn't exist.</p>
              <a href="/" className="text-primary hover:underline">
                Go back home
              </a>
            </div>
          }
        />
      </Routes>
    </AppShell>
  );
};

export default AppRoutes;
