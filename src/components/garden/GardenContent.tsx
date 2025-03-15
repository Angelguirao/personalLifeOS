import React from 'react';
import ListView from '@/components/garden/ListView';
import GraphView from '@/components/garden/GraphView';
import { QuestionsView } from '@/components/garden/questions/QuestionsView';
import { Button } from '@/components/ui/button';
import { DataModelAdapter } from '@/lib/garden/adapters';
import EmptyGarden from '@/components/garden/EmptyGarden';
import PlaceholderView from '@/components/garden/PlaceholderView';
import { HierarchicalPerspective, ViewMode } from '@/components/garden/ViewModeSelector';
import { MentalModel, Question } from '@/lib/garden/types';
import { Connection } from '@/lib/garden/types';

interface GardenContentProps {
  activePerspective: HierarchicalPerspective;
  activeView: ViewMode;
  models: MentalModel[];
  filteredModels: MentalModel[];
  connections: Connection[];
  questions: Question[];
  selectedModel?: MentalModel;
  isLoading: boolean;
  isAuthenticated: boolean;
  onCreateModel: () => void;
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
  onCreateModel,
  handleModelSelect,
  onCreateQuestion,
  fetchData
}) => {
  // Convert to garden notes for legacy components
  const gardenNotes = DataModelAdapter.modelsToNotes(models);

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
      </div>
    );
  }

  // Questions Perspective
  if (activePerspective === 'questions') {
    return (
      <QuestionsView 
        questions={questions} 
        models={models.map(m => ({ id: m.id, title: m.title }))}
        onCreateQuestion={onCreateQuestion}
      />
    );
  }

  // Mental Models Perspective
  if (activePerspective === 'mentalModels') {
    if (models.length === 0) {
      return (
        <EmptyGarden 
          onCreateModel={onCreateModel} 
          isAuthenticated={isAuthenticated}
        />
      );
    }

    if (activeView === 'list') {
      return (
        <ListView 
          notes={filteredModels} 
          onSelectModel={handleModelSelect}
          selectedModelId={selectedModel?.id}
          onRefresh={fetchData}
        />
      );
    }
    
    if (activeView === 'graph' && connections.length > 0 && gardenNotes.length > 0) {
      return (
        <div className="h-[600px] rounded-xl border shadow-sm overflow-hidden">
          <GraphView 
            nodes={gardenNotes}
            connections={connections} 
            models={models}
          />
        </div>
      );
    } 
    
    if (activeView === 'graph') {
      return (
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
      );
    }

    if (activeView === 'flowchart' || activeView === 'table') {
      return (
        <PlaceholderView 
          title={activeView === 'flowchart' ? 'Flowchart View' : 'Table View'} 
        />
      );
    }
  }

  // Other perspectives - placeholder for future implementation
  if (['experiences', 'frameworks', 'systems'].includes(activePerspective)) {
    return (
      <PlaceholderView 
        title={activePerspective.charAt(0).toUpperCase() + activePerspective.slice(1)} 
      />
    );
  }

  return null;
};

export default GardenContent;
