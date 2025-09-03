import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/navigation/ProtectedRoute';
import { BottomNav } from '../components/navigation/BottomNav';
import { AppShell } from '../components/layout/AppShell';

// Lazy load pages for better performance
const Home = React.lazy(() => import('../features/home/Home'));
const RightsGuide = React.lazy(() => import('../features/rights-guide/RightsGuide'));
const Scripts = React.lazy(() => import('../features/scripts/ScriptsContainer'));
const Record = React.lazy(() => import('../features/recording/RecordingControls'));
const Share = React.lazy(() => import('../features/content-generation/CardGenerator'));
const Login = React.lazy(() => import('../features/auth/Login'));
const Register = React.lazy(() => import('../features/auth/Register'));
const Profile = React.lazy(() => import('../features/auth/Profile'));
const Pricing = React.lazy(() => import('../features/payment/PricingOptions'));

/**
 * AppRoutes component that defines the application routes
 */
const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={
            <AppShell>
              <React.Suspense fallback={<div>Loading...</div>}>
                <Home />
              </React.Suspense>
            </AppShell>
          } 
        />
        
        <Route 
          path="/rights-guide" 
          element={
            <AppShell>
              <React.Suspense fallback={<div>Loading...</div>}>
                <RightsGuide />
              </React.Suspense>
            </AppShell>
          } 
        />
        
        <Route 
          path="/login" 
          element={
            <AppShell showHeader={false}>
              <React.Suspense fallback={<div>Loading...</div>}>
                <Login />
              </React.Suspense>
            </AppShell>
          } 
        />
        
        <Route 
          path="/register" 
          element={
            <AppShell showHeader={false}>
              <React.Suspense fallback={<div>Loading...</div>}>
                <Register />
              </React.Suspense>
            </AppShell>
          } 
        />
        
        <Route 
          path="/pricing" 
          element={
            <AppShell>
              <React.Suspense fallback={<div>Loading...</div>}>
                <Pricing />
              </React.Suspense>
            </AppShell>
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/scripts" 
          element={
            <ProtectedRoute>
              <AppShell>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Scripts />
                </React.Suspense>
              </AppShell>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/record" 
          element={
            <ProtectedRoute>
              <AppShell>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Record />
                </React.Suspense>
              </AppShell>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/share" 
          element={
            <ProtectedRoute>
              <AppShell>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Share />
                </React.Suspense>
              </AppShell>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <AppShell>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Profile />
                </React.Suspense>
              </AppShell>
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Bottom navigation for mobile */}
      <BottomNav />
    </>
  );
};

export default AppRoutes;
