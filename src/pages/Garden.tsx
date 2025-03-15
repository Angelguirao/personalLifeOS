
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ViewModeSelector, { DSRPPerspective, ViewMode } from '@/components/garden/ViewModeSelector';
import ModelFormDialog from '@/components/garden/ModelFormDialog';
import GardenHeader from '@/components/garden/GardenHeader';
import SystemFormDialog from '@/components/garden/SystemFormDialog';
import { createQuestion, getQuestions } from '@/lib/garden/api';
import { Question } from '@/lib/garden/types';
import { toast } from 'sonner';
import GardenPerspective from '@/components/garden/GardenPerspective';
import DistinctionTypeDialog from '@/components/garden/DistinctionTypeDialog';
import { useGardenData } from '@/hooks/useGardenData';
import { useDistinctionDialogs } from '@/hooks/useDistinctionDialogs';

const Garden = () => {
  // State for DSRP perspective and view mode
  const [activePerspective, setActivePerspective] = useState<DSRPPerspective>('distinctions');
  const [activeView, setActiveView] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  
  // Custom hooks
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

  const {
    isCreateModelDialogOpen,
    setIsCreateModelDialogOpen,
    isCreateSystemDialogOpen,
    setIsCreateSystemDialogOpen,
    isCreateQuestionDialogOpen, 
    setIsCreateQuestionDialogOpen,
    isDistinctionTypeDialogOpen,
    setIsDistinctionTypeDialogOpen,
    handleDistinctionTypeSelect,
    handleCreateDistinction
  } = useDistinctionDialogs();

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
            
            {/* Garden Content with Action Bar */}
            <GardenPerspective
              activePerspective={activePerspective}
              activeView={activeView}
              models={models}
              filteredModels={filteredModels}
              connections={connections}
              questions={questions}
              systems={systems}
              selectedModel={selectedModel}
              selectedSystem={selectedSystem}
              isLoading={isLoading}
              isAuthenticated={isAuthenticated}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onCreateDistinction={handleCreateDistinction}
              onCreateSystem={() => setIsCreateSystemDialogOpen(true)}
              onCreateQuestion={handleCreateQuestion}
              handleModelSelect={handleModelSelect}
              handleSystemSelect={handleSystemSelect}
              fetchData={fetchData}
            />
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Dialogs */}
      <ModelFormDialog
        isOpen={isCreateModelDialogOpen}
        onOpenChange={setIsCreateModelDialogOpen}
        onSuccess={fetchData}
      />
      
      <SystemFormDialog
        isOpen={isCreateSystemDialogOpen}
        onOpenChange={setIsCreateSystemDialogOpen}
        onSuccess={fetchData}
      />

      {/* Distinction Type Selection Dialog */}
      <DistinctionTypeDialog 
        isOpen={isDistinctionTypeDialogOpen}
        onOpenChange={setIsDistinctionTypeDialogOpen}
        onTypeSelect={handleDistinctionTypeSelect}
      />
    </>
  );
};

export default Garden;
