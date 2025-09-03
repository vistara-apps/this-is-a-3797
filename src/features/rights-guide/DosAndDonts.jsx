import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { CheckCircle, XCircle } from 'lucide-react';

/**
 * DosAndDonts component for displaying dos and don'ts
 * 
 * @param {Object} props - Component props
 * @param {Array<string>} props.dos - List of dos
 * @param {Array<string>} props.donts - List of don'ts
 */
const DosAndDonts = ({ dos, donts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dos and Don'ts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center text-success">
              <CheckCircle className="h-5 w-5 mr-2" />
              Do
            </h3>
            <ul className="space-y-2">
              {dos.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-success shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center text-error">
              <XCircle className="h-5 w-5 mr-2" />
              Don't
            </h3>
            <ul className="space-y-2">
              {donts.map((item, index) => (
                <li key={index} className="flex items-start">
                  <XCircle className="h-4 w-4 mr-2 text-error shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { DosAndDonts };
