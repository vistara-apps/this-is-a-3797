import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, FileText, Mic, Share2, Home } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * BottomNav component for mobile navigation
 */
export const BottomNav = () => {
  const location = useLocation();
  
  /**
   * Check if a link is active
   * @param {string} path - Path to check
   * @returns {boolean} - Whether the link is active
   */
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200">
      <div className="grid grid-cols-5 h-16">
        <NavItem
          to="/"
          icon={<Home className="h-5 w-5" />}
          label="Home"
          isActive={isActive('/')}
        />
        
        <NavItem
          to="/rights-guide"
          icon={<Shield className="h-5 w-5" />}
          label="Rights"
          isActive={isActive('/rights-guide')}
        />
        
        <NavItem
          to="/scripts"
          icon={<FileText className="h-5 w-5" />}
          label="Scripts"
          isActive={isActive('/scripts')}
        />
        
        <NavItem
          to="/record"
          icon={<Mic className="h-5 w-5" />}
          label="Record"
          isActive={isActive('/record')}
        />
        
        <NavItem
          to="/share"
          icon={<Share2 className="h-5 w-5" />}
          label="Share"
          isActive={isActive('/share')}
        />
      </div>
    </div>
  );
};

/**
 * NavItem component for bottom navigation
 * 
 * @param {Object} props - Component props
 * @param {string} props.to - Link destination
 * @param {React.ReactNode} props.icon - Icon component
 * @param {string} props.label - Link label
 * @param {boolean} props.isActive - Whether the link is active
 */
const NavItem = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={cn(
        'flex flex-col items-center justify-center',
        isActive ? 'text-primary' : 'text-neutral-900'
      )}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs">{label}</span>
    </Link>
  );
};
