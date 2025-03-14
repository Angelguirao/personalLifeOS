
import React from 'react';
import { Sprout, Network, List, Table2, MessageCircle, GitBranch } from 'lucide-react';

const GardenGuide = () => {
  return (
    <div className="glass p-3 border-l-4 border-green-500">
      <div className="text-xs text-muted-foreground flex flex-wrap gap-2 items-center">
        <span className="font-semibold mr-1">Views:</span>
        <span className="flex items-center"><List size={12} className="mr-1" /> List</span>
        <span className="flex items-center"><Network size={12} className="mr-1" /> Graph</span>
        <span className="flex items-center"><Table2 size={12} className="mr-1" /> Table</span>
        <span className="flex items-center"><MessageCircle size={12} className="mr-1" /> Q&A</span>
        <span className="flex items-center"><GitBranch size={12} className="mr-1" /> Flowchart</span>
      </div>
    </div>
  );
};

export default GardenGuide;
