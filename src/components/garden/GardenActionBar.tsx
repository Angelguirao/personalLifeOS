
import React from 'react';
import GardenSearch from '@/components/garden/GardenSearch';
import ModelManagement from '@/components/garden/ModelManagement';
import { DSRPPerspective } from '@/components/garden/ViewModeSelector';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface GardenActionBarProps {
  activePerspective: DSRPPerspective;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onRefresh: () => void;
  onCreateDistinction?: () => void;
  isAuthenticated: boolean;
}

const GardenActionBar: React.FC<GardenActionBarProps> = ({
  activePerspective,
  searchQuery,
  setSearchQuery,
  onRefresh,
  onCreateDistinction,
  isAuthenticated
}) => {
  // Determine if search should be shown
  const showSearch = activePerspective === 'distinctions' || activePerspective === 'systems';

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      {showSearch && (
        <GardenSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}
      
      <div className="flex gap-2">
        {/* Create distinction button for Distinctions perspective */}
        {activePerspective === 'distinctions' && isAuthenticated && onCreateDistinction && (
          <Button 
            size="sm" 
            onClick={onCreateDistinction}
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            New Distinction
          </Button>
        )}
        
        {/* Only show model management when in Distinctions perspective */}
        {activePerspective === 'distinctions' && (
          <ModelManagement onRefresh={onRefresh} />
        )}
      </div>
    </div>
  );
};

export default GardenActionBar;
