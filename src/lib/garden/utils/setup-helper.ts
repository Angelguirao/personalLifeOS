
import supabase from '../client';
import { toast } from 'sonner';

// Helper function to get the setup SQL
export const getSetupSQL = async (): Promise<string> => {
  try {
    // Fetch the SQL script
    const response = await fetch('/src/lib/garden/sql/complete_garden_setup.sql');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch SQL script: ${response.status} ${response.statusText}`);
    }
    
    const sql = await response.text();
    return sql;
  } catch (error) {
    console.error('Error loading setup SQL:', error);
    toast.error('Failed to load setup SQL script');
    return '';
  }
};

// Instructions for manual setup
export const getSetupInstructions = (): string => {
  return `
To set up the database tables:

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Copy the contents of the complete_garden_setup.sql file 
   (src/lib/garden/sql/complete_garden_setup.sql)
4. Paste it into the SQL Editor
5. Click "Run" to execute the script

The script will create all necessary schemas, tables, functions, and initial data.
`;
};

// Function to display full setup instructions to the user
export const showSetupInstructions = async () => {
  try {
    const sql = await getSetupSQL();
    
    if (!sql) {
      toast.error('Could not load setup script');
      return;
    }
    
    // Create a modal or toast with detailed instructions
    toast.info('Database setup required', {
      description: 'You need to run the setup script in Supabase SQL Editor',
      duration: 10000,
      action: {
        label: 'View Instructions',
        onClick: () => {
          // Open a dialog with the full setup instructions and SQL
          // This is just a placeholder - in a real app, you'd show a proper dialog
          alert(getSetupInstructions());
        }
      }
    });
    
    console.log('Setup SQL:', sql);
    console.log('Please follow the instructions to set up your database.');
    
  } catch (error) {
    console.error('Error showing setup instructions:', error);
    toast.error('Failed to load setup instructions');
  }
};
