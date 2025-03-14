
import { MentalModelVersion } from '../types';

// Sample mental model versions for version history tracking
export const modelVersions: MentalModelVersion[] = [
  {
    id: "e7c74a23-9fc8-4d94-99ce-41a6f37409ad", // Valid UUID format
    mentalModelId: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // ID matches the Transformative Existence model
    versionNumber: 1,
    contentSnapshot: "Initial thoughts on Transformative Existence",
    changeLog: "Initial creation",
    timestamp: "2024-09-01T10:00:00Z"
  },
  {
    id: "a8d35c91-7f2f-4b7b-ac03-48c726a98d71", // Valid UUID format
    mentalModelId: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // ID matches the Transformative Existence model
    versionNumber: 2,
    contentSnapshot: "Our relationship with nature isn't necessarily antagonistic. We can transform how we perceive ourselves in relation to nature – as part of it rather than separate from it.",
    changeLog: "Expanded on the core concept and added nuance",
    timestamp: "2024-09-01T15:30:00Z"
  },
  {
    id: "b2c5f182-6d38-4e1b-9a5f-58e7c9d12c43", // New UUID
    mentalModelId: "c4c6e79b-0d04-4f53-b6f3-3382180cadc9", // ID matches Values Beyond Happiness model
    versionNumber: 1,
    contentSnapshot: "Initial draft of Values Beyond Happiness concept",
    changeLog: "Initial creation",
    timestamp: "2024-09-01T11:15:00Z"
  },
  {
    id: "7f9e4d23-6a5c-48b9-ae71-12d3e4f56789", // New UUID
    mentalModelId: "3a8a7e33-da91-4782-90ba-1834c9e982c4", // ID matches Knowledge as Solidarity model
    versionNumber: 1,
    contentSnapshot: "First exploration of Knowledge as Solidarity concept",
    changeLog: "Initial creation",
    timestamp: "2024-08-31T09:20:00Z"
  }
];
