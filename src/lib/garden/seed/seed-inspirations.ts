
import supabase from '../client';
import { inspirations } from '../data';
import { toast } from 'sonner';

export const seedInspirations = async () => {
  // Check if the inspirations table has data
  const { count, error: countError } = await supabase
    .from('inspirations')
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error('Error checking inspirations data:', countError);
    return false;
  }
  
  // If we already have data, no need to seed
  if (count && count > 0) {
    console.log('Inspirations table already contains data. Skipping seed operation.');
    return true;
  }
  
  // Format the inspirations data for Supabase (using snake_case for column names)
  const inspirationsData = inspirations.map(inspiration => ({
    id: inspiration.id,
    source_type: inspiration.sourceType,
    source_name: inspiration.sourceName,
    author_name: inspiration.authorName, // Use snake_case for Supabase
    link: inspiration.link,
    quote: inspiration.quote
  }));
  
  // Insert inspirations
  const { error } = await supabase
    .from('inspirations')
    .insert(inspirationsData);
  
  if (error) {
    console.error('Error seeding inspirations:', error);
    toast.error('Error seeding inspirations to database');
    return false;
  }
  
  console.log('Inspirations seeded successfully');
  return true;
};
