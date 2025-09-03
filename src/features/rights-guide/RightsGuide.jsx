import React, { useState, useEffect } from 'react';
import { Shield, RefreshCw, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AlertBanner } from '../../components/ui/AlertBanner';
import { StateSelector } from './StateSelector';
import { RightsSummary } from './RightsSummary';
import { DosAndDonts } from './DosAndDonts';
import { useLocation } from '../../hooks/useLocation';
import { useAuth } from '../../hooks/useAuth';
import { getLegalDataForState } from '../../data/legal-data';
import { generateRightsInfo } from '../../services/openai';

/**
 * RightsGuide component that displays state-specific rights information
 */
const RightsGuide = () => {
  const { state, isLoading: locationLoading, refreshLocation, setStateManually } = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [selectedState, setSelectedState] = useState(null);
  const [rightsData, setRightsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'es' for Spanish
  
  // Set selected state from location when available
  useEffect(() => {
    if (state && !selectedState) {
      setSelectedState(state);
    }
  }, [state, selectedState]);
  
  // Load rights data when selected state changes
  useEffect(() => {
    if (selectedState) {
      loadRightsData(selectedState);
    }
  }, [selectedState, language]);
  
  /**
   * Load rights data for the selected state
   * @param {string} stateName - State name
   */
  const loadRightsData = async (stateName) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll use the static data
      // In a real app, we would use the OpenAI API to generate dynamic content
      // const data = await generateRightsInfo(stateName, language);
      const data = getLegalDataForState(stateName);
      
      setRightsData(data);
    } catch (error) {
      console.error('Error loading rights data:', error);
      setError('Failed to load rights information. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Handle state selection
   * @param {string} stateName - Selected state name
   */
  const handleStateSelect = (stateName) => {
    setSelectedState(stateName);
    setStateManually(stateName);
  };
  
  /**
   * Handle refresh location
   */
  const handleRefreshLocation = () => {
    refreshLocation();
  };
  
  /**
   * Handle language change
   * @param {string} lang - Language code ('en' or 'es')
   */
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-heading font-semibold">State-Specific Rights Guide</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleLanguageChange(language === 'en' ? 'es' : 'en')}
            disabled={!isAuthenticated && language === 'es'}
          >
            {language === 'en' ? 'Español' : 'English'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshLocation}
            disabled={locationLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${locationLoading ? 'animate-spin' : ''}`} />
            Refresh Location
          </Button>
        </div>
      </div>
      
      {!isAuthenticated && language === 'es' && (
        <AlertBanner
          variant="info"
          icon={<Info className="h-4 w-4" />}
        >
          <div className="flex justify-between items-center">
            <p>Spanish language content requires a free account.</p>
            <Button size="sm" asChild>
              <a href="/register">Sign Up</a>
            </Button>
          </div>
        </AlertBanner>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Select Your State</CardTitle>
          <CardDescription>
            Choose your state to see specific rights information relevant to your location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StateSelector
            selectedState={selectedState}
            onStateSelect={handleStateSelect}
          />
        </CardContent>
      </Card>
      
      {error && (
        <AlertBanner
          variant="danger"
          icon={<AlertTriangle className="h-4 w-4" />}
        >
          {error}
        </AlertBanner>
      )}
      
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-2 text-sm text-neutral-900/60">Loading rights information...</p>
        </div>
      )}
      
      {!isLoading && rightsData && (
        <>
          <RightsSummary
            overview={rightsData.overview}
            rights={rightsData.rights}
            state={selectedState}
          />
          
          <DosAndDonts
            dos={rightsData.dosAndDonts.dos}
            donts={rightsData.dosAndDonts.donts}
          />
          
          {rightsData.specialConsiderations && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  Special Considerations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{rightsData.specialConsiderations}</p>
              </CardContent>
            </Card>
          )}
          
          <div className="bg-neutral-100 rounded-lg p-6">
            <p className="text-sm text-neutral-900/60 mb-4">
              <strong>Disclaimer:</strong> This information is provided for educational purposes only and does not constitute legal advice. Laws vary by jurisdiction and change over time. Consult with a qualified attorney for advice specific to your situation.
            </p>
            
            <div className="flex justify-center">
              <Button asChild>
                <a href="/scripts">View What to Say Scripts</a>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RightsGuide;
