import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Input component for text entry
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.type='text'] - Input type
 * @param {boolean} [props.error=false] - Whether the input has an error
 */
const Input = React.forwardRef(
  ({ className, type = 'text', error = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-neutral-200 bg-surface px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-error focus-visible:ring-error',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

/**
 * FormGroup component for grouping form elements with labels and error messages
 */
const FormGroup = React.forwardRef(
  ({ className, children, label, error, description, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        {children}
        {description && !error && (
          <p className="text-sm text-neutral-900/60">{description}</p>
        )}
        {error && (
          <p className="text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

FormGroup.displayName = 'FormGroup';

export { Input, FormGroup };
