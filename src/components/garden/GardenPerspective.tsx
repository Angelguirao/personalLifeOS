
import React from 'react';
import { DSRPPerspective, ViewMode } from '@/components/garden/ViewModeSelector';
import GardenActionBar from '@/components/garden/GardenActionBar';
import GardenContent from '@/components/garden/GardenContent';
import SystemsView from '@/components/garden/SystemsView';
import { MentalModel, Connection, Question, System } from '@/lib/garden/types';

interface GardenPerspectiveProps {
  activePerspective: DSRPPerspective;
  activeView: ViewMode;
  models: MentalModel[];
  filteredModels: MentalModel[];
  connections: Connection[];
  questions: Question[];
  systems: System[];
  selectedModel: MentalModel | undefined;
  selectedSystem: System | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCreateDistinction: () => void;
  onCreateSystem: () => void;
  onCreateQuestion: (questionData: Omit<Question, 'id'>) => Promise<void>;
  handleModelSelect: (model: MentalModel) => void;
  handleSystemSelect: (system: System) => void;
  fetchData: () => void;
}

const GardenPerspective = ({
  activePerspective,
  activeView,
  models,
  filteredModels,
  connections,
  questions,
  systems,
  selectedModel,
  selectedSystem,
  isLoading,
  isAuthenticated,
  searchQuery,
  setSearchQuery,
  onCreateDistinction,
  onCreateSystem,
  onCreateQuestion,
  handleModelSelect,
  handleSystemSelect,
  fetchData,
}: GardenPerspectiveProps) => {
  return (
    <>
      {/* Action Area: Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <GardenActionBar 
          activePerspective={activePerspective}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onRefresh={fetchData}
          onCreateDistinction={onCreateDistinction}
          isAuthenticated={isAuthenticated}
        />
      </div>
      
      {/* Content Area */}
      <div>
        {activePerspective === 'systems' ? (
          <SystemsView 
            onSelectSystem={handleSystemSelect} 
            isAuthenticated={isAuthenticated}
            onRefresh={fetchData}
          />
        ) : (
          <GardenContent 
            activePerspective={activePerspective}
            activeView={activeView}
            models={models}
            filteredModels={filteredModels}
            connections={connections}
            questions={questions}
            selectedModel={selectedModel}
            isLoading={isLoading}
            isAuthenticated={isAuthenticated}
            onCreateDistinction={onCreateDistinction}
            handleModelSelect={handleModelSelect}
            onCreateQuestion={onCreateQuestion}
            fetchData={fetchData}
          />
        )}
      </div>
    </>
  );
};

export default GardenPerspective;
