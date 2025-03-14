
import supabase from '../client';
import { mentalModels } from '../data';
import { tableExists } from '../utils/table-utils';
import { transformMentalModelToSupabase } from '../utils/model-transforms';
import { toast } from 'sonner';

export const seedMentalModels = async () => {
  if (supabase === null) {
    console.log('Supabase client not initialized, cannot seed mental models');
    return false;
  }
  
  try {
    // Check if the mental_models table has data
    const { count, error: countError } = await supabase
      .from('mental_models')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error checking mental_models data:', countError);
      return false;
    }
    
    // If we already have data, no need to seed
    if (count && count > 0) {
      console.log('Mental models table already contains data. Skipping seed operation.');
      return true;
    }
    
    console.log('Mental models table is empty. Seeding with initial data...');
    
    // Transform mental models to Supabase format and ensure IDs are included
    const modelsData = mentalModels.map(model => transformMentalModelToSupabase({
      ...model,
      id: model.id  // Explicitly include the ID
    }));
    
    // Insert mental models in batches to avoid request size limits
    const batchSize = 5;
    for (let i = 0; i < modelsData.length; i += batchSize) {
      const batch = modelsData.slice(i, i + batchSize);
      const { error } = await supabase
        .from('mental_models')
        .insert(batch);
      
      if (error) {
        console.error(`Error seeding mental models batch ${i}:`, error);
        toast.error('Error seeding mental models to database');
        return false;
      }
    }
    
    console.log('Mental models seeded successfully');
    return true;
  } catch (error) {
    console.error('Unexpected error seeding mental models:', error);
    toast.error('Error seeding mental models to database');
    return false;
  }
};
