import { createClient } from '@supabase/supabase-js';

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

// Temporary hardcoded data as fallback
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

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to transform data from Supabase to match our interfaces
const transformNoteFromSupabase = (data: any): GardenNote => {
  return {
    id: data.id,
    title: data.title,
    summary: data.summary,
    fullContent: data.full_content,
    stage: data.stage,
    lastUpdated: data.last_updated,
    connections: data.connections || [],
    bookInfo: data.book_info
  };
};

// Helper function to transform data to Supabase format
const transformNoteToSupabase = (note: Omit<GardenNote, 'id'>) => {
  return {
    title: note.title,
    summary: note.summary,
    full_content: note.fullContent,
    stage: note.stage,
    last_updated: note.lastUpdated,
    connections: note.connections || [],
    book_info: note.bookInfo
  };
};

export const getNotes = async (): Promise<GardenNote[]> => {
  console.log('Fetching notes from Supabase...');
  try {
    const { data, error } = await supabase
      .from('garden_notes')
      .select('*');
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Supabase notes data:', data);
    
    if (!data || data.length === 0) {
      console.log('No notes found in Supabase, using fallback data');
      // If the table exists but has no data, seed it with our sample data
      await seedInitialData();
      return gardenNotes;
    }
    
    return data.map(transformNoteFromSupabase);
  } catch (error) {
    console.error('Error fetching notes:', error);
    // Fallback to the sample data if there's an error
    return gardenNotes;
  }
};

export const getConnections = async (): Promise<Connection[]> => {
  console.log('Fetching connections from Supabase...');
  try {
    const { data, error } = await supabase
      .from('garden_connections')
      .select('*');
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Supabase connections data:', data);
    
    if (!data || data.length === 0) {
      console.log('No connections found in Supabase, using fallback data');
      return gardenConnections;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching connections:', error);
    // Fallback to the sample data if there's an error
    return gardenConnections;
  }
};

// Seed initial data into Supabase if tables are empty
const seedInitialData = async () => {
  console.log('Seeding initial data to Supabase...');
  
  try {
    // First, insert notes
    const notesData = gardenNotes.map(note => ({
      title: note.title,
      summary: note.summary,
      full_content: note.fullContent,
      stage: note.stage,
      last_updated: note.lastUpdated,
      connections: note.connections,
      book_info: note.bookInfo
    }));
    
    const { error: notesError } = await supabase
      .from('garden_notes')
      .insert(notesData);
    
    if (notesError) {
      console.error('Error seeding notes:', notesError);
      return;
    }
    
    // Then, insert connections
    const { error: connectionsError } = await supabase
      .from('garden_connections')
      .insert(gardenConnections);
    
    if (connectionsError) {
      console.error('Error seeding connections:', connectionsError);
      return;
    }
    
    console.log('Initial data seeded successfully');
  } catch (error) {
    console.error('Error during seeding process:', error);
  }
};

export const getNoteById = async (id: number): Promise<GardenNote | undefined> => {
  try {
    const { data, error } = await supabase
      .from('garden_notes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data ? transformNoteFromSupabase(data) : undefined;
  } catch (error) {
    console.error('Error fetching note by id:', error);
    // Fallback to finding the note in the sample data
    return gardenNotes.find(note => note.id === id);
  }
};

export const createNote = async (note: Omit<GardenNote, 'id'>): Promise<GardenNote> => {
  const supabaseNote = transformNoteToSupabase(note);
  
  const { data, error } = await supabase
    .from('garden_notes')
    .insert(supabaseNote)
    .select()
    .single();
  
  if (error) throw error;
  return transformNoteFromSupabase(data);
};

export const updateNote = async (id: number, note: Partial<GardenNote>): Promise<GardenNote> => {
  const supabaseNote: any = {};
  
  if (note.title) supabaseNote.title = note.title;
  if (note.summary) supabaseNote.summary = note.summary;
  if (note.fullContent) supabaseNote.full_content = note.fullContent;
  if (note.stage) supabaseNote.stage = note.stage;
  if (note.lastUpdated) supabaseNote.last_updated = note.lastUpdated;
  if (note.connections) supabaseNote.connections = note.connections;
  if (note.bookInfo) supabaseNote.book_info = note.bookInfo;
  
  const { data, error } = await supabase
    .from('garden_notes')
    .update(supabaseNote)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return transformNoteFromSupabase(data);
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
