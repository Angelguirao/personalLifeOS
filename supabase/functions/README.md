
# Supabase Edge Functions

This directory contains Edge Functions that run on Supabase's Edge Functions infrastructure.

## Available Edge Functions

### `setup-database`

This function handles the secure setup of database schemas and tables.

## Deployment Instructions

1. Install Supabase CLI if you haven't already:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase CLI:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Deploy all functions:
   ```bash
   supabase functions deploy
   ```

5. Or deploy a specific function:
   ```bash
   supabase functions deploy setup-database
   ```

6. Set your Edge Function URL in your environment variables:
   ```
   VITE_EDGE_FUNCTION_URL=https://your-project-ref.supabase.co/functions/v1
   ```

## Security Considerations

- Edge Functions run with the full permissions of your Supabase project
- They should validate authentication before performing sensitive operations
- Add appropriate error handling and logging

## Local Development

1. Start the Supabase local development server:
   ```bash
   supabase start
   ```

2. Serve a specific function locally:
   ```bash
   supabase functions serve setup-database --no-verify-jwt
   ```

3. Test the function with curl:
   ```bash
   curl -i --location --request POST 'http://localhost:54321/functions/v1/setup-database' \
   --header 'Authorization: Bearer YOUR_JWT_TOKEN' \
   --header 'Content-Type: application/json' \
   --data '{}'
   ```
