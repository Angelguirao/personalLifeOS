
import { Connection, RelationshipType } from '../types/connection-types';

// Updated connections to reflect meaningful relationships between mental models
export const connections: Connection[] = [
  { 
    id: 1, 
    sourceId: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Transformative Existence
    targetId: "c4c6e79b-0d04-4f53-b6f3-3382180cadc9", // Values Beyond Happiness
    strength: 0.7, 
    relationship: "related" 
  },
  { 
    id: 2, 
    sourceId: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Transformative Existence
    targetId: "3a8a7e33-da91-4782-90ba-1834c9e982c4", // Knowledge as Solidarity
    strength: 0.5, 
    relationship: "inspires" 
  },
  { 
    id: 3, 
    sourceId: "c4c6e79b-0d04-4f53-b6f3-3382180cadc9", // Values Beyond Happiness
    targetId: "0556b3d5-64e2-4b70-8f47-8d3ba68f56c8", // Thoughtfulness as Political Action
    strength: 0.6, 
    relationship: "builds_on" 
  },
  { 
    id: 4, 
    sourceId: "3a8a7e33-da91-4782-90ba-1834c9e982c4", // Knowledge as Solidarity
    targetId: "2b45c097-b31e-4c36-b324-3f8824601dbe", // Truth as Beautiful Mystery
    strength: 0.8, 
    relationship: "contrasts" 
  },
  { 
    id: 5, 
    sourceId: "0556b3d5-64e2-4b70-8f47-8d3ba68f56c8", // Thoughtfulness as Political Action
    targetId: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Transformative Existence
    strength: 0.4, 
    relationship: "references" 
  },
  { 
    id: 6, 
    sourceId: "2b45c097-b31e-4c36-b324-3f8824601dbe", // Truth as Beautiful Mystery
    targetId: "3a8a7e33-da91-4782-90ba-1834c9e982c4", // Knowledge as Solidarity
    strength: 0.5, 
    relationship: "questions" 
  },
];
