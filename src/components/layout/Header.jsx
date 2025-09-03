import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '../ui/Button';

/**
 * Header component for the application
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Rights Guide', path: '/rights-guide' },
    { label: 'Scripts', path: '/scripts' },
    { label: 'Record', path: '/record' },
    { label: 'Share', path: '/share' },
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-surface">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Pocket Rights Shield</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? 'text-primary' : 'text-neutral-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ConnectButton />
            </div>
            
            <button
              className="block rounded-md p-2 text-neutral-900 md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-surface md:hidden">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    isActive(item.path) ? 'text-primary' : 'text-neutral-900'
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4">
                <ConnectButton />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export { Header };
