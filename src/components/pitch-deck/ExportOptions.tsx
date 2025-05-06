// src/components/pitch-deck/ExportOptions.tsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../../components/ui/pitch/dropdown-menu';
import { Button } from '../../components/ui/pitch/button';
import { ChevronDown, Download, FileType } from 'lucide-react';
import { usePitchDeck } from '../../context/PitchDeckContext';

interface ExportOptionsProps {
  deckId: string;
  title: string;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ deckId, title }) => {
  const [exporting, setExporting] = useState(false);
  // Use the PitchDeckContext to access the exportDeck function
  const { exportDeck } = usePitchDeck();

  const handleExport = async (format: 'pptx' | 'pdf' | 'html') => {
    if (!deckId) {
      toast.error('Please save the deck before exporting');
      return;
    }

    try {
      setExporting(true);
      await exportDeck(deckId, format);
      toast.success(`Exported ${title} as ${format.toUpperCase()}`);
    } catch (error) {
      console.error(`Error exporting deck as ${format}:`, error);
      toast.error(`Failed to export as ${format.toUpperCase()}`);
    } finally {
      setExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={exporting}>
          <Download className="h-4 w-4 mr-2" />
          Export
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('pptx')}>
          <FileType className="h-4 w-4 mr-2" />
          PowerPoint (.pptx)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          <FileType className="h-4 w-4 mr-2" />
          PDF Document (.pdf)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('html')}>
          <FileType className="h-4 w-4 mr-2" />
          Web Presentation (.html)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportOptions;