
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ListView from '@/components/garden/ListView';
import GraphView from '@/components/garden/GraphView';
import GardenGuide from '@/components/garden/GardenGuide';
import ViewModeSelector from '@/components/garden/ViewModeSelector';
import { toast } from 'sonner';
import { getMentalModels, getConnections, seedInitialData } from '@/lib/garden/api';
import { MentalModel, Connection } from '@/lib/garden/types';
import { DataModelAdapter } from '@/lib/garden/adapters';
import ConnectionsDebugTool from '@/components/garden/ConnectionsDebugTool';

// Views available in the garden
type ViewMode = 'list' | 'graph' | 'table' | 'qa' | 'flowchart';

const Garden = () => {
  const [models, setModels] = useState<MentalModel[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<ViewMode>('list');
  const [showDebug, setShowDebug] = useState(false);

  // Function to seed data
  const seedData = async () => {
    try {
      toast.info('Initializing garden data...', { duration: 2000 });
      await seedInitialData();
      await fetchData();
      toast.success('Garden data loaded successfully.');
    } catch (error) {
      console.error('Error seeding data:', error);
      toast.error('Failed to initialize garden data.');
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching mental models and connections...');
      
      // Fetch mental models
      const mentalModelsData = await getMentalModels();
      console.log('Mental models fetched:', mentalModelsData);
      setModels(mentalModelsData);
      
      // Fetch connections
      const connectionsData = await getConnections();
      console.log('Connections fetched:', connectionsData);
      setConnections(connectionsData);
      
    } catch (error) {
      console.error('Error fetching garden data:', error);
      toast.error('Failed to load garden data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
    
    // For development - uncomment to seed data on load
    // seedData();
  }, []);

  // Convert to garden notes for legacy components
  const gardenNotes = DataModelAdapter.modelsToNotes(models);

  // Check if we have valid connections
  useEffect(() => {
    if (connections.length > 0 && gardenNotes.length > 0) {
      console.log(`Ready to display graph with ${connections.length} connections and ${gardenNotes.length} nodes`);
    }
  }, [connections, gardenNotes]);

  return (
    <>
      <Navbar />
      <main className="container py-12 min-h-screen">
        <div className="mb-6 space-y-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold">Digital Garden</h1>
          <p className="max-w-2xl text-muted-foreground">
            A space for growing and cultivating ideas. These notes connect with one another to form a network of related concepts.
          </p>
          
          <GardenGuide />
        </div>
        
        <Tabs defaultValue="explore" className="mb-8">
          <TabsList>
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="about">About The Garden</TabsTrigger>
            <TabsTrigger value="debug" onClick={() => setShowDebug(!showDebug)}>Debug</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore">
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
              </div>
            ) : (
              <div className="space-y-6">
                <ViewModeSelector activeView={activeView} onViewChange={setActiveView} />
                
                {showDebug && (
                  <ConnectionsDebugTool connections={connections} />
                )}
                
                {activeView === 'list' && (
                  <ListView notes={models} />
                )}
                
                {activeView === 'graph' && connections.length > 0 && gardenNotes.length > 0 ? (
                  <div className="h-[600px] rounded-xl border shadow-sm overflow-hidden">
                    <GraphView 
                      nodes={gardenNotes}
                      connections={connections} 
                      models={models}
                    />
                  </div>
                ) : activeView === 'graph' && (
                  <div className="h-[600px] rounded-xl border shadow-sm overflow-hidden flex items-center justify-center">
                    <div className="text-center p-6 max-w-md">
                      <h3 className="text-lg font-medium mb-2">No Graph Data Available</h3>
                      <p className="text-muted-foreground">
                        {connections.length === 0 ? 
                          "There are no connections between notes to display in the graph." : 
                          "There was a problem with the graph data."}
                      </p>
                      <button 
                        onClick={fetchData}
                        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
                      >
                        Refresh Data
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Additional views (table, Q&A, flowchart) will be added here */}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="about">
            <div className="prose max-w-2xl mx-auto">
              <h2>What is a Digital Garden?</h2>
              <p>
                A digital garden is a different approach to content management. Unlike traditional blogs 
                which are chronological and primarily for consumption, a garden is designed for exploration, 
                connection, and growth.
              </p>
              
              <h3>Principles of the Garden</h3>
              <ul>
                <li><strong>Non-linear exploration</strong> - Follow connections rather than time</li>
                <li><strong>Growth stages</strong> - Ideas evolve from seedlings to mature thoughts</li>
                <li><strong>Interconnection</strong> - Everything is connected in a web of relations</li>
                <li><strong>Cultivated, not produced</strong> - Ideas need tending, not just publishing</li>
              </ul>
              
              <h3>How to Use This Garden</h3>
              <p>
                Feel free to explore using different views. The graph view shows connections visually, 
                while the list view provides an easy-to-scan index. Notes range from rough seedlings 
                to well-developed evergreen thoughts.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="debug">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Garden Debug Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Mental Models</h3>
                  <p className="text-sm mb-2">Count: {models.length}</p>
                  <button 
                    onClick={fetchData}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                  >
                    Refresh Data
                  </button>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Connections</h3>
                  <p className="text-sm mb-2">Count: {connections.length}</p>
                  <ConnectionsDebugTool connections={connections} />
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Actions</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={seedData}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm"
                  >
                    Seed Initial Data
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
};

export default Garden;
