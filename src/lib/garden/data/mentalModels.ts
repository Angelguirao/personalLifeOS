
import { 
  MentalModel, 
  GardenNote, 
  convertMentalModelToNote 
} from '../types';

// Enhanced mental models using the new structure - representing fundamental units of knowledge
export const mentalModels: MentalModel[] = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    title: "Transformative Existence",
    subtitle: "Human existence as part of nature rather than separate from it",
    developmentStage: "seedling",
    confidenceLevel: "hypothesis",
    summary: "Our relationship with nature isn't necessarily antagonistic. Instead of extinction, we could transform how we perceive ourselves in relation to nature – as part of it rather than separate from it.",
    fullContent: "Todd May's book 'Should We Go Extinct?' challenges us to rethink human existence in relation to the rest of life on Earth. While some argue human extinction would benefit other species, an alternative view is that humans can transform our relationship with nature by understanding ourselves as integral to it rather than separate. This mental model reframes environmental ethics from extinction-focused to transformation-focused thinking.",
    tags: ["ethics", "environment", "ecology", "anthropocene"],
    timestamps: {
      created: "2024-09-01",
      modified: "2024-09-01"
    },
    latchAttributes: {
      category: "Environmental Ethics",
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
    id: "c4c6e79b-0d04-4f53-b6f3-3382180cadc9",
    title: "Values Beyond Happiness",
    subtitle: "Justice and equality as primary social values",
    developmentStage: "seedling",
    confidenceLevel: "working",
    summary: "The global pursuit of happiness as the ultimate goal may lead to overlooking more fundamental values like justice and equality. A well-lived life might require more than just happiness.",
    fullContent: "The book 'Against Happiness' by Owen Flanagan challenges the dominant 'happiness agenda' in global policy. This mental model proposes that focusing exclusively on happiness metrics overlooks critical values like justice, fairness, and equality. A meaningful life likely requires a broader spectrum of experiences and values beyond mere happiness, including moral virtue, justice-seeking, and thoughtful engagement with difficult realities.",
    tags: ["ethics", "values", "philosophy", "happiness"],
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
    id: "3a8a7e33-da91-4782-90ba-1834c9e982c4",
    title: "Knowledge as Solidarity",
    subtitle: "Epistemological pragmatism centered on human relations",
    developmentStage: "growing",
    confidenceLevel: "established",
    summary: "Knowledge isn't about capturing objective reality but creating frameworks that strengthen human solidarity and ethical relationships.",
    fullContent: "Richard Rorty's seminal work 'Contingency, Irony, and Solidarity' reframes epistemology entirely. This mental model holds that knowledge claims are justified not by correspondence to an external reality but by their ability to foster human solidarity and ethical relations. The pursuit of knowledge is fundamentally ethical rather than representational, aimed at creating communities of shared understanding rather than mirroring nature. This pragmatic approach shifts focus from 'getting reality right' to 'making lives better.'",
    tags: ["epistemology", "pragmatism", "ethics", "philosophy"],
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
    id: "0556b3d5-64e2-4b70-8f47-8d3ba68f56c8",
    title: "Thoughtfulness as Political Action",
    subtitle: "Reflection as resistance to political thoughtlessness",
    developmentStage: "growing",
    confidenceLevel: "established",
    summary: "The capacity for deep reflection is a vital political action in an age where thoughtlessness enables political harm.",
    fullContent: "Hannah Arendt's 'The Human Condition' introduces the concept that thoughtlessness—not active malice—enables political catastrophes. This mental model proposes that cultivating the habit of reflection is itself a political act. When we pause to consider the full implications of our actions and policies, we resist the currents of thoughtless harm that characterize modern political life. Thoughtfulness becomes a form of resistance to authoritarianism and injustice.",
    tags: ["politics", "philosophy", "reflection", "ethics"],
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
    id: "2b45c097-b31e-4c36-b324-3f8824601dbe",
    title: "Truth as Beautiful Mystery",
    subtitle: "Uncertainty as epistemological strength",
    developmentStage: "evergreen",
    confidenceLevel: "fundamental",
    summary: "Truth is not something to be definitively captured but a beautiful mystery to be continuously engaged with through sustained inquiry.",
    fullContent: "Throughout intellectual history, humans have sought certainty—first through divine revelation, then through scientific method. This mental model proposes that truth itself is shaped by the consciousness engaging with it, making complete certainty impossible. Rather than viewing this as a failure, we might see the beauty in uncertainty: it keeps inquiry alive, prevents dogmatism, and acknowledges the evolving nature of knowledge. Embracing skepticism becomes not just intellectually honest but aesthetically rich.",
    tags: ["epistemology", "philosophy", "consciousness", "truth"],
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

// For backward compatibility - convert mental models to garden notes
export const gardenNotes: GardenNote[] = mentalModels.map(convertMentalModelToNote);
