
import React from 'react';
import { Layers, Network, List, Table2, MessageCircle, GitBranch, Sprout, BookText, BookOpen, Book, HelpCircle } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

// The top-level hierarchical perspective
export type HierarchicalPerspective = 'questions' | 'mentalModels';

// The view mode within each perspective
export type ViewMode = 'list' | 'graph' | 'table' | 'qa' | 'flowchart' | 'hierarchy';

interface ViewModeSelectorProps {
  activePerspective: HierarchicalPerspective;
  activeView: ViewMode;
  onPerspectiveChange: (perspective: HierarchicalPerspective) => void;
  onViewChange: (mode: ViewMode) => void;
}

const ViewModeSelector = ({ 
  activePerspective, 
  activeView, 
  onPerspectiveChange, 
  onViewChange 
}: ViewModeSelectorProps) => {
  return (
    <div className="space-y-4 w-full">
      {/* Perspective Selection */}
      <div className="flex flex-col items-center w-full">
        <div className="text-sm text-muted-foreground mb-2">
          From which hierarchical perspective would you like to explore this garden?
        </div>
        <ToggleGroup 
          type="single" 
          value={activePerspective} 
          onValueChange={(value) => value && onPerspectiveChange(value as HierarchicalPerspective)} 
          className="flex flex-wrap justify-center"
        >
          <ToggleGroupItem 
            value="mentalModels" 
            variant="outline" 
            size="sm" 
            className={`flex-1 sm:flex-initial ${activePerspective === 'mentalModels' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          >
            <Book size={16} className="mr-2" />
            Mental Models
          </ToggleGroupItem>
          
          <ToggleGroupItem 
            value="questions" 
            variant="outline" 
            size="sm" 
            className={`flex-1 sm:flex-initial ${activePerspective === 'questions' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          >
            <HelpCircle size={16} className="mr-2" />
            Questions
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* View Mode Selection (only show if Mental Models is selected) */}
      {activePerspective === 'mentalModels' && (
        <div className="flex justify-center w-full">
          <ToggleGroup 
            type="single" 
            value={activeView} 
            onValueChange={(value) => value && onViewChange(value as ViewMode)} 
            className="flex flex-wrap justify-center"
          >
            <ToggleGroupItem 
              value="hierarchy" 
              variant="outline" 
              size="sm" 
              className={`flex-1 sm:flex-initial ${activeView === 'hierarchy' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
            >
              <Layers size={16} className="mr-2" />
              Hierarchy
            </ToggleGroupItem>
            
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
              value="flowchart" 
              variant="outline" 
              size="sm" 
              className={`flex-1 sm:flex-initial ${activeView === 'flowchart' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
              disabled={true}
            >
              <GitBranch size={16} className="mr-2" />
              Flowchart
            </ToggleGroupItem>
            
            <ToggleGroupItem 
              value="table" 
              variant="outline" 
              size="sm" 
              className={`flex-1 sm:flex-initial ${activeView === 'table' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
              disabled={true}
            >
              <Table2 size={16} className="mr-2" />
              Table
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      )}
    </div>
  );
};

export default ViewModeSelector;
