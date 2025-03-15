
import React from 'react';
import GardenSearch from '@/components/garden/GardenSearch';
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
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex gap-2">
        {/* Only show the create distinction button when authenticated */}
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
      </div>
    </div>
  );
};

export default GardenActionBar;
