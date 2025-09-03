import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Shield } from 'lucide-react';

/**
 * RightsSummary component for displaying rights information
 * 
 * @param {Object} props - Component props
 * @param {string} props.overview - Overview text
 * @param {Array<Object>} props.rights - Rights data
 * @param {string} props.state - State name
 */
const RightsSummary = ({ overview, rights, state }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-primary" />
          Know Your Rights in {state}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="mb-4">{overview}</p>
        </div>
        
        <div className="space-y-4">
          {rights.map((right, index) => (
            <div key={index} className="border-b border-neutral-200 pb-4 last:border-0 last:pb-0">
              <h3 className="font-semibold text-lg mb-2">{right.title}</h3>
              <p>{right.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { RightsSummary };
