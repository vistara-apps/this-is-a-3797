import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * FormGroup component for grouping form elements with labels and error messages
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Label text
 * @param {string} props.htmlFor - ID of the input element this label is for
 * @param {string} [props.error] - Error message to display
 * @param {React.ReactNode} props.children - Form control element(s)
 * @param {string} [props.className] - Additional CSS classes
 */
const FormGroup = ({ 
  label, 
  htmlFor, 
  error, 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {label && (
        <label 
          htmlFor={htmlFor} 
          className="block text-sm font-medium text-neutral-900"
        >
          {label}
        </label>
      )}
      
      {children}
      
      {error && (
        <div className="flex items-center text-red-600 text-sm mt-1">
          <AlertTriangle className="h-4 w-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export { FormGroup };

