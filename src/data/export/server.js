
// Sample Node.js Express server with MongoDB connection
// This can be used as a starting point for your new project

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define schemas (these would typically be in separate files)
const mentalModelSchema = new mongoose.Schema({
  id: String,
  title: { type: String, required: true },
  subtitle: String,
  developmentStage: { 
    type: String, 
    enum: ['seedling', 'growing', 'evergreen', 'mature', 'refined'], 
    default: 'seedling' 
  },
  confidenceLevel: { 
    type: String, 
    enum: ['hypothesis', 'working', 'established', 'fundamental'], 
    default: 'working' 
  },
  summary: String,
  fullContent: String,
  tags: [String],
  timestamps: {
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now }
  },
  latchAttributes: {
    category: String,
    hierarchyLevel: Number
  },
  socraticAttributes: {
    clarification: String,
    assumptions: [String],
    implications: String
  },
  visibility: { 
    type: String, 
    enum: ['public', 'private', 'unlisted'], 
    default: 'public' 
  }
});

// Define models
const MentalModel = mongoose.model('MentalModel', mentalModelSchema);

// Routes
app.get('/api/models', async (req, res) => {
  try {
    const models = await MentalModel.find({ visibility: 'public' });
    res.json(models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/models/:id', async (req, res) => {
  try {
    const model = await MentalModel.findOne({ id: req.params.id });
    if (!model) return res.status(404).json({ message: 'Model not found' });
    res.json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/models', async (req, res) => {
  try {
    const model = new MentalModel(req.body);
    const result = await model.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/models/:id', async (req, res) => {
  try {
    const model = await MentalModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!model) return res.status(404).json({ message: 'Model not found' });
    res.json(model);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/models/:id', async (req, res) => {
  try {
    const model = await MentalModel.findOneAndDelete({ id: req.params.id });
    if (!model) return res.status(404).json({ message: 'Model not found' });
    res.json({ message: 'Model deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add routes for questions, connections, and inspirations as needed...

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
