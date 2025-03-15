
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getMentalModels, getConnections, getSystems } from '@/lib/garden/api';
import { MentalModel, Connection, System } from '@/lib/garden/types';
import { useSupabase } from '@/lib/supabase/SupabaseProvider';
import { useSupabaseSetup } from './useSupabaseSetup';

export function useGardenData() {
  const [models, setModels] = useState<MentalModel[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [systems, setSystems] = useState<System[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState<MentalModel | undefined>(undefined);
  const [selectedSystem, setSelectedSystem] = useState<System | undefined>(undefined);
  
  // Use our new Supabase hooks
  const { isAuthenticated } = useSupabase();
  const { checkTablesExist } = useSupabaseSetup();

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

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
    
    // Check database tables on load if authenticated
    if (isAuthenticated) {
      checkTablesExist();
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
    handleModelSelect,
    handleSystemSelect,
  };
}
