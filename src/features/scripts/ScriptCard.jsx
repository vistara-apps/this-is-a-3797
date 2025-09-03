import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Copy, Check, Globe } from 'lucide-react';

/**
 * ScriptCard component for displaying a script
 * 
 * @param {Object} props - Component props
 * @param {Object} props.scenario - Scenario data
 * @param {string} props.script - Script text
 * @param {string} props.language - Language code ('en' or 'es')
 * @param {boolean} props.isLoading - Whether the script is loading
 * @param {string} props.state - State name
 * @param {Function} props.onCopy - Callback when copy button is clicked
 * @param {boolean} props.copied - Whether the script has been copied
 */
const ScriptCard = ({ scenario, script, language, isLoading, state, onCopy, copied }) => {
  if (!scenario) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{scenario.title}</span>
          <div className="flex items-center text-sm font-normal">
            <Globe className="h-4 w-4 mr-1" />
            <span>{language === 'en' ? 'English' : 'Español'}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
            <p className="mt-2 text-sm text-neutral-900/60">Generating script...</p>
          </div>
        ) : (
          <div className="bg-neutral-100 p-4 rounded-md">
            <p className="whitespace-pre-wrap">{script}</p>
          </div>
        )}
        
        {state && !isLoading && (
          <p className="mt-4 text-sm text-neutral-900/60">
            This script is tailored for interactions in <span className="font-semibold">{state}</span>.
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-neutral-900/60">
          {scenario.description}
        </p>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onCopy}
          disabled={isLoading || !script}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export { ScriptCard };
