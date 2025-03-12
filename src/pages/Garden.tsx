
import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealText from '../components/ui/RevealText';
import { useQuery } from '@tanstack/react-query';
import { GardenNote, getNotes, getConnections, seedInitialData } from '../lib/garden/api';
import GraphView from '../components/garden/GraphView';
import ListView from '../components/garden/ListView';
import GardenGuide from '../components/garden/GardenGuide';
import ViewModeSelector from '../components/garden/ViewModeSelector';
import { toast } from 'sonner';

const Garden = () => {
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');
  
  // Seed initial data when component mounts
  useEffect(() => {
    const seedData = async () => {
      try {
        await seedInitialData();
      } catch (error) {
        console.error('Error seeding initial data:', error);
        toast.error('Error setting up the garden. Using local data.');
      }
    };
    
    seedData();
  }, []);
  
  const { 
    data: notes = [], 
    isLoading: notesLoading, 
    error: notesError 
  } = useQuery({
    queryKey: ['garden-notes'],
    queryFn: getNotes
  });
  
  const { 
    data: connections = [], 
    isLoading: connectionsLoading, 
    error: connectionsError 
  } = useQuery({
    queryKey: ['garden-connections'],
    queryFn: getConnections
  });
  
  const isLoading = notesLoading || connectionsLoading;
  const hasError = notesError || connectionsError;

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
            <GardenGuide />
            <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
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
              <p className="text-red-500 mb-2">Failed to load garden notes</p>
              <p className="text-muted-foreground text-sm">Please try again later</p>
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
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Garden;
