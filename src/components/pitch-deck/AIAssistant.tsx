
// src/components/AIAssistant.tsx
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../../components/ui/pitch/button';

interface AIAssistantProps {
  suggestions: string;
  onApply: () => void;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ suggestions, onApply, onClose }) => {
  return (
    <div className="bg-blue-50 rounded-lg p-4 relative">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <X size={18} />
      </button>
      
      <h3 className="text-lg font-medium mb-2">AI Suggestions</h3>
      <div className="prose max-w-none mb-4" dangerouslySetInnerHTML={{ __html: suggestions }} />
      
      <div className="flex justify-end">
        <Button onClick={onApply} variant="default">
          Apply Suggestion
        </Button>
      </div>
    </div>
  );
};

export default AIAssistant;
