import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary/90',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
        destructive: 'bg-error text-white hover:bg-error/90',
        outline: 'border border-neutral-200 bg-transparent hover:bg-neutral-100',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

/**
 * Button component with multiple variants
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 * @param {'primary' | 'secondary' | 'destructive' | 'outline'} [props.variant='primary'] - Button style variant
 * @param {'default' | 'sm' | 'lg'} [props.size='default'] - Button size
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props.rest - Other button attributes
 */
const Button = React.forwardRef(
  ({ className, children, variant, size, isLoading = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
