
import React from 'react';
import { Layers, Network, List, Table2, GitBranch, Split, Shuffle, HelpCircle } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

// The DSRP framework perspectives
export type DSRPPerspective = 'distinctions' | 'systems' | 'relationships' | 'perspectives';

// The view mode within each perspective
export type ViewMode = 'list' | 'graph' | 'table' | 'flowchart';

// Distinction types (replacing the separate Q&A view)
export type DistinctionType = 'mentalModel' | 'question' | 'experience';

interface ViewModeSelectorProps {
  activePerspective: DSRPPerspective;
  activeView: ViewMode;
  onPerspectiveChange: (perspective: DSRPPerspective) => void;
  onViewChange: (mode: ViewMode) => void;
}

const ViewModeSelector = ({ 
  activePerspective, 
  activeView, 
  onPerspectiveChange, 
  onViewChange 
}: ViewModeSelectorProps) => {
  return (
    <div className="space-y-6 w-full">
      {/* DSRP Perspective Selection */}
      <div className="flex flex-col items-center w-full">
        <div className="text-sm text-muted-foreground mb-3">
          How would you like to explore this garden?
        </div>
        <ToggleGroup 
          type="single" 
          value={activePerspective} 
          onValueChange={(value) => value && onPerspectiveChange(value as DSRPPerspective)} 
          className="flex flex-wrap justify-center gap-2"
        >
          <ToggleGroupItem 
            value="distinctions" 
            variant="outline" 
            size="sm" 
            className={`flex-1 sm:flex-initial ${activePerspective === 'distinctions' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          >
            <Split size={16} className="mr-2" />
            Distinctions
          </ToggleGroupItem>
          
          <ToggleGroupItem 
            value="systems" 
            variant="outline" 
            size="sm" 
            className={`flex-1 sm:flex-initial ${activePerspective === 'systems' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          >
            <Layers size={16} className="mr-2" />
            Systems
          </ToggleGroupItem>

          <ToggleGroupItem 
            value="relationships" 
            variant="outline" 
            size="sm" 
            className={`flex-1 sm:flex-initial ${activePerspective === 'relationships' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          >
            <Network size={16} className="mr-2" />
            Relationships
          </ToggleGroupItem>

          <ToggleGroupItem 
            value="perspectives" 
            variant="outline" 
            size="sm" 
            className={`flex-1 sm:flex-initial ${activePerspective === 'perspectives' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          >
            <Shuffle size={16} className="mr-2" />
            Perspectives
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* View Mode Selection - consistent across all perspectives */}
      <div className="flex flex-col items-center w-full">
        <div className="text-sm text-muted-foreground mb-3">
          Choose a view mode for {activePerspective.charAt(0).toUpperCase() + activePerspective.slice(1)}
        </div>
        <ToggleGroup 
          type="single" 
          value={activeView} 
          onValueChange={(value) => value && onViewChange(value as ViewMode)} 
          className="flex flex-wrap justify-center gap-2"
        >
          <ToggleGroupItem 
            value="list" 
            variant="outline" 
            size="sm" 
            className={`flex-1 sm:flex-initial ${activeView === 'list' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          >
            <List size={16} className="mr-2" />
            List
          </ToggleGroupItem>
          
          <ToggleGroupItem 
            value="graph" 
            variant="outline" 
            size="sm" 
            className={`flex-1 sm:flex-initial ${activeView === 'graph' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          >
            <Network size={16} className="mr-2" />
            Graph
          </ToggleGroupItem>
          
          <ToggleGroupItem 
            value="table" 
            variant="outline" 
            size="sm" 
            className={`flex-1 sm:flex-initial ${activeView === 'table' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          >
            <Table2 size={16} className="mr-2" />
            Table
          </ToggleGroupItem>
          
          <ToggleGroupItem 
            value="flowchart" 
            variant="outline" 
            size="sm" 
            className={`flex-1 sm:flex-initial ${activeView === 'flowchart' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          >
            <GitBranch size={16} className="mr-2" />
            Flowchart
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default ViewModeSelector;
