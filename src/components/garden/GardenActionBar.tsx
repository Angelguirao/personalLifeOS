
import React from 'react';
import GardenSearch from '@/components/garden/GardenSearch';
import ModelManagement from '@/components/garden/ModelManagement';
import { DSRPPerspective } from '@/components/garden/ViewModeSelector';

interface GardenActionBarProps {
  activePerspective: DSRPPerspective;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onRefresh: () => void;
}

const GardenActionBar: React.FC<GardenActionBarProps> = ({
  activePerspective,
  searchQuery,
  setSearchQuery,
  onRefresh
}) => {
  // Determine if search should be shown
  const showSearch = activePerspective === 'distinctions';

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      {showSearch && (
        <GardenSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}
      
      {/* Only show model management when in Distinctions perspective */}
      {activePerspective === 'distinctions' && (
        <div className="flex gap-2">
          <ModelManagement onRefresh={onRefresh} />
        </div>
      )}
    </div>
  );
};

export default GardenActionBar;
