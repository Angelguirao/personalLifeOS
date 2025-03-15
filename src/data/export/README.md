
# LifeOS Data Migration

This directory contains exported data and type definitions from your original Supabase-based LifeOS project. Use these files to import your data into your new MongoDB/Node.js project.

## Files Included

- `mentalModels.json` - Your mental models collection data
- `questions.json` - Your questions collection data
- `connections.json` - Relationship data between mental models
- `inspirations.json` - Book and other inspiration sources
- `types.ts` - TypeScript type definitions and MongoDB schema helpers

## Migration Steps for MongoDB

1. **Create MongoDB Collections**:
   - Create collections for `mentalModels`, `questions`, `connections`, and `inspirations`

2. **Import Data**:
   - Use the MongoDB import tools or programmatically import the JSON data
   ```javascript
   // Example Node.js code to import data
   const { MongoClient } = require('mongodb');
   const fs = require('fs');
   
   async function importData() {
     const uri = "mongodb+srv://your-connection-string";
     const client = new MongoClient(uri);
     
     try {
       await client.connect();
       const database = client.db("lifeOS");
       
       // Import mental models
       const mentalModelsData = JSON.parse(fs.readFileSync('./mentalModels.json', 'utf8'));
       await database.collection("mentalModels").insertMany(mentalModelsData);
       
       // Import questions
       const questionsData = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));
       await database.collection("questions").insertMany(questionsData);
       
       // Import connections
       const connectionsData = JSON.parse(fs.readFileSync('./connections.json', 'utf8'));
       await database.collection("connections").insertMany(connectionsData);
       
       // Import inspirations
       const inspirationsData = JSON.parse(fs.readFileSync('./inspirations.json', 'utf8'));
       await database.collection("inspirations").insertMany(inspirationsData);
       
       console.log("Data imported successfully");
     } finally {
       await client.close();
     }
   }
   
   importData().catch(console.error);
   ```

3. **Create MongoDB Schemas (if using Mongoose)**:
   - Use the schema definitions in `types.ts` to create your Mongoose schemas

## Next Steps for AWS Serverless

1. **Create API Gateway**:
   - Set up a new API Gateway in AWS to handle your REST endpoints

2. **Set Up Lambda Functions**:
   - Create Lambda functions for CRUD operations on each collection
   - Example functions:
     - `getMentalModels`
     - `createMentalModel`
     - `updateMentalModel`
     - `getQuestions`
     - `createConnection`
     - etc.

3. **Configure Security**:
   - Set up AWS Cognito for authentication
   - Configure appropriate IAM roles and policies

4. **Connect Your Frontend**:
   - Update your frontend code to use AWS SDK or fetch requests to your new API endpoints
