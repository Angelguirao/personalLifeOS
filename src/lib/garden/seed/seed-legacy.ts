
// This file is kept for backward compatibility but no longer seeds legacy data
import { toast } from 'sonner';
import { seedConnections } from './seed-connections';

export const seedLegacyData = async () => {
  console.log('Legacy tables are deprecated. Seeding only new tables.');
  toast.info('Digital Garden now uses enhanced mental models.');
  
  // We'll still seed connections for the enhanced models
  await seedConnections();
};
