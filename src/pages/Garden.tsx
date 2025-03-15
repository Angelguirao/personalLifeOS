
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
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Database } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ModelManagement from '@/components/garden/ModelManagement';
import { Button } from '@/components/ui/button';
import ModelFormDialog from '@/components/garden/ModelFormDialog';

// Views available in the garden
type ViewMode = 'list' | 'graph' | 'table' | 'qa' | 'flowchart';

const Garden = () => {
  const [models, setModels] = useState<MentalModel[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<MentalModel | undefined>(undefined);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Function to check database connection
  const checkDatabase = async () => {
    try {
      toast.info('Checking database connection...', { duration: 2000 });
      await seedInitialData();
      toast.success('Database connection verified.');
    } catch (error) {
      console.error('Error connecting to database:', error);
      toast.error('Failed to connect to database.');
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
      setSelectedModel(undefined);
      
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
    
    // Check database connection on load
    checkDatabase();
  }, []);

  // Convert to garden notes for legacy components
  const gardenNotes = DataModelAdapter.modelsToNotes(models);

  // Handle model selection
  const handleModelSelect = (model: MentalModel) => {
    setSelectedModel(model);
  };

  // Filter models based on search query
  const filteredModels = searchQuery.trim() === '' 
    ? models 
    : models.filter(model => 
        model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (model.subtitle && model.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        model.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (model.tags && model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container-narrow">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-1.5" />
            Back to home
          </Link>
          
          <div className="space-y-4 mb-8 relative">
            <h1 className="heading-lg">
              <RevealText>Digital Garden</RevealText>
            </h1>
            <BlurEffect className="animation-delay-200">
              <p className="body-lg text-muted-foreground max-w-2xl">
                A space for growing and cultivating ideas. These notes connect with one another to form a network of related concepts.
              </p>
            </BlurEffect>
          </div>
          
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <ViewModeSelector activeView={activeView} onViewChange={setActiveView} />
              
              <div className="flex space-x-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search mental models..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <ModelManagement onRefresh={fetchData} />
              <Button variant="outline" size="sm" onClick={checkDatabase} className="flex items-center gap-2">
                <Database size={16} />
                <span>Check Database</span>
              </Button>
            </div>
            
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
              </div>
            ) : models.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center border rounded-lg p-8 bg-muted/30">
                <h3 className="text-lg font-medium mb-2">No Mental Models Found</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Your digital garden is empty. Start by creating your first mental model.
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  Create Your First Mental Model
                </Button>
              </div>
            ) : (
              <>
                {activeView === 'list' && (
                  <ListView 
                    notes={filteredModels} 
                    onSelectModel={handleModelSelect}
                    selectedModelId={selectedModel?.id}
                    onRefresh={fetchData}
                  />
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
                      <Button 
                        onClick={fetchData}
                        className="mt-4"
                      >
                        Refresh Data
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Create Dialog - Added at the root level */}
      <ModelFormDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={fetchData}
      />
    </>
  );
};

export default Garden;
