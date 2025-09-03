import React, { useState } from 'react';
import { Share2, Copy, Check, AlertTriangle, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AlertBanner } from '../../components/ui/AlertBanner';
import { StateSelector } from '../rights-guide/StateSelector';
import { useLocation } from '../../hooks/useLocation';
import { useAuth } from '../../hooks/useAuth';
import { generateCard } from '../../services/openai';
import { uploadCard } from '../../services/pinata';
import { shareContent, copyToClipboard, generateShareableUrl } from '../../utils/sharing';

/**
 * ShareCard component for generating and sharing rights cards
 */
const ShareCard = () => {
  const { state, location } = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [selectedState, setSelectedState] = useState(state || null);
  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(null);
  
  /**
   * Handle state selection
   * @param {string} stateName - Selected state name
   */
  const handleStateSelect = (stateName) => {
    setSelectedState(stateName);
  };
  
  /**
   * Handle generate card
   */
  const handleGenerateCard = async () => {
    if (!selectedState) {
      setError('Please select a state first.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setCardData(null);
    setShareUrl(null);
    
    try {
      // In a real app, we would use the OpenAI API to generate dynamic content
      // For demo purposes, we'll use a mock card
      // const card = await generateCard(selectedState, location);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock card data
      const card = {
        title: `Know Your Rights in ${selectedState}`,
        summary: `In ${selectedState}, you have specific rights during interactions with law enforcement. These include the right to remain silent, the right to refuse searches in many circumstances, and the right to an attorney if arrested.`,
        rights: [
          'You have the right to remain silent and cannot be punished for refusing to answer questions.',
          'You have the right to refuse consent to a search of yourself, your car, or your home.',
          'If you are arrested, you have the right to a government-appointed attorney if you cannot afford one.',
          'You have the right to record police officers performing their official duties in public places.',
        ],
        dosAndDonts: {
          dos: [
            'Stay calm and keep your hands visible',
            'State clearly if you wish to remain silent',
            'Ask if you are free to leave if not under arrest',
          ],
          donts: [
            'Don\'t physically resist officers even if you believe they are violating your rights',
            'Don\'t provide false information or documents',
            'Don\'t consent to searches you don\'t want',
          ],
        },
        state: selectedState,
        location: location ? {
          latitude: location.latitude,
          longitude: location.longitude,
        } : null,
        timestamp: new Date().toISOString(),
      };
      
      setCardData(card);
      
      // In a real app, we would upload the card to Pinata
      // For demo purposes, we'll just generate a mock URL
      // const uploadResult = await uploadCard(card);
      // setShareUrl(uploadResult.url);
      
      setShareUrl(`https://example.com/share/rights/${selectedState.toLowerCase().replace(/\s+/g, '-')}`);
    } catch (error) {
      console.error('Card generation error:', error);
      setError('Failed to generate rights card. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Handle copy to clipboard
   */
  const handleCopy = async () => {
    if (!shareUrl) {
      return;
    }
    
    try {
      await copyToClipboard(shareUrl);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Copy error:', error);
      setError('Failed to copy to clipboard.');
    }
  };
  
  /**
   * Handle share
   */
  const handleShare = async () => {
    if (!shareUrl) {
      return;
    }
    
    try {
      await shareContent({
        title: `Know Your Rights in ${selectedState}`,
        text: 'Check out this rights information card from Pocket Rights Shield.',
        url: shareUrl,
      });
    } catch (error) {
      console.error('Share error:', error);
      setError('Failed to share content. Try copying the link instead.');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Share2 className="h-6 w-6 text-primary" />
        <h1 className="text-heading font-semibold">Location-Aware Content Generation</h1>
      </div>
      
      {!isAuthenticated && (
        <AlertBanner
          variant="info"
          icon={<Info className="h-4 w-4" />}
        >
          <div className="flex justify-between items-center">
            <p>Sign up to save and share your generated cards.</p>
            <Button size="sm" asChild>
              <a href="/register">Sign Up</a>
            </Button>
          </div>
        </AlertBanner>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate Shareable Card</CardTitle>
            <CardDescription>
              Create a shareable card with rights information for your location.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Select State
                </label>
                <StateSelector
                  selectedState={selectedState}
                  onStateSelect={handleStateSelect}
                />
              </div>
              
              <Button
                onClick={handleGenerateCard}
                disabled={isLoading || !selectedState}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Generating...
                  </>
                ) : (
                  'Generate Card'
                )}
              </Button>
            </div>
            
            {error && (
              <AlertBanner
                variant="danger"
                icon={<AlertTriangle className="h-4 w-4" />}
              >
                {error}
              </AlertBanner>
            )}
          </CardContent>
        </Card>
        
        {cardData && (
          <Card>
            <CardHeader>
              <CardTitle>{cardData.title}</CardTitle>
              <CardDescription>
                Generated on {new Date(cardData.timestamp).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-4">{cardData.summary}</p>
                
                <h3 className="font-semibold text-lg mb-2">Key Rights</h3>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  {cardData.rights.map((right, index) => (
                    <li key={index}>{right}</li>
                  ))}
                </ul>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Do</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {cardData.dosAndDonts.dos.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Don't</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {cardData.dosAndDonts.donts.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {shareUrl && (
                <div className="bg-neutral-100 p-3 rounded-md flex items-center justify-between">
                  <div className="truncate mr-2">
                    <span className="text-sm font-medium">Share URL:</span>
                    <span className="text-sm ml-2 text-neutral-900/60">{shareUrl}</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
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
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="w-full flex space-x-2">
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  disabled={!shareUrl}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                
                <Button
                  onClick={handleShare}
                  disabled={!shareUrl}
                  className="flex-1"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Card
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
      
      <div className="bg-neutral-100 rounded-lg p-6">
        <p className="text-sm text-neutral-900/60 mb-4">
          <strong>Disclaimer:</strong> This information is provided for educational purposes only and does not constitute legal advice. Laws vary by jurisdiction and change over time. Consult with a qualified attorney for advice specific to your situation.
        </p>
      </div>
    </div>
  );
};

export default ShareCard;
