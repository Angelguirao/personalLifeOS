
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ListView from '@/components/garden/ListView';
import GraphView from '@/components/garden/GraphView';
import ViewModeSelector from '@/components/garden/ViewModeSelector';
import { toast } from 'sonner';
import { getMentalModels, getConnections, seedInitialData } from '@/lib/garden/api';
import { MentalModel, Connection } from '@/lib/garden/types';
import { DataModelAdapter } from '@/lib/garden/adapters';
import RevealText from '@/components/ui/RevealText';
import BlurEffect from '@/components/ui/BlurEffect';

// Views available in the garden
type ViewMode = 'list' | 'graph' | 'table' | 'qa' | 'flowchart';

const Garden = () => {
  const [models, setModels] = useState<MentalModel[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<ViewMode>('list');

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
      <main className="pt-28 pb-16 min-h-screen">
        <div className="container-wide px-4 sm:px-6">
          <div className="space-y-4 mb-16 relative">
            <h1 className="heading-lg">
              <RevealText>Digital Garden</RevealText>
            </h1>
            <BlurEffect className="animation-delay-200">
              <p className="body-lg text-muted-foreground max-w-2xl">
                A space for growing and cultivating ideas. These notes connect with one another to form a network of related concepts.
              </p>
            </BlurEffect>
          </div>
          
          <div className="space-y-6">
            <ViewModeSelector activeView={activeView} onViewChange={setActiveView} />
            
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Garden;
