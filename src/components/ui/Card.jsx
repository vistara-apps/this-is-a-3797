import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Card component for displaying content in a contained box
 */
const Card = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-neutral-200 bg-surface p-6 shadow-card',
        className
      )}
      {...props}
    />
  );
});
Card.displayName = 'Card';

/**
 * Card header component
 */
const CardHeader = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  );
});
CardHeader.displayName = 'CardHeader';

/**
 * Card title component
 */
const CardTitle = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn('text-heading font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
});
CardTitle.displayName = 'CardTitle';

/**
 * Card description component
 */
const CardDescription = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-neutral-900/60', className)}
      {...props}
    />
  );
});
CardDescription.displayName = 'CardDescription';

/**
 * Card content component
 */
const CardContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('pt-0', className)} {...props} />
  );
});
CardContent.displayName = 'CardContent';

/**
 * Card footer component
 */
const CardFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  );
});
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
