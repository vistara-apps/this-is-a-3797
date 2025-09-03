import React from 'react';
import { Button } from '../../components/ui/Button';
import { Globe } from 'lucide-react';

/**
 * LanguageSelector component for selecting a language
 * 
 * @param {Object} props - Component props
 * @param {string} props.language - Selected language code ('en' or 'es')
 * @param {Function} props.onChange - Callback when language is changed
 * @param {boolean} props.disabled - Whether the selector is disabled
 */
const LanguageSelector = ({ language, onChange, disabled }) => {
  return (
    <div className="flex items-center space-x-2 bg-neutral-100 rounded-md p-1">
      <Button
        variant={language === 'en' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => onChange('en')}
        className="px-3"
      >
        <Globe className="h-4 w-4 mr-2" />
        English
      </Button>
      
      <Button
        variant={language === 'es' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => onChange('es')}
        disabled={disabled}
        className="px-3"
      >
        <Globe className="h-4 w-4 mr-2" />
        Español
      </Button>
    </div>
  );
};

export { LanguageSelector };
