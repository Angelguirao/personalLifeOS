
import React from 'react';
import { 
  User, LayersIcon, MountainSnow, 
  Target, Focus, PlayCircle, Clock, Calendar, Hourglass,
  Lightbulb, BookIcon, Activity, Repeat, 
  Map, Heart, Globe, Cloud, Hand
} from 'lucide-react';

export interface ConsciousnessBubbleData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const consciousnessBubblesData: ConsciousnessBubbleData[] = [
  // 1. Self & Personal Identity
  {
    id: 'self',
    title: 'Self',
    description: "The sense of a distinct, enduring 'I' with personal identity",
    icon: <User size={20} />,
    category: "Self & Personal Identity"
  },
  {
    id: 'no-self',
    title: 'No-Self',
    description: "Experiences where boundaries dissolve, as found in certain meditative or nondual states",
    icon: <MountainSnow size={20} />,
    category: "Self & Personal Identity"
  },
  {
    id: 'boundary-perception',
    title: 'Boundary Perception',
    description: "The interface between self and non-self, interiority and exteriority",
    icon: <LayersIcon size={20} />,
    category: "Self & Personal Identity"
  },
  
  // 2. Directedness & Awareness
  {
    id: 'directedness',
    title: 'Directedness',
    description: "The 'aboutness' of mental states, i.e., thoughts and perceptions aimed at objects or ideas",
    icon: <Target size={20} />,
    category: "Directedness & Awareness"
  },
  {
    id: 'focus',
    title: 'Focus/Attention',
    description: "How consciousness selects and holds objects of awareness",
    icon: <Focus size={20} />,
    category: "Directedness & Awareness"
  },
  {
    id: 'passive-reception',
    title: 'Passive Reception',
    description: "The experience of being acted upon or absorbing experiences without directed intervention",
    icon: <PlayCircle size={20} />,
    category: "Directedness & Awareness"
  },
  
  // 3. Temporality
  {
    id: 'past',
    title: 'Past',
    description: "Memory, history, retrospection",
    icon: <Clock size={20} />,
    category: "Temporality"
  },
  {
    id: 'present',
    title: 'Present',
    description: "Immediate awareness, moment-to-moment experience",
    icon: <Hourglass size={20} />,
    category: "Temporality"
  },
  {
    id: 'future',
    title: 'Future',
    description: "Anticipation, planning, projection",
    icon: <Calendar size={20} />,
    category: "Temporality"
  },
  
  // 4. Qualia & Cognitive Content
  {
    id: 'qualia',
    title: 'Qualia',
    description: "The raw sensory and emotional 'feel' of experiences",
    icon: <Lightbulb size={20} />,
    category: "Qualia & Cognitive Content"
  },
  {
    id: 'cognitive-content',
    title: 'Cognitive Content',
    description: "Abstract thought, language, and conceptual frameworks that interpret qualia",
    icon: <BookIcon size={20} />,
    category: "Qualia & Cognitive Content"
  },
  
  // 5. Change vs. Stability
  {
    id: 'stasis',
    title: 'Stasis/Constancy',
    description: "States of equilibrium or persistence",
    icon: <Activity size={20} />,
    category: "Change vs. Stability"
  },
  {
    id: 'flux',
    title: 'Flux/Change',
    description: "Processes of transformation, evolution, or movement in thought and experience",
    icon: <Repeat size={20} />,
    category: "Change vs. Stability"
  },
  
  // 6. Internal vs. External Awareness
  {
    id: 'internal',
    title: 'Internal',
    description: "The felt 'inner landscape' of imagination, mind's eye, and subjective boundaries",
    icon: <Map size={20} />,
    category: "Internal vs. External Awareness"
  },
  {
    id: 'bodily-awareness',
    title: 'Bodily Awareness',
    description: "Sensations and perceptions rooted in physicality",
    icon: <Heart size={20} />,
    category: "Internal vs. External Awareness"
  },
  {
    id: 'external',
    title: 'External',
    description: "Perception of the physical environment, location, and relational context",
    icon: <Globe size={20} />,
    category: "Internal vs. External Awareness"
  },
  {
    id: 'disembodied',
    title: 'Disembodied',
    description: "States where consciousness feels less tied to physical form (e.g., during deep meditation or dream states)",
    icon: <Cloud size={20} />,
    category: "Internal vs. External Awareness"
  },
  
  // 7. Agency & Free Will
  {
    id: 'free-will',
    title: 'Free-Will',
    description: "Deliberate, self-directed actions and choices",
    icon: <Hand size={20} />,
    category: "Agency & Free Will"
  }
];

// Group bubbles by category
export const getBubblesByCategory = () => {
  const categories: Record<string, ConsciousnessBubbleData[]> = {};
  
  consciousnessBubblesData.forEach(bubble => {
    if (!categories[bubble.category]) {
      categories[bubble.category] = [];
    }
    categories[bubble.category].push(bubble);
  });
  
  return categories;
};

export default consciousnessBubblesData;
