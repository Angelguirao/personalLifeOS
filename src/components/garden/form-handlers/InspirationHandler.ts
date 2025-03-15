
import { SourceType } from '@/lib/garden/types';
import { 
  getModelInspirations,
  createInspiration,
  deleteInspiration
} from '@/lib/garden/api';

export const handleBookInspiration = async (
  modelId: string,
  bookInfo?: {
    title: string;
    author?: string;
    link?: string;
  }
) => {
  if (!modelId || !bookInfo?.title) return;
  
  try {
    // Get existing inspirations for this model
    const existingInspirations = await getModelInspirations(modelId);
    
    // Create or update book inspiration
    const bookInspiration = {
      sourceType: 'book' as SourceType,
      sourceName: bookInfo.title,
      authorName: bookInfo.author || '',
      link: bookInfo.link || '',
      mentalModelId: modelId
    };
    
    // Check if we already have a book inspiration for this model
    const existingBookInspiration = existingInspirations.find(
      insp => insp.sourceType === 'book'
    );
    
    if (existingBookInspiration) {
      // Delete old inspiration if book title changed
      if (existingBookInspiration.sourceName !== bookInfo.title) {
        await deleteInspiration(existingBookInspiration.id.toString());
        await createInspiration(bookInspiration);
      }
      // If only other fields changed, update would go here
    } else {
      // Create new inspiration
      await createInspiration(bookInspiration);
    }
  } catch (error) {
    console.error('Error saving book inspiration:', error);
    // Continue even if inspiration saving fails
  }
};
