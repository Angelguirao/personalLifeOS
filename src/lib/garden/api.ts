// This file will be replaced with actual Supabase calls after Supabase integration

export interface BookInfo {
  title: string;
  author: string;
  link: string;
}

export interface GardenNote {
  id: number;
  title: string;
  summary: string;
  fullContent: string;
  stage: 'seedling' | 'growing' | 'evergreen';
  lastUpdated: string;
  connections: string[];
  bookInfo?: BookInfo;
}

export interface Connection {
  id: number;
  sourceId: number;
  targetId: number;
  strength: number;
  relationship: string;
}

// Temporary hardcoded data - will be replaced with Supabase queries
const gardenNotes: GardenNote[] = [
  {
    id: 1,
    title: "Humanity's Future: Transform, Not Extinct",
    summary: "Todd May's Should We Go Extinct? provokes deep reflection on humanity's future. What if the answer lies not in our extinction, but in transforming how we live—by valuing nature as part of ourselves?",
    fullContent: "Todd May's Should We Go Extinct? provokes deep reflection on humanity's future. What if the answer lies not in our extinction, but in transforming how we live—by valuing nature as part of ourselves? This is a placeholder for the extended version of this note that would dive deeper into the concepts and provide more detailed analysis.",
    stage: "seedling",
    lastUpdated: "2024-09-01",
    connections: ["ethics", "humanity", "environment"],
    bookInfo: {
      title: "Should We Go Extinct?",
      author: "Todd May",
      link: "https://openlibrary.org/works/OL37629912W/Should_We_Go_Extinct?edition=key%3A/books/OL50735111M"
    }
  },
  {
    id: 2,
    title: "Beyond Happiness: Rethinking What Matters",
    summary: "The global pursuit of happiness overlooks justice and equality. Against Happiness by Owen Flanagan and co-authors critiques the simplistic 'happiness agenda,' urging us to rethink what truly makes a life worth living. Time to prioritize deeper values.",
    fullContent: "The global pursuit of happiness overlooks justice and equality. Against Happiness by Owen Flanagan and co-authors critiques the simplistic 'happiness agenda,' urging us to rethink what truly makes a life worth living. Time to prioritize deeper values. This extended version would explore the philosophical implications of prioritizing happiness over other values and how this shapes societal structures.",
    stage: "seedling",
    lastUpdated: "2024-09-01",
    connections: ["ethics", "happiness", "values"],
    bookInfo: {
      title: "Against Happiness",
      author: "Owen Flanagan",
      link: "https://openlibrary.org/works/OL34335891W/Against_Happiness?edition=key%3A/books/OL46566568M"
    }
  },
  {
    id: 3,
    title: "Knowledge as Ethical Solidarity",
    summary: "Richard Rorty's book \"Contingency, irony, and solidarity\" is a reminder that the heart of inquiry is ethical solidarity, not an objective endpoint. What if our pursuit of knowledge is really about how we relate to each other?",
    fullContent: "Richard Rorty's book \"Contingency, irony, and solidarity\" is a reminder that the heart of inquiry is ethical solidarity, not an objective endpoint. What if our pursuit of knowledge is really about how we relate to each other? This expanded note would delve into Rorty's pragmatism and how it challenges traditional notions of truth and objectivity.",
    stage: "seedling",
    lastUpdated: "2024-08-31",
    connections: ["ethics", "knowledge", "solidarity"],
    bookInfo: {
      title: "Contingency, irony, and solidarity",
      author: "Richard Rorty",
      link: "https://openlibrary.org/works/OL2018373W/Contingency_irony_and_solidarity?edition=key%3A/books/OL23241517M"
    }
  },
  {
    id: 4,
    title: "Reclaiming Reflection in a Thoughtless Age",
    summary: "In an age of thoughtless actions, Arendt's The Human Condition urges us to reclaim our capacity for reflection. Are we mindlessly drifting, or consciously shaping our world?",
    fullContent: "In an age of thoughtless actions, Arendt's The Human Condition urges us to reclaim our capacity for reflection. Are we mindlessly drifting, or consciously shaping our world? This expanded note would explore Arendt's concept of 'thoughtlessness' and its implications for modern society, politics, and individual responsibility.",
    stage: "seedling",
    lastUpdated: "2024-08-29",
    connections: ["politics", "reflection", "consciousness"],
    bookInfo: {
      title: "The Human Condition",
      author: "Hannah Arendt",
      link: "https://openlibrary.org/works/OL10460638W/The_Human_Condition?edition=key%3A/books/OL14968018M"
    }
  },
  {
    id: 5,
    title: "The Beautiful Mystery of Truth",
    summary: "From divine to scientific, our pursuit of certainty reflects a deeper need. But truth, shaped by our consciousness, remains a mystery we cannot fully grasp. To truly evolve, we must embrace skepticism and the beauty of uncertainty.",
    fullContent: "From divine to scientific, our pursuit of certainty reflects a deeper need. But truth, shaped by our consciousness, remains a mystery we cannot fully grasp. To truly evolve, we must embrace skepticism and the beauty of uncertainty. This fuller exploration would examine how different epistemological frameworks have attempted to define and capture truth, and why embracing uncertainty might be more intellectually honest.",
    stage: "seedling",
    lastUpdated: "2024-08-29",
    connections: ["truth", "consciousness", "uncertainty"],
  }
];

// Generate some sample connections between notes
const gardenConnections: Connection[] = [
  { id: 1, sourceId: 1, targetId: 2, strength: 0.7, relationship: "related" },
  { id: 2, sourceId: 1, targetId: 3, strength: 0.5, relationship: "inspires" },
  { id: 3, sourceId: 2, targetId: 4, strength: 0.6, relationship: "builds_on" },
  { id: 4, sourceId: 3, targetId: 5, strength: 0.8, relationship: "contrasts" },
  { id: 5, sourceId: 4, targetId: 1, strength: 0.4, relationship: "references" },
  { id: 6, sourceId: 5, targetId: 3, strength: 0.5, relationship: "questions" },
];

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const getNotes = async (): Promise<GardenNote[]> => {
  const { data, error } = await supabase
    .from('garden_notes')
    .select('*');
  
  if (error) throw error;
  return data || [];
};

export const getConnections = async (): Promise<Connection[]> => {
  const { data, error } = await supabase
    .from('garden_connections')
    .select('*');
  
  if (error) throw error;
  return data || [];
};

export const getNoteById = async (id: number): Promise<GardenNote | undefined> => {
  const { data, error } = await supabase
    .from('garden_notes')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createNote = async (note: Omit<GardenNote, 'id'>): Promise<GardenNote> => {
  const { data, error } = await supabase
    .from('garden_notes')
    .insert(note)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateNote = async (id: number, note: Partial<GardenNote>): Promise<GardenNote> => {
  const { data, error } = await supabase
    .from('garden_notes')
    .update(note)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const createConnection = async (connection: Omit<Connection, 'id'>): Promise<Connection> => {
  const { data, error } = await supabase
    .from('garden_connections')
    .insert(connection)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
