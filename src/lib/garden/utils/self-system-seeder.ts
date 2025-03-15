
import { createSystem, createSystemModelRelation, getSystems } from '@/lib/garden/api';
import { System } from '@/lib/garden/types';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

// Content sections from About page
export interface SelfContent {
  identity: string;
  thinking: string;
  doing: string;
  livelihood: string;
  experiencing?: string;
  perception?: string;
}

// Default self content from About page
const defaultSelfContent: SelfContent = {
  identity: "The Tangled Mess of Identity - A chaotic, interconnected web of ideas, questions, and occasional insights that form what others might call 'me'.",
  thinking: "I find comfort in the contradiction between wanting to understand everything and recognizing that complete understanding is impossible.",
  doing: "My life involves meditation and movement practices inspired by embodied cognition, reading extensively, writing notes and articles, and building digital products.",
  livelihood: "I've studied law, discovered entrepreneurship, launched various ventures, worked as a venture analyst, and now work as a software engineer in startup environments.",
  experiencing: "How I perceive and process the events and sensations that shape my reality",
  perception: "The mental image others form of me, their expectations, judgments, and understanding"
};

// Create a self system with the given content
export const createSelfSystem = async (
  content: SelfContent = defaultSelfContent,
  relatedModelIds: string[] = []
): Promise<System | null> => {
  try {
    // Check if a self system already exists
    const existingSystems = await getSystems();
    const existingSelfSystem = existingSystems.find(system => system.isSelf);
    
    if (existingSelfSystem) {
      console.log('Self system already exists:', existingSelfSystem);
      toast.info('Self system already exists');
      return existingSelfSystem;
    }
    
    // Create new self system
    const selfSystem = await createSystem({
      name: 'Self',
      description: `${content.identity}\n\n${content.thinking}\n\n${content.doing}\n\n${content.livelihood}`,
      category: 'personal',
      importanceLevel: 5,
      visibility: 'public',
      relatedModels: relatedModelIds,
      isSelf: true,
      color: '#6366f1', // Indigo
      icon: 'user'
    });
    
    // Create related system for experiences
    const experiencesSystem = await createSystem({
      name: 'My Experiences',
      description: content.experiencing || 'How I perceive and process the events and sensations that shape my reality',
      category: 'cognitive',
      importanceLevel: 4,
      visibility: 'public',
      relatedModels: [],
      isSelf: false,
      color: '#ec4899', // Pink
      icon: 'activity'
    });
    
    // Create related system for how others perceive me
    const perceptionSystem = await createSystem({
      name: 'How Others See Me',
      description: content.perception || 'The mental image others form of me, their expectations, judgments, and understanding',
      category: 'social',
      importanceLevel: 3,
      visibility: 'public',
      relatedModels: [],
      isSelf: false,
      color: '#8b5cf6', // Purple
      icon: 'eye'
    });
    
    // Create relationships between models and systems if any
    for (const modelId of relatedModelIds) {
      try {
        await createSystemModelRelation({
          systemId: selfSystem.id,
          modelId,
          relationshipType: 'contains',
          strength: 8
        });
      } catch (error) {
        console.error('Error creating relation between self system and model:', error);
      }
    }
    
    toast.success('Self system created successfully');
    return selfSystem;
  } catch (error) {
    console.error('Error creating self system:', error);
    toast.error('Failed to create self system');
    return null;
  }
};

// Extract self content from HTML or markdown
export const extractSelfContent = (contentHtml: string): SelfContent => {
  // This is a simple extraction, could be enhanced with a parser
  const sections: SelfContent = {
    identity: '',
    thinking: '',
    doing: '',
    livelihood: '',
    experiencing: '',
    perception: ''
  };
  
  // Simple regex to extract content between headings
  const identityMatch = contentHtml.match(/<h2[^>]*>The Tangled Mess of Identity<\/h2>([\s\S]*?)<h2/);
  const thinkingMatch = contentHtml.match(/<h2[^>]*>What I Think<\/h2>([\s\S]*?)<h2/);
  const doingMatch = contentHtml.match(/<h2[^>]*>What I Do<\/h2>([\s\S]*?)<h2/);
  const livelihoodMatch = contentHtml.match(/<h2[^>]*>What I Do for a Living<\/h2>([\s\S]*?)<h2/);
  
  if (identityMatch) sections.identity = identityMatch[1].replace(/<[^>]*>/g, '').trim();
  if (thinkingMatch) sections.thinking = thinkingMatch[1].replace(/<[^>]*>/g, '').trim();
  if (doingMatch) sections.doing = doingMatch[1].replace(/<[^>]*>/g, '').trim();
  if (livelihoodMatch) sections.livelihood = livelihoodMatch[1].replace(/<[^>]*>/g, '').trim();
  
  return sections;
};
