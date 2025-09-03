import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * ProtectedRoute component that redirects to login if user is not authenticated
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {boolean} props.requirePremium - Whether the route requires premium access
 */
export const ProtectedRoute = ({ children, requirePremium = false }) => {
  const { isAuthenticated, user } = useAuth();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If premium is required but user doesn't have it, redirect to pricing
  if (requirePremium && !user?.isPremium) {
    return <Navigate to="/pricing" replace />;
  }
  
  // Otherwise, render children
  return children;
};
