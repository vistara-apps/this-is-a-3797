import React, { useState, useEffect } from 'react';
import { FileText, Globe, Copy, Check, AlertTriangle, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AlertBanner } from '../../components/ui/AlertBanner';
import { ScriptCard } from './ScriptCard';
import { ScenarioSelector } from './ScenarioSelector';
import { LanguageSelector } from './LanguageSelector';
import { useLocation } from '../../hooks/useLocation';
import { useAuth } from '../../hooks/useAuth';
import { useApp } from '../../hooks/useApp';
import { scriptScenarios, getScenarioById, sampleScripts } from '../../data/script-scenarios';
import { generateScript } from '../../services/openai';
import { copyToClipboard } from '../../utils/sharing';

/**
 * ScriptsContainer component for displaying and generating scripts
 */
const ScriptsContainer = () => {
  const { state } = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { settings } = useApp();
  const [selectedScenario, setSelectedScenario] = useState('traffic_stop');
  const [language, setLanguage] = useState('en'); // 'en' for English, 'es' for Spanish
  const [script, setScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  
  // Load script when selected scenario or language changes
  useEffect(() => {
    loadScript(selectedScenario, language);
  }, [selectedScenario, language, state]);
  
  /**
   * Load script for the selected scenario and language
   * @param {string} scenarioId - Scenario ID
   * @param {string} lang - Language code ('en' or 'es')
   */
  const loadScript = async (scenarioId, lang) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if user has access to the selected language
      if (lang === 'es' && !isAuthenticated) {
        setError('Spanish language scripts require a free account.');
        setIsLoading(false);
        return;
      }
      
      // Get scenario details
      const scenario = getScenarioById(scenarioId);
      
      // Check if scenario is premium and user doesn't have premium
      if (scenario?.premium && (!isAuthenticated || !user?.isPremium)) {
        setError('This scenario requires a premium account.');
        setIsLoading(false);
        return;
      }
      
      // For demo purposes, we'll use the static data
      // In a real app, we would use the OpenAI API to generate dynamic content
      // const scriptText = await generateScript(scenario.title, lang, state);
      const scriptText = sampleScripts[scenarioId]?.[lang] || 'Script not available for this scenario and language.';
      
      setScript(scriptText);
    } catch (error) {
      console.error('Error loading script:', error);
      setError('Failed to load script. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Handle scenario selection
   * @param {string} scenarioId - Selected scenario ID
   */
  const handleScenarioSelect = (scenarioId) => {
    setSelectedScenario(scenarioId);
  };
  
  /**
   * Handle language change
   * @param {string} lang - Language code ('en' or 'es')
   */
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };
  
  /**
   * Handle copy to clipboard
   */
  const handleCopy = async () => {
    try {
      await copyToClipboard(script);
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
  
  // Get current scenario
  const currentScenario = getScenarioById(selectedScenario);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-heading font-semibold">Pre-written 'What to Say' Scripts</h1>
        </div>
        
        <LanguageSelector
          language={language}
          onChange={handleLanguageChange}
          disabled={!isAuthenticated && language === 'en'}
        />
      </div>
      
      {!isAuthenticated && language === 'es' && (
        <AlertBanner
          variant="info"
          icon={<Info className="h-4 w-4" />}
        >
          <div className="flex justify-between items-center">
            <p>Spanish language scripts require a free account.</p>
            <Button size="sm" asChild>
              <a href="/register">Sign Up</a>
            </Button>
          </div>
        </AlertBanner>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Select a Scenario</CardTitle>
              <CardDescription>
                Choose a scenario to get a script for what to say during that interaction.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScenarioSelector
                scenarios={scriptScenarios}
                selectedScenario={selectedScenario}
                onScenarioSelect={handleScenarioSelect}
                isPremium={isAuthenticated && user?.isPremium}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          {error && (
            <AlertBanner
              variant="danger"
              icon={<AlertTriangle className="h-4 w-4" />}
            >
              {error}
            </AlertBanner>
          )}
          
          <ScriptCard
            scenario={currentScenario}
            script={script}
            language={language}
            isLoading={isLoading}
            state={state}
            onCopy={handleCopy}
            copied={copied}
          />
          
          <div className="mt-4 bg-neutral-100 rounded-lg p-6">
            <p className="text-sm text-neutral-900/60 mb-4">
              <strong>Disclaimer:</strong> These scripts are provided for educational purposes only and do not constitute legal advice. Laws vary by jurisdiction and change over time. Consult with a qualified attorney for advice specific to your situation.
            </p>
            
            <div className="flex justify-center">
              <Button asChild>
                <a href="/rights-guide">View Your Rights Guide</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptsContainer;
