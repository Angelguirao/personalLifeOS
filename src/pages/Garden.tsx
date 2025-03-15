
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ViewModeSelector, { DSRPPerspective, ViewMode, DistinctionType } from '@/components/garden/ViewModeSelector';
import ModelFormDialog from '@/components/garden/ModelFormDialog';
import GardenHeader from '@/components/garden/GardenHeader';
import { useGardenData } from '@/hooks/useGardenData';
import { createQuestion, getQuestions } from '@/lib/garden/api';
import { Question } from '@/lib/garden/types';
import { toast } from 'sonner';
import GardenActionBar from '@/components/garden/GardenActionBar';
import GardenContent from '@/components/garden/GardenContent';
import SystemsView from '@/components/garden/SystemsView';
import SystemFormDialog from '@/components/garden/SystemFormDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Brain, MessageCircleQuestion, Sparkle } from 'lucide-react';

const Garden = () => {
  // State for DSRP perspective and view mode
  const [activePerspective, setActivePerspective] = useState<DSRPPerspective>('distinctions');
  const [activeView, setActiveView] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModelDialogOpen, setIsCreateModelDialogOpen] = useState(false);
  const [isCreateSystemDialogOpen, setIsCreateSystemDialogOpen] = useState(false);
  const [isCreateQuestionDialogOpen, setIsCreateQuestionDialogOpen] = useState(false);
  const [isDistinctionTypeDialogOpen, setIsDistinctionTypeDialogOpen] = useState(false);
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

  // Handle distinction type selection
  const handleDistinctionTypeSelect = (type: DistinctionType) => {
    setIsDistinctionTypeDialogOpen(false);
    
    if (type === 'mentalModel') {
      setIsCreateModelDialogOpen(true);
    } else if (type === 'question') {
      setIsCreateQuestionDialogOpen(true);
    } else if (type === 'experience') {
      // Future implementation for experiences
      toast.info('Experience creation coming soon!');
    }
  };

  // Open the distinction type selection dialog
  const handleCreateDistinction = () => {
    setIsDistinctionTypeDialogOpen(true);
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
                onCreateDistinction={handleCreateDistinction}
                isAuthenticated={isAuthenticated}
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
                  onCreateDistinction={handleCreateDistinction}
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
      <Dialog open={isDistinctionTypeDialogOpen} onOpenChange={setIsDistinctionTypeDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Distinction</DialogTitle>
            <DialogDescription>
              Choose what kind of distinction you want to create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center p-6 h-auto space-y-2 hover:bg-muted transition-colors"
              onClick={() => handleDistinctionTypeSelect('mentalModel')}
            >
              <Brain className="h-12 w-12 text-primary" />
              <span className="font-medium">Mental Model</span>
              <span className="text-xs text-muted-foreground text-center">
                Frameworks and concepts for understanding the world
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center p-6 h-auto space-y-2 hover:bg-muted transition-colors"
              onClick={() => handleDistinctionTypeSelect('question')}
            >
              <MessageCircleQuestion className="h-12 w-12 text-indigo-600" />
              <span className="font-medium">Question</span>
              <span className="text-xs text-muted-foreground text-center">
                Inquiries that explore ideas and concepts
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center p-6 h-auto space-y-2 hover:bg-muted transition-colors"
              onClick={() => handleDistinctionTypeSelect('experience')}
            >
              <Sparkle className="h-12 w-12 text-amber-500" />
              <span className="font-medium">Experience</span>
              <span className="text-xs text-muted-foreground text-center">
                Personal insights and learning moments
              </span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Garden;
