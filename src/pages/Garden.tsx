import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft, Sprout, Link2, ExternalLink, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealText from '../components/ui/RevealText';
import BlurEffect from '../components/ui/BlurEffect';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../components/ui/button';
import { GardenNote, getNotes, getConnections, seedInitialData } from '../lib/garden/api';
import GraphView from '../components/garden/GraphView';
import { toast } from 'sonner';

const getStageIcon = (stage: string) => {
  switch(stage) {
    case "seedling":
      return <Sprout size={16} className="text-green-400" />;
    case "growing":
      return <Sprout size={16} className="text-green-500" />;
    case "evergreen":
      return <Sprout size={16} className="text-green-600" />;
    default:
      return <Sprout size={16} />;
  }
};

const NoteDialog = ({ note }: { note: GardenNote }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center text-sm text-primary hover:underline group">
          Read more
          <ExternalLink size={14} className="ml-1" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-semibold">{note.title}</DialogTitle>
        </DialogHeader>
        <div className="mb-3 flex items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            {getStageIcon(note.stage)}
            <span className="ml-1 capitalize">{note.stage}</span>
          </div>
          <span className="mx-2">•</span>
          <time dateTime={note.lastUpdated}>Updated: {new Date(note.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
        
        <div className="mt-4 space-y-4">
          <p className="text-muted-foreground">
            {note.bookInfo ? (
              <>
                {note.fullContent.split(note.bookInfo.title)[0]}
                <a 
                  href={note.bookInfo.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {note.bookInfo.title}
                </a>
                {note.fullContent.split(note.bookInfo.title)[1]}
              </>
            ) : (
              note.fullContent
            )}
          </p>
          
          {note.connections && note.connections.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              <span className="text-xs text-muted-foreground mr-2">Connected ideas:</span>
              {note.connections.map((tag) => (
                <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs">
                  <Link2 size={10} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
            <div className="glass p-4 border-l-4 border-green-500 w-full sm:w-auto">
              <h3 className="font-serif text-sm font-semibold mb-1">How to navigate this garden:</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex items-center">
                  <Sprout size={12} className="text-green-400 mr-2 flex-shrink-0" /> 
                  <span><strong>Seedlings</strong>: Early-stage ideas, still taking shape</span>
                </li>
                <li className="flex items-center">
                  <Sprout size={12} className="text-green-500 mr-2 flex-shrink-0" /> 
                  <span><strong>Growing</strong>: Developing thoughts with some substance</span>
                </li>
                <li className="flex items-center">
                  <Sprout size={12} className="text-green-600 mr-2 flex-shrink-0" /> 
                  <span><strong>Evergreen</strong>: Well-developed, mature ideas</span>
                </li>
              </ul>
            </div>
            
            <div className="flex space-x-2 w-full sm:w-auto">
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('list')}
                className="flex items-center flex-1 sm:flex-initial justify-center"
              >
                <Sprout size={16} className="mr-2" />
                List View
              </Button>
              <Button 
                variant={viewMode === 'graph' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('graph')}
                className="flex items-center flex-1 sm:flex-initial justify-center"
              >
                <Network size={16} className="mr-2" />
                Graph View
              </Button>
            </div>
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
              {viewMode === 'list' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {notes.map((note, index) => (
                    <BlurEffect key={note.id} className={`animation-delay-${(index + 1) * 100}`}>
                      <article className="glass p-6 h-full transition-transform hover:-translate-y-1">
                        <div className="mb-3 flex items-center text-xs text-muted-foreground">
                          <div className="flex items-center">
                            {getStageIcon(note.stage)}
                            <span className="ml-1 capitalize">{note.stage}</span>
                          </div>
                          <span className="mx-2">•</span>
                          <time dateTime={note.lastUpdated}>Updated: {new Date(note.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                        </div>
                        
                        <h2 className="font-serif text-xl font-semibold mb-3">
                          {note.title}
                        </h2>
                        
                        <p className="text-muted-foreground mb-4">
                          {note.bookInfo ? (
                            <>
                              {note.summary.split(note.bookInfo.title)[0]}
                              <a 
                                href={note.bookInfo.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {note.bookInfo.title}
                              </a>
                              {note.summary.split(note.bookInfo.title)[1]}
                            </>
                          ) : (
                            note.summary
                          )}
                        </p>
                        
                        <div className="flex flex-col space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {note.connections && note.connections.map((tag) => (
                              <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs">
                                <Link2 size={10} className="mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <NoteDialog note={note} />
                        </div>
                      </article>
                    </BlurEffect>
                  ))}
                </div>
              )}
              
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
