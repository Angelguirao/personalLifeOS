
import React from 'react';
import { Sprout, Network, List, Table2, MessageCircle, GitBranch } from 'lucide-react';

const GardenGuide = () => {
  return (
    <div className="glass p-3 border-l-4 border-green-500">
      <div className="text-xs text-muted-foreground flex flex-wrap gap-2 items-center">
        <span className="font-semibold mr-1">View mental models:</span>
        <span className="flex items-center"><Sprout size={12} className="text-green-400 mr-1" /> Seedling</span>
        <span className="flex items-center"><Sprout size={12} className="text-green-500 mr-1" /> Growing</span>
        <span className="flex items-center"><Sprout size={12} className="text-green-600 mr-1" /> Evergreen</span>
      </div>
    </div>
  );
};

export default GardenGuide;
