import React from 'react';
import ListView from '@/components/garden/ListView';
import GraphView from '@/components/garden/GraphView';
import { Button } from '@/components/ui/button';
import { DataModelAdapter } from '@/lib/garden/adapters';
import EmptyGarden from '@/components/garden/EmptyGarden';
import PlaceholderView from '@/components/garden/PlaceholderView';
import { DSRPPerspective, ViewMode } from '@/components/garden/ViewModeSelector';
import { MentalModel, Question } from '@/lib/garden/types';
import { Connection } from '@/lib/garden/types';
import { Loader2, CircleOff, Plus, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GardenContentProps {
  activePerspective: DSRPPerspective;
  activeView: ViewMode;
  models: MentalModel[];
  filteredModels: MentalModel[];
  connections: Connection[];
  questions: Question[];
  selectedModel?: MentalModel;
  isLoading: boolean;
  isAuthenticated: boolean;
  onCreateDistinction: () => void;
  handleModelSelect: (model: MentalModel) => void;
  onCreateQuestion: (questionData: Omit<Question, 'id'>) => Promise<void>;
  fetchData: () => void;
}

const GardenContent: React.FC<GardenContentProps> = ({
  activePerspective,
  activeView,
  models,
  filteredModels,
  connections,
  questions,
  selectedModel,
  isLoading,
  isAuthenticated,
  onCreateDistinction,
  handleModelSelect,
  onCreateQuestion,
  fetchData
}) => {
  // Convert to garden notes for legacy components
  const gardenNotes = DataModelAdapter.modelsToNotes(models);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Distinctions Perspective (Mental Models, Questions, Experiences, etc.)
  if (activePerspective === 'distinctions') {
    // Header with title and Create Distinction button
    const DistinctionsHeader = () => (
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Distinctions</h2>
          <Badge variant="outline" className="ml-2">
            {models.length}
          </Badge>
        </div>
        
        {isAuthenticated && (
          <Button 
            onClick={onCreateDistinction} 
            size="sm"
            className="gap-1"
          >
            <Plus size={16} />
            New Distinction
          </Button>
        )}
      </div>
    );

    if (models.length === 0) {
      return (
        <div className="space-y-4">
          <DistinctionsHeader />
          <div className="text-center p-8 bg-muted/40 rounded-lg border border-dashed">
            <CircleOff className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-1">No Distinctions Found</h3>
            <p className="text-muted-foreground">
              Distinctions help you identify and understand important concepts.
            </p>
            {isAuthenticated && (
              <Button onClick={onCreateDistinction} className="mt-4 gap-1">
                <Plus size={16} />
                Create Your First Distinction
              </Button>
            )}
          </div>
        </div>
      );
    }

    if (activeView === 'list') {
      return (
        <div className="space-y-4">
          <DistinctionsHeader />
          <ListView 
            notes={filteredModels} 
            onSelectModel={handleModelSelect}
            selectedModelId={selectedModel?.id}
            onRefresh={fetchData}
          />
        </div>
      );
    }
    
    if (activeView === 'graph' && connections.length > 0 && gardenNotes.length > 0) {
      return (
        <div className="space-y-4">
          <DistinctionsHeader />
          <div className="h-[600px] rounded-xl border shadow-sm overflow-hidden">
            <GraphView 
              nodes={gardenNotes}
              connections={connections} 
              models={models}
            />
          </div>
        </div>
      );
    } 
    
    if (activeView === 'graph') {
      return (
        <div className="space-y-4">
          <DistinctionsHeader />
          <div className="h-[600px] rounded-xl border shadow-sm overflow-hidden flex items-center justify-center">
            <div className="text-center p-6 max-w-md">
              <h3 className="text-lg font-medium mb-2">No Graph Data Available</h3>
              <p className="text-muted-foreground">
                {connections.length === 0 ? 
                  "There are no connections between notes to display in the graph." : 
                  "There was a problem with the graph data."}
              </p>
              <Button onClick={fetchData} className="mt-4">
                Refresh Data
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (activeView === 'flowchart' || activeView === 'table') {
      return (
        <div className="space-y-4">
          <DistinctionsHeader />
          <PlaceholderView 
            title={activeView === 'flowchart' ? 'Flowchart View' : 'Table View'} 
          />
        </div>
      );
    }
  }

  // Other perspectives - placeholder views
  return (
    <PlaceholderView 
      title={activePerspective.charAt(0).toUpperCase() + activePerspective.slice(1)} 
    />
  );
};

export default GardenContent;
