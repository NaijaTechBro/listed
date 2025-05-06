
// src/components/SectorSelector.tsx
import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/pitch/select';

interface SectorSelectorProps {
  selectedSector: string;
  sectors: string[];
  onChange: (sector: string) => void;
}

const SectorSelector: React.FC<SectorSelectorProps> = ({ selectedSector, sectors, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Select Your Sector</h3>
      <Select value={selectedSector} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a sector" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector.charAt(0).toUpperCase() + sector.slice(1)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      {selectedSector && (
        <div className="mt-2 text-sm text-gray-600">
          Templates and examples will be tailored to {selectedSector.charAt(0).toUpperCase() + selectedSector.slice(1)} ventures in Africa.
        </div>
      )}
    </div>
  );
};

export default SectorSelector;