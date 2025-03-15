
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ViewModeSelector, { DSRPPerspective, ViewMode } from '@/components/garden/ViewModeSelector';
import ModelFormDialog from '@/components/garden/ModelFormDialog';
import GardenHeader from '@/components/garden/GardenHeader';
import { useGardenData } from '@/hooks/useGardenData';
import { createQuestion, getQuestions } from '@/lib/garden/api';
import { Question } from '@/lib/garden/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import GardenActionBar from '@/components/garden/GardenActionBar';
import GardenContent from '@/components/garden/GardenContent';
import SystemsView from '@/components/garden/SystemsView';
import SystemFormDialog from '@/components/garden/SystemFormDialog';

const Garden = () => {
  // State for DSRP perspective and view mode
  const [activePerspective, setActivePerspective] = useState<DSRPPerspective>('distinctions');
  const [activeView, setActiveView] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreateSystemDialogOpen, setIsCreateSystemDialogOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  const {
    models,
    connections,
    systems,
    isLoading,
    selectedModel,
    selectedSystem,
    isAuthenticated,
    fetchData,
    handleModelSelect,
    handleSystemSelect,
  } = useGardenData();

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      const questionsData = await getQuestions();
      console.log('Questions fetched:', questionsData);
      setQuestions(questionsData);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to load questions');
    }
  };

  // Handle creating a new question
  const handleCreateQuestion = async (questionData: Omit<Question, 'id'>) => {
    try {
      const newQuestion = await createQuestion(questionData);
      setQuestions(prev => [...prev, newQuestion]);
      toast.success('Question created successfully');
    } catch (error) {
      console.error('Error creating question:', error);
      toast.error('Failed to create question');
      throw error;
    }
  };

  // Handle perspective change
  const handlePerspectiveChange = (perspective: DSRPPerspective) => {
    setActivePerspective(perspective);
    
    // Set appropriate default view for each perspective
    if (perspective === 'distinctions') {
      setActiveView('list');
    } else if (perspective === 'systems') {
      setActiveView('list');
    } else if (perspective === 'relationships') {
      setActiveView('graph');
    } else if (perspective === 'perspectives') {
      setActiveView('list');
    }
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

  // Filter systems based on search query
  const filteredSystems = searchQuery.trim() === ''
    ? systems
    : systems.filter(system =>
        system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (system.description && system.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (system.category && system.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  // Fetch questions when component mounts or auth status changes
  useEffect(() => {
    fetchQuestions();
  }, [isAuthenticated]);

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container-narrow">
          <GardenHeader />
          
          <div className="flex flex-col space-y-8">
            {/* Perspective and View Selection */}
            <div className="border-b pb-6">
              <ViewModeSelector 
                activePerspective={activePerspective}
                activeView={activeView} 
                onPerspectiveChange={handlePerspectiveChange}
                onViewChange={setActiveView} 
              />
            </div>
            
            {/* Action Area: Search and Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <GardenActionBar 
                activePerspective={activePerspective}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onRefresh={fetchData}
              />
              
              {/* System-specific actions */}
              {activePerspective === 'systems' && isAuthenticated && (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => setIsCreateSystemDialogOpen(true)}
                  >
                    New System
                  </Button>
                </div>
              )}
            </div>
            
            {/* Content Area */}
            <div className="mt-6">
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
                  onCreateModel={() => setIsCreateDialogOpen(true)}
                  handleModelSelect={handleModelSelect}
                  onCreateQuestion={handleCreateQuestion}
                  fetchData={fetchData}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Dialogs */}
      <ModelFormDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={fetchData}
      />
      
      <SystemFormDialog
        isOpen={isCreateSystemDialogOpen}
        onOpenChange={setIsCreateSystemDialogOpen}
        onSuccess={fetchData}
      />
    </>
  );
};

export default Garden;
