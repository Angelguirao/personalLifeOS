
import { MentalModelVersion } from '../types';

// Sample mental model versions for version history tracking
export const modelVersions: MentalModelVersion[] = [
  {
    id: "e7c74a23-9fc8-4d94-99ce-41a6f37409ad", // Valid UUID format
    mentalModelId: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Updated to match the new UUID
    versionNumber: 1,
    contentSnapshot: "Initial thoughts on Todd May's Should We Go Extinct?",
    changeLog: "Initial creation",
    timestamp: "2024-09-01T10:00:00Z"
  },
  {
    id: "a8d35c91-7f2f-4b7b-ac03-48c726a98d71", // Valid UUID format
    mentalModelId: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Updated to match the new UUID
    versionNumber: 2,
    contentSnapshot: "Todd May's Should We Go Extinct? provokes deep reflection on humanity's future. What if the answer lies not in our extinction, but in transforming how we live—by valuing nature as part of ourselves?",
    changeLog: "Expanded on the core concept and added nuance",
    timestamp: "2024-09-01T15:30:00Z"
  }
];
