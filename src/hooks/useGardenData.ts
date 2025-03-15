
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getMentalModels, getConnections, seedInitialData, getSystems } from '@/lib/garden/api';
import { MentalModel, Connection, System } from '@/lib/garden/types';
import supabase from '@/lib/garden/client';

export function useGardenData() {
  const [models, setModels] = useState<MentalModel[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [systems, setSystems] = useState<System[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState<MentalModel | undefined>(undefined);
  const [selectedSystem, setSelectedSystem] = useState<System | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      console.log('Fetching mental models, connections, and systems...');
      
      // Fetch mental models
      const mentalModelsData = await getMentalModels();
      console.log('Mental models fetched:', mentalModelsData);
      setModels(mentalModelsData);
      setSelectedModel(undefined);
      
      // Fetch connections
      const connectionsData = await getConnections();
      console.log('Connections fetched:', connectionsData);
      setConnections(connectionsData);
      
      // Fetch systems
      const systemsData = await getSystems();
      console.log('Systems fetched:', systemsData);
      setSystems(systemsData);
      setSelectedSystem(undefined);
      
    } catch (error) {
      console.error('Error fetching garden data:', error);
      toast.error('Failed to load garden data.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle model selection
  const handleModelSelect = (model: MentalModel) => {
    setSelectedModel(model);
    setSelectedSystem(undefined); // Clear system selection when model is selected
  };
  
  // Handle system selection
  const handleSystemSelect = (system: System) => {
    setSelectedSystem(system);
    setSelectedModel(undefined); // Clear model selection when system is selected
  };

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!supabase) return;
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuthStatus();
    
    // Subscribe to auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session);
      });
      
      return () => subscription.unsubscribe();
    }
  }, []);

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
    
    // Check database connection on load
    if (isAuthenticated) {
      checkDatabase();
    }
  }, [isAuthenticated]);

  return {
    models,
    connections,
    systems,
    isLoading,
    selectedModel,
    selectedSystem,
    isAuthenticated,
    fetchData,
    checkDatabase,
    handleModelSelect,
    handleSystemSelect,
  };
}
