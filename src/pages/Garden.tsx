
import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealText from '../components/ui/RevealText';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  getNotes, 
  getConnections, 
  seedInitialData, 
  getMentalModels 
} from '../lib/garden/api';
import GraphView from '../components/garden/GraphView';
import ListView from '../components/garden/ListView';
import GardenGuide from '../components/garden/GardenGuide';
import ViewModeSelector, { ViewMode } from '../components/garden/ViewModeSelector';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';

const Garden = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [seedingComplete, setSeedingComplete] = useState(false);
  const [seedingError, setSeedingError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  // Function to seed data and refresh queries
  const seedData = async () => {
    try {
      toast.info('Setting up the garden...');
      setSeedingError(null);
      await seedInitialData();
      setSeedingComplete(true);
      
      // Invalidate queries to force a refresh of data
      await queryClient.invalidateQueries({ queryKey: ['garden-notes'] });
      await queryClient.invalidateQueries({ queryKey: ['garden-connections'] });
      await queryClient.invalidateQueries({ queryKey: ['mental-models'] });
      
      toast.success('Garden data refreshed successfully!');
    } catch (error) {
      console.error('Error seeding initial data:', error);
      
      // Show more detailed error for debugging
      if (error instanceof Error) {
        const errorMessage = `Error setting up the garden: ${error.message}`;
        setSeedingError(errorMessage);
        toast.error(errorMessage);
      } else {
        setSeedingError('Unknown error setting up the garden');
        toast.error('Error setting up the garden.');
      }
      
      // Mark seeding as complete even if it failed, so queries can run
      setSeedingComplete(true);
    }
  };
  
  // Seed initial data when component mounts
  useEffect(() => {
    seedData();
  }, []);
  
  // Get mental models and convert them to notes for backward compatibility
  const { 
    data: notes = [], 
    isLoading: notesLoading, 
    error: notesError 
  } = useQuery({
    queryKey: ['garden-notes'],
    queryFn: getNotes,
    enabled: seedingComplete, // Only fetch once seeding is complete
    staleTime: 0, // Don't cache the data, always fetch fresh
    retry: 1, // Only retry once to avoid excessive error messages
  });
  
  const { 
    data: connections = [], 
    isLoading: connectionsLoading, 
    error: connectionsError 
  } = useQuery({
    queryKey: ['garden-connections'],
    queryFn: getConnections,
    enabled: seedingComplete, // Only fetch once seeding is complete
    staleTime: 0, // Don't cache the data, always fetch fresh
    retry: 1, // Only retry once to avoid excessive error messages
  });
  
  const isLoading = notesLoading || connectionsLoading || !seedingComplete;
  const hasError = notesError || connectionsError;

  // Handler function to update the view mode
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  // Function to manually refresh data
  const handleRefreshData = () => {
    seedData();
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 px-4 sm:px-6">
        <div className="container-narrow">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft size={16} className="mr-1" />
            Back to home
          </Link>
          
          <div className="space-y-4 mb-8">
            <h1 className="heading-lg">
              <RevealText>Digital Garden</RevealText>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Unlike traditional blogs or essays, a digital garden embraces the messiness of thinking in public. 
              Ideas connect in unexpected ways, creating a rich network of concepts that evolve over time.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <GardenGuide />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefreshData}
                className="flex items-center gap-1"
              >
                <RefreshCcw size={14} />
                Refresh Data
              </Button>
            </div>
            <ViewModeSelector viewMode={viewMode} setViewMode={handleViewModeChange} />
          </div>
          
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Loading garden notes...</p>
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              </div>
            </div>
          )}
          
          {hasError && (
            <div className="glass p-8 text-center">
              <p className="text-red-500 mb-2">Failed to load garden data</p>
              <p className="text-muted-foreground text-sm">Please try refreshing the data</p>
              {seedingError && (
                <div className="mt-4 p-4 bg-red-50 text-red-800 rounded text-sm font-mono whitespace-pre-wrap">
                  {seedingError}
                </div>
              )}
            </div>
          )}
          
          {!isLoading && !hasError && (
            <>
              {viewMode === 'list' && <ListView notes={notes} />}
              
              {viewMode === 'graph' && (
                <div className="glass p-4 rounded-md h-[80vh] md:h-[85vh] lg:h-[90vh] w-full">
                  <GraphView nodes={notes} connections={connections} />
                </div>
              )}
              
              {viewMode === 'table' && (
                <div className="glass p-8 rounded-md">
                  <p className="text-center text-muted-foreground">Table view coming soon</p>
                </div>
              )}
              
              {viewMode === 'qa' && (
                <div className="glass p-8 rounded-md">
                  <p className="text-center text-muted-foreground">Q&A view coming soon</p>
                </div>
              )}
              
              {viewMode === 'flowchart' && (
                <div className="glass p-8 rounded-md">
                  <p className="text-center text-muted-foreground">Flowchart view coming soon</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Garden;
