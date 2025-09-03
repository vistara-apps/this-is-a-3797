import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Dropdown } from '../../components/ui/Dropdown';
import { getAvailableStates } from '../../data/legal-data';

/**
 * StateSelector component for selecting a state
 * 
 * @param {Object} props - Component props
 * @param {string} props.selectedState - Currently selected state
 * @param {Function} props.onStateSelect - Callback when state is selected
 */
const StateSelector = ({ selectedState, onStateSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const states = getAvailableStates();
  
  // Filter states based on search term
  const filteredStates = states.filter(state => 
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Convert states to dropdown options
  const stateOptions = filteredStates.map(state => ({
    value: state,
    label: state,
  }));
  
  /**
   * Handle search input change
   * @param {Object} event - Input change event
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-900/50" />
        <Input
          type="text"
          placeholder="Search states..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>
      
      <Dropdown
        options={stateOptions}
        value={selectedState}
        onChange={onStateSelect}
        placeholder="Select a state"
        variant="stateSelector"
      />
    </div>
  );
};

export { StateSelector };
