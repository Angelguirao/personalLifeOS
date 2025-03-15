
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
3. Copy the complete SQL script provided below
4. Paste it into the SQL Editor
5. Click "Run" to execute the script

The script will create all necessary schemas, tables, functions, and initial data.

NOTE: This script is designed to be run all at once. Don't try to run it in parts.
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
    
    // Create a dialog or modal with detailed instructions
    // For now, we'll show a toast with instructions
    toast.info('Database setup required', {
      description: 'You need to run the setup script in Supabase SQL Editor',
      duration: 10000,
      action: {
        label: 'Show SQL',
        onClick: () => {
          // Open a dialog with the full setup instructions and SQL
          const instructions = getSetupInstructions();
          const fullContent = `${instructions}\n\n----- COPY EVERYTHING BELOW THIS LINE -----\n\n${sql}`;
          
          // Create a textarea element to copy the SQL
          const textarea = document.createElement('textarea');
          textarea.value = sql;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          
          // Show the SQL in a new window
          const newWindow = window.open('', '_blank');
          if (newWindow) {
            newWindow.document.write(`
              <html>
                <head>
                  <title>Garden Setup SQL</title>
                  <style>
                    body { 
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                      line-height: 1.6;
                      padding: 2rem;
                      max-width: 900px;
                      margin: 0 auto;
                    }
                    pre {
                      background: #f5f5f5;
                      padding: 1rem;
                      overflow: auto;
                      border-radius: 4px;
                      border: 1px solid #ddd;
                    }
                    .buttons {
                      margin: 1rem 0;
                    }
                    button {
                      padding: 0.5rem 1rem;
                      background: #4299e1;
                      color: white;
                      border: none;
                      border-radius: 4px;
                      cursor: pointer;
                      margin-right: 0.5rem;
                    }
                    h1, h2 {
                      color: #2d3748;
                    }
                    .instructions {
                      background: #ebf8ff;
                      padding: 1rem;
                      border-radius: 4px;
                      border-left: 4px solid #4299e1;
                    }
                  </style>
                </head>
                <body>
                  <h1>Garden Setup SQL</h1>
                  <div class="instructions">
                    <p>The SQL has been copied to your clipboard. Follow these instructions:</p>
                    <ol>
                      <li>Log in to your Supabase dashboard</li>
                      <li>Go to the SQL Editor</li>
                      <li>Paste the SQL script (already copied to clipboard)</li>
                      <li>Click "Run" to execute the script</li>
                    </ol>
                  </div>
                  <div class="buttons">
                    <button id="copy-btn">Copy SQL Again</button>
                    <button onclick="window.open('https://app.supabase.com', '_blank')">Open Supabase</button>
                  </div>
                  <h2>SQL Script</h2>
                  <pre>${sql.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
                  
                  <script>
                    document.getElementById('copy-btn').addEventListener('click', function() {
                      const textarea = document.createElement('textarea');
                      textarea.value = \`${sql.replace(/`/g, '\\`')}\`;
                      document.body.appendChild(textarea);
                      textarea.select();
                      document.execCommand('copy');
                      document.body.removeChild(textarea);
                      this.textContent = 'Copied!';
                      setTimeout(() => { this.textContent = 'Copy SQL Again'; }, 2000);
                    });
                  </script>
                </body>
              </html>
            `);
            newWindow.document.close();
          } else {
            // Fallback if popup is blocked
            alert(fullContent);
          }
          
          toast.success('SQL script copied to clipboard!');
        }
      }
    });
    
    console.log('Setup SQL:', sql.substring(0, 100) + '...');
    console.log('Please follow the instructions to set up your database.');
    
  } catch (error) {
    console.error('Error showing setup instructions:', error);
    toast.error('Failed to load setup instructions');
  }
};
