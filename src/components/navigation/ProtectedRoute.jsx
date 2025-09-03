import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * ProtectedRoute component that redirects to login if user is not authenticated
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render if authenticated
 * @param {boolean} [props.requirePremium=false] - Whether the route requires premium access
 */
const ProtectedRoute = ({ children, requirePremium = false }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If premium is required but user doesn't have it, redirect to pricing
  if (requirePremium && !user?.isPremium) {
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }
  
  return children;
};

export { ProtectedRoute };
