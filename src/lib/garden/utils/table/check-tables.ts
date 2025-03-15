
import { tableExists } from './table-exists';
import { schemaExists } from './setup-utils';

// Check if required schemas exist
export const checkGardenSchemasExist = async (): Promise<boolean> => {
  try {
    // Check all required schemas
    const distinctionsSchemaExists = await schemaExists('distinctions');
    const systemsSchemaExists = await schemaExists('systems');
    const relationshipsSchemaExists = await schemaExists('relationships');
    const perspectivesSchemaExists = await schemaExists('perspectives');
    
    // If all schemas exist
    if (distinctionsSchemaExists && systemsSchemaExists && 
        relationshipsSchemaExists && perspectivesSchemaExists) {
      console.log('All Garden schemas exist!');
      return true;
    }
    
    // If any schema is missing
    console.warn('Some Garden schemas are missing:');
    console.warn(`- distinctions: ${distinctionsSchemaExists ? 'Exists' : 'Missing'}`);
    console.warn(`- systems: ${systemsSchemaExists ? 'Exists' : 'Missing'}`);
    console.warn(`- relationships: ${relationshipsSchemaExists ? 'Exists' : 'Missing'}`);
    console.warn(`- perspectives: ${perspectivesSchemaExists ? 'Exists' : 'Missing'}`);
    
    return false;
  } catch (error) {
    console.error('Error checking Garden schemas:', error);
    return false;
  }
};

// Check if all required tables exist
export const checkGardenTablesExist = async (): Promise<boolean> => {
  try {
    // First check if schemas exist
    const schemasExist = await checkGardenSchemasExist();
    if (!schemasExist) {
      console.warn('Garden schemas do not exist - need to run setup script first');
      return false;
    }
    
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
