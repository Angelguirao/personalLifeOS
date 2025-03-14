
import { 
  GardenNote, 
  Connection, 
  RelationshipType, 
  MentalModel,
  DevelopmentStage,
  ConfidenceLevel,
  Question,
  QuestionCategory,
  Inspiration,
  convertMentalModelToNote,
  MentalModelVersion
} from './types';

// Enhanced mental models using the new structure
export const mentalModels: MentalModel[] = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Valid UUID format
    title: "Humanity's Future: Transform, Not Extinct",
    subtitle: "Rethinking human existence in relation to nature",
    developmentStage: "seedling",
    confidenceLevel: "hypothesis",
    summary: "Todd May's Should We Go Extinct? provokes deep reflection on humanity's future. What if the answer lies not in our extinction, but in transforming how we live—by valuing nature as part of ourselves?",
    fullContent: "Todd May's Should We Go Extinct? provokes deep reflection on humanity's future. What if the answer lies not in our extinction, but in transforming how we live—by valuing nature as part of ourselves? This is a placeholder for the extended version of this note that would dive deeper into the concepts and provide more detailed analysis.",
    tags: ["ethics", "humanity", "environment", "book"],
    timestamps: {
      created: "2024-09-01",
      modified: "2024-09-01"
    },
    latchAttributes: {
      category: "Philosophy",
      hierarchyLevel: 4
    },
    socraticAttributes: {
      clarification: "This model examines whether human existence is incompatible with environmental flourishing",
      assumptions: ["Humans and nature are separate", "Human existence necessarily harms nature"],
      implications: "If we see ourselves as part of nature rather than separate, we can transform our relationship with the environment"
    },
    visibility: "public",
    // Legacy compatibility
    stage: "seedling",
    lastUpdated: "2024-09-01"
  },
  {
    id: "c4c6e79b-0d04-4f53-b6f3-3382180cadc9", // Valid UUID format
    title: "Beyond Happiness: Rethinking What Matters",
    subtitle: "Critique of happiness as the ultimate goal",
    developmentStage: "seedling",
    confidenceLevel: "working",
    summary: "The global pursuit of happiness overlooks justice and equality. Against Happiness by Owen Flanagan and co-authors critiques the simplistic 'happiness agenda,' urging us to rethink what truly makes a life worth living. Time to prioritize deeper values.",
    fullContent: "The global pursuit of happiness overlooks justice and equality. Against Happiness by Owen Flanagan and co-authors critiques the simplistic 'happiness agenda,' urging us to rethink what truly makes a life worth living. Time to prioritize deeper values. This extended version would explore the philosophical implications of prioritizing happiness over other values and how this shapes societal structures.",
    tags: ["ethics", "happiness", "values", "book"],
    timestamps: {
      created: "2024-09-01",
      modified: "2024-09-01"
    },
    latchAttributes: {
      category: "Ethics",
      hierarchyLevel: 3
    },
    dsrpStructure: {
      distinctions: "Distinguishes between happiness and flourishing",
      perspectives: ["Utilitarian", "Virtue ethics", "Justice-oriented"]
    },
    visibility: "public",
    // Legacy compatibility
    stage: "seedling",
    lastUpdated: "2024-09-01"
  },
  {
    id: "3a8a7e33-da91-4782-90ba-1834c9e982c4", // Valid UUID format
    title: "Knowledge as Ethical Solidarity",
    subtitle: "Rorty's pragmatic approach to epistemology",
    developmentStage: "growing",
    confidenceLevel: "established",
    summary: "Richard Rorty's book \"Contingency, irony, and solidarity\" is a reminder that the heart of inquiry is ethical solidarity, not an objective endpoint. What if our pursuit of knowledge is really about how we relate to each other?",
    fullContent: "Richard Rorty's book \"Contingency, irony, and solidarity\" is a reminder that the heart of inquiry is ethical solidarity, not an objective endpoint. What if our pursuit of knowledge is really about how we relate to each other? This expanded note would delve into Rorty's pragmatism and how it challenges traditional notions of truth and objectivity.",
    tags: ["ethics", "knowledge", "solidarity", "book"],
    timestamps: {
      created: "2024-08-31",
      modified: "2024-08-31"
    },
    latchAttributes: {
      category: "Epistemology",
      hierarchyLevel: 4
    },
    consequences: {
      personal: "Changes how we view our responsibility in knowledge creation",
      societal: "Moves from correspondence theory of truth to communal agreement"
    },
    visibility: "public",
    // Legacy compatibility
    stage: "growing",
    lastUpdated: "2024-08-31"
  },
  {
    id: "0556b3d5-64e2-4b70-8f47-8d3ba68f56c8", // Valid UUID format
    title: "Reclaiming Reflection in a Thoughtless Age",
    subtitle: "Arendt on thoughtfulness as political action",
    developmentStage: "growing",
    confidenceLevel: "established",
    summary: "In an age of thoughtless actions, Arendt's The Human Condition urges us to reclaim our capacity for reflection. Are we mindlessly drifting, or consciously shaping our world?",
    fullContent: "In an age of thoughtless actions, Arendt's The Human Condition urges us to reclaim our capacity for reflection. Are we mindlessly drifting, or consciously shaping our world? This expanded note would explore Arendt's concept of 'thoughtlessness' and its implications for modern society, politics, and individual responsibility.",
    tags: ["politics", "reflection", "consciousness", "book"],
    timestamps: {
      created: "2024-08-29",
      modified: "2024-08-29"
    },
    latchAttributes: {
      category: "Political Philosophy",
      hierarchyLevel: 3
    },
    socraticAttributes: {
      assumptions: ["Thinking can be separated from doing", "Thoughtlessness leads to harmful actions"],
      evidence: "Historical examples including totalitarian regimes",
      implications: "Thoughtfulness as a political and ethical responsibility"
    },
    visibility: "public",
    // Legacy compatibility
    stage: "growing",
    lastUpdated: "2024-08-29"
  },
  {
    id: "2b45c097-b31e-4c36-b324-3f8824601dbe", // Valid UUID format
    title: "The Beautiful Mystery of Truth",
    subtitle: "Epistemological uncertainty as a feature, not a bug",
    developmentStage: "evergreen",
    confidenceLevel: "fundamental",
    summary: "From divine to scientific, our pursuit of certainty reflects a deeper need. But truth, shaped by our consciousness, remains a mystery we cannot fully grasp. To truly evolve, we must embrace skepticism and the beauty of uncertainty.",
    fullContent: "From divine to scientific, our pursuit of certainty reflects a deeper need. But truth, shaped by our consciousness, remains a mystery we cannot fully grasp. To truly evolve, we must embrace skepticism and the beauty of uncertainty. This fuller exploration would examine how different epistemological frameworks have attempted to define and capture truth, and why embracing uncertainty might be more intellectually honest.",
    tags: ["truth", "consciousness", "uncertainty", "epistemology"],
    timestamps: {
      created: "2024-08-29",
      modified: "2024-08-29"
    },
    latchAttributes: {
      category: "Epistemology",
      hierarchyLevel: 5
    },
    dsrpStructure: {
      distinctions: "Distinguishes between certainty and truth",
      perspectives: ["Scientific realism", "Pragmatism", "Constructivism"]
    },
    visibility: "public",
    // Legacy compatibility
    stage: "evergreen",
    lastUpdated: "2024-08-29"
  }
];

// Sample questions related to mental models
export const questions: Question[] = [
  {
    id: "6d43bc47-67c5-4b4a-9d9a-082c6c95a75f", // Valid UUID format
    questionText: "What is the relationship between happiness and a good life?",
    clarificationNeeded: false,
    relatedModels: ["c4c6e79b-0d04-4f53-b6f3-3382180cadc9"], // Updated to match the new UUID
    category: "philosophical",
    importanceRank: 8
  },
  {
    id: "b9c2f317-fc7d-48b5-8264-5988a69c1a96", // Valid UUID format
    questionText: "How should humans relate to the natural world?",
    clarificationNeeded: false,
    relatedModels: ["f47ac10b-58cc-4372-a567-0e02b2c3d479"], // Updated to match the new UUID
    category: "ethical",
    importanceRank: 9
  },
  {
    id: "38f5b8e4-c760-4b32-90d0-cd83235c7b34", // Valid UUID format
    questionText: "Is objective truth possible or desirable?",
    clarificationNeeded: false,
    relatedModels: ["3a8a7e33-da91-4782-90ba-1834c9e982c4", "2b45c097-b31e-4c36-b324-3f8824601dbe"], // Updated to match the new UUIDs
    category: "philosophical",
    importanceRank: 7
  },
  {
    id: "7a8f19d7-4bc3-4d6a-9f12-6efd2d8cc721", // Valid UUID format
    questionText: "What is the relationship between thinking and action?",
    clarificationNeeded: false,
    relatedModels: ["0556b3d5-64e2-4b70-8f47-8d3ba68f56c8"], // Updated to match the new UUID
    category: "philosophical",
    importanceRank: 6
  }
];

// Sample inspirations
export const inspirations: Inspiration[] = [
  {
    id: "b32db1ae-6f5e-4c81-94da-6a3c3fe03c1c", // Valid UUID format
    sourceType: "book",
    sourceName: "Should We Go Extinct?",
    authorName: "Todd May",
    link: "https://openlibrary.org/works/OL37629912W/Should_We_Go_Extinct?edition=key%3A/books/OL50735111M",
    quote: "The question is not whether we should go extinct, but how we should live."
  },
  {
    id: "97f84357-b3a7-4c0f-88f0-e1d0ff8249cd", // Valid UUID format
    sourceType: "book",
    sourceName: "Against Happiness",
    authorName: "Owen Flanagan",
    link: "https://openlibrary.org/works/OL34335891W/Against_Happiness?edition=key%3A/books/OL46566568M",
    quote: "Happiness without justice is a hollow pursuit."
  }
];

// For backward compatibility - convert mental models to garden notes
export const gardenNotes: GardenNote[] = mentalModels.map(convertMentalModelToNote);

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

// Generate some sample connections between notes with strengths as numbers, not strings
export const connections: Connection[] = [
  { id: 1, sourceId: 1, targetId: 2, strength: 0.7, relationship: "related" as RelationshipType },
  { id: 2, sourceId: 1, targetId: 3, strength: 0.5, relationship: "inspires" as RelationshipType },
  { id: 3, sourceId: 2, targetId: 4, strength: 0.6, relationship: "builds_on" as RelationshipType },
  { id: 4, sourceId: 3, targetId: 5, strength: 0.8, relationship: "contrasts" as RelationshipType },
  { id: 5, sourceId: 4, targetId: 1, strength: 0.4, relationship: "references" as RelationshipType },
  { id: 6, sourceId: 5, targetId: 3, strength: 0.5, relationship: "questions" as RelationshipType },
];

