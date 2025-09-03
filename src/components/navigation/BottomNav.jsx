import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, FileText, Mic, Share2, User } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * BottomNav component for mobile navigation
 */
const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      label: 'Rights', 
      path: '/rights-guide', 
      icon: <Shield className="h-6 w-6" /> 
    },
    { 
      label: 'Scripts', 
      path: '/scripts', 
      icon: <FileText className="h-6 w-6" /> 
    },
    { 
      label: 'Record', 
      path: '/record', 
      icon: <Mic className="h-6 w-6" /> 
    },
    { 
      label: 'Share', 
      path: '/share', 
      icon: <Share2 className="h-6 w-6" /> 
    },
    { 
      label: 'Profile', 
      path: '/profile', 
      icon: <User className="h-6 w-6" /> 
    },
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 z-40 w-full border-t border-neutral-200 bg-surface md:hidden">
      <div className="grid h-16 grid-cols-5">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex flex-col items-center justify-center space-y-1',
              isActive(item.path) 
                ? 'text-primary' 
                : 'text-neutral-900 hover:text-primary'
            )}
          >
            {React.cloneElement(item.icon, { 
              className: cn(
                item.icon.props.className,
                isActive(item.path) ? 'text-primary' : 'text-neutral-900'
              )
            })}
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { BottomNav };
