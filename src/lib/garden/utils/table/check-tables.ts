
import { tableExists } from './table-exists';

// Check if all required tables exist
export const checkGardenTablesExist = async (): Promise<boolean> => {
  try {
    // Check essential tables across schemas
    const distinctionsTableExists = await tableExists('distinctions.distinctions');
    const systemsTableExists = await tableExists('systems.systems');
    const connectionsTableExists = await tableExists('relationships.connections');
    
    // If all essential tables exist
    if (distinctionsTableExists && systemsTableExists && connectionsTableExists) {
      console.log('All essential Garden tables exist!');
      return true;
    }
    
    // If any essential table is missing
    console.warn('Some Garden tables are missing:');
    console.warn(`- distinctions.distinctions: ${distinctionsTableExists ? 'Exists' : 'Missing'}`);
    console.warn(`- systems.systems: ${systemsTableExists ? 'Exists' : 'Missing'}`);
    console.warn(`- relationships.connections: ${connectionsTableExists ? 'Exists' : 'Missing'}`);
    
    return false;
  } catch (error) {
    console.error('Error checking Garden tables:', error);
    return false;
  }
};
