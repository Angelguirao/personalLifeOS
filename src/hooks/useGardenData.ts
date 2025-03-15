
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getMentalModels, getConnections, seedInitialData } from '@/lib/garden/api';
import { MentalModel, Connection } from '@/lib/garden/types';

export function useGardenData() {
  const [models, setModels] = useState<MentalModel[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState<MentalModel | undefined>(undefined);

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

  // Handle model selection
  const handleModelSelect = (model: MentalModel) => {
    setSelectedModel(model);
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
    
    // Check database connection on load
    checkDatabase();
  }, []);

  return {
    models,
    connections,
    isLoading,
    selectedModel,
    fetchData,
    checkDatabase,
    handleModelSelect,
  };
}
