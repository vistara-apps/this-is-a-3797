import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
  {
    variants: {
      variant: {
        info: 'bg-primary/10 border-primary text-primary [&>svg]:text-primary',
        warning: 'bg-accent/10 border-accent text-accent [&>svg]:text-accent',
        danger: 'bg-error/10 border-error text-error [&>svg]:text-error',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

/**
 * AlertBanner component for displaying important messages
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Alert content
 * @param {'info' | 'warning' | 'danger'} [props.variant='info'] - Alert style variant
 * @param {boolean} [props.dismissible=false] - Whether the alert can be dismissed
 * @param {Function} [props.onDismiss] - Callback when alert is dismissed
 */
const AlertBanner = React.forwardRef(
  ({ className, children, variant, dismissible = false, onDismiss, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon && icon}
        <div className="flex-1">{children}</div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 rounded-full p-1 hover:bg-neutral-100"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

AlertBanner.displayName = 'AlertBanner';

export { AlertBanner, alertVariants };
