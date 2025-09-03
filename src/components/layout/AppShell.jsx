import React from 'react';
import { cn } from '../../utils/cn';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

/**
 * AppShell component that provides the main layout structure for the application
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render inside the app shell
 * @param {string} [props.className] - Additional CSS classes for the main content area
 * @param {boolean} [props.showHeader=true] - Whether to show the header
 */
const AppShell = ({ children, className, showHeader = true }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {showHeader && <Header />}
      <main className={cn('flex-1 container mx-auto px-4 py-6 md:pb-6 pb-20', className)}>
        {children}
      </main>
      <BottomNav />
      <footer className="py-6 border-t border-neutral-200 md:block hidden">
        <div className="container mx-auto px-4 text-center text-sm text-neutral-900/60">
          <p>© {new Date().getFullYear()} Pocket Rights Shield. All rights reserved.</p>
          <p className="text-xs text-neutral-900/40 mt-1">
            This app is for educational purposes only and does not constitute legal advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export { AppShell };
