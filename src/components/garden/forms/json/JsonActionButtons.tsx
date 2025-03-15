
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Download } from 'lucide-react';
import { toast } from 'sonner';
import { JsonTabType } from './JsonTabSelector';

interface JsonActionButtonsProps {
  onImport: (jsonStr: string) => void;
  generateJson: (mode: JsonTabType) => string;
  activeTab: JsonTabType;
}

export const JsonActionButtons = ({ onImport, generateJson, activeTab }: JsonActionButtonsProps) => {
  const handleDownload = () => {
    // Create a download link
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(generateJson(activeTab));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    
    // Name the file based on the active tab
    let filename = "mental-model";
    if (activeTab !== "complete") {
      filename += `-${activeTab}`;
    }
    downloadAnchor.setAttribute("download", `${filename}-${Date.now()}.json`);
    
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportClick = () => {
    const formField = document.querySelector('textarea[name="jsonData"]') as HTMLTextAreaElement;
    if (formField) {
      try {
        onImport(formField.value);
      } catch (error) {
        toast.error('Failed to import JSON data');
      }
    }
  };

  return (
    <div className="flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={handleImportClick}
      >
        <Upload size={16} className="mr-2" /> Import from JSON
      </Button>
      
      <Button
        type="button"
        variant="outline"
        onClick={handleDownload}
      >
        <Download size={16} className="mr-2" /> Export to File
      </Button>
    </div>
  );
};
