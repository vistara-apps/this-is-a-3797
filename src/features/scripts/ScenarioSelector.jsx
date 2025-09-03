import React from 'react';
import { Lock } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * ScenarioSelector component for selecting a scenario
 * 
 * @param {Object} props - Component props
 * @param {Array<Object>} props.scenarios - List of scenarios
 * @param {string} props.selectedScenario - Selected scenario ID
 * @param {Function} props.onScenarioSelect - Callback when scenario is selected
 * @param {boolean} props.isPremium - Whether the user has premium access
 */
const ScenarioSelector = ({ scenarios, selectedScenario, onScenarioSelect, isPremium }) => {
  return (
    <div className="space-y-2">
      {scenarios.map((scenario) => (
        <button
          key={scenario.id}
          className={cn(
            'w-full flex items-center justify-between p-3 rounded-md text-left transition-colors',
            selectedScenario === scenario.id
              ? 'bg-primary text-white'
              : 'bg-neutral-100 hover:bg-neutral-200',
            scenario.premium && !isPremium && 'opacity-70 cursor-not-allowed'
          )}
          onClick={() => {
            if (!scenario.premium || isPremium) {
              onScenarioSelect(scenario.id);
            }
          }}
          disabled={scenario.premium && !isPremium}
        >
          <div className="flex items-center">
            <span className="font-medium">{scenario.title}</span>
          </div>
          
          {scenario.premium && !isPremium && (
            <Lock className="h-4 w-4 ml-2" />
          )}
        </button>
      ))}
    </div>
  );
};

export { ScenarioSelector };
