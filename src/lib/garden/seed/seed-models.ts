
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
    // Check if the mental_models table exists
    const tableExistsResult = await tableExists('mental_models');
    if (!tableExistsResult) {
      console.error('Mental models table does not exist');
      toast.error('Mental models table does not exist');
      return false;
    }

    // Delete existing mental models data
    console.log('Deleting existing mental models data...');
    const { error: deleteError } = await supabase
      .from('mental_models')
      .delete()
      .not('id', 'is', null); // Safety check to ensure we don't delete with empty condition
    
    if (deleteError) {
      console.error('Error deleting existing mental models:', deleteError);
      toast.error('Error deleting existing mental models');
      return false;
    }
    
    console.log('Existing mental models deleted successfully');
    
    // Transform mental models to Supabase format and ensure IDs are included
    const modelsData = mentalModels.map(model => transformMentalModelToSupabase({
      ...model,
      id: model.id  // Explicitly include the ID
    }));
    
    console.log(`Seeding ${modelsData.length} mental models...`);
    
    // Insert mental models in batches to avoid request size limits
    const batchSize = 5;
    for (let i = 0; i < modelsData.length; i += batchSize) {
      const batch = modelsData.slice(i, i + batchSize);
      console.log(`Inserting batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(modelsData.length/batchSize)}`);
      
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
    toast.success('Mental models seeded successfully to database');
    return true;
  } catch (error) {
    console.error('Unexpected error seeding mental models:', error);
    toast.error('Error seeding mental models to database');
    return false;
  }
};
