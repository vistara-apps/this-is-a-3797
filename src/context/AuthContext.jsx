import React, { createContext, useState, useEffect } from 'react';

// Create the auth context
export const AuthContext = createContext();

/**
 * AuthProvider component that provides authentication state and methods
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if there's a stored token
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // In a real app, validate the token with your backend
          // For now, we'll just simulate a successful auth
          setUser({
            id: 'user-123',
            name: 'Demo User',
            email: 'demo@example.com',
            isPremium: false,
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  /**
   * Login function
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User data
   */
  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      // In a real app, make an API call to your auth endpoint
      // For demo purposes, we'll simulate a successful login
      const userData = {
        id: 'user-123',
        name: 'Demo User',
        email,
        isPremium: false,
      };
      
      // Store token in localStorage
      localStorage.setItem('auth_token', 'demo_token');
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Register function
   * @param {string} name - User name
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User data
   */
  const register = async (name, email, password) => {
    setIsLoading(true);
    
    try {
      // In a real app, make an API call to your registration endpoint
      // For demo purposes, we'll simulate a successful registration
      const userData = {
        id: 'user-123',
        name,
        email,
        isPremium: false,
      };
      
      // Store token in localStorage
      localStorage.setItem('auth_token', 'demo_token');
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return userData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Logout function
   */
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('auth_token');
    
    setUser(null);
    setIsAuthenticated(false);
  };
  
  /**
   * Update user function
   * @param {Object} userData - Updated user data
   */
  const updateUser = (userData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };
  
  /**
   * Upgrade to premium function
   */
  const upgradeToPremium = () => {
    setUser((prevUser) => ({
      ...prevUser,
      isPremium: true,
    }));
  };
  
  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    upgradeToPremium,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
