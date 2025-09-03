import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

/**
 * Dropdown component for selecting from a list of options
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {Array} props.options - Array of options to display
 * @param {string|number} [props.value] - Currently selected value
 * @param {Function} props.onChange - Callback when selection changes
 * @param {string} [props.placeholder='Select an option'] - Placeholder text
 * @param {string} [props.variant='default'] - Dropdown variant (default, stateSelector, languageSelector)
 */
const Dropdown = ({
  className,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  variant = 'default',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const selectedOption = options.find(option => option.value === value);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };
  
  const variantStyles = {
    default: 'bg-surface border border-neutral-200',
    stateSelector: 'bg-primary/10 border-primary text-primary',
    languageSelector: 'bg-accent/10 border-accent text-accent',
  };
  
  return (
    <div 
      ref={dropdownRef}
      className={cn('relative w-full', className)}
      {...props}
    >
      <button
        type="button"
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md px-3 py-2 text-sm',
          variantStyles[variant] || variantStyles.default
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-neutral-200 bg-surface shadow-lg">
          <ul 
            className="max-h-60 overflow-auto py-1"
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={cn(
                  'cursor-pointer px-3 py-2 text-sm hover:bg-neutral-100',
                  option.value === value && 'bg-primary/10 text-primary'
                )}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Dropdown };
