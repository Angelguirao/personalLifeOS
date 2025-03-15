
import React from 'react';
import { 
  Compass, Target, Focus, MountainSnow, 
  PlayCircle, Clock, Hourglass, Lightbulb, Bookmark, 
  Calendar, Activity, Repeat, Map, Heart, 
  Globe, Cloud, Layers
} from 'lucide-react';

export interface ConsciousnessBubbleData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const consciousnessBubblesData: ConsciousnessBubbleData[] = [
  {
    id: 'self',
    title: 'Self',
    description: "The sense of a distinct, enduring 'I' with personal identity",
    icon: <Compass size={20} />
  },
  {
    id: 'directedness',
    title: 'Directedness',
    description: "The 'aboutness' of mental states, i.e., thoughts and perceptions aimed at objects or ideas",
    icon: <Target size={20} />
  },
  {
    id: 'focus',
    title: 'Focus/Attention',
    description: "How consciousness selects and holds objects of awareness",
    icon: <Focus size={20} />
  },
  {
    id: 'no-self',
    title: 'No-Self',
    description: "Experiences where boundaries dissolve, as found in certain meditative or nondual states",
    icon: <MountainSnow size={20} />
  },
  {
    id: 'free-will',
    title: 'Free-Will',
    description: "Deliberate, self-directed actions and choices",
    icon: <Compass size={20} />
  },
  {
    id: 'passive-reception',
    title: 'Passive Reception',
    description: "The experience of being acted upon or absorbing experiences without directed intervention",
    icon: <PlayCircle size={20} />
  },
  {
    id: 'past',
    title: 'Past',
    description: "Memory, history, retrospection",
    icon: <Clock size={20} />
  },
  {
    id: 'present',
    title: 'Present',
    description: "Immediate awareness, moment-to-moment experience",
    icon: <Hourglass size={20} />
  },
  {
    id: 'qualia',
    title: 'Qualia',
    description: "The raw sensory and emotional 'feel' of experiences",
    icon: <Lightbulb size={20} />
  },
  {
    id: 'cognitive-content',
    title: 'Cognitive Content',
    description: "Abstract thought, language, and conceptual frameworks that interpret qualia",
    icon: <Bookmark size={20} />
  },
  {
    id: 'future',
    title: 'Future',
    description: "Anticipation, planning, projection",
    icon: <Calendar size={20} />
  },
  {
    id: 'stasis',
    title: 'Stasis/Constancy',
    description: "States of equilibrium or persistence",
    icon: <Activity size={20} />
  },
  {
    id: 'flux',
    title: 'Flux/Change',
    description: "Processes of transformation, evolution, or movement in thought and experience",
    icon: <Repeat size={20} />
  },
  {
    id: 'internal',
    title: 'Internal',
    description: "The felt 'inner landscape' of imagination, mind's eye, and subjective boundaries",
    icon: <Map size={20} />
  },
  {
    id: 'bodily-awareness',
    title: 'Bodily Awareness',
    description: "Sensations and perceptions rooted in physicality",
    icon: <Heart size={20} />
  },
  {
    id: 'external',
    title: 'External',
    description: "Perception of the physical environment, location, and relational context",
    icon: <Globe size={20} />
  },
  {
    id: 'disembodied',
    title: 'Disembodied',
    description: "States where consciousness feels less tied to physical form (e.g., during deep meditation or dream states)",
    icon: <Cloud size={20} />
  },
  {
    id: 'boundary-perception',
    title: 'Boundary Perception',
    description: "The interface between self and non-self, interiority and exteriority",
    icon: <Layers size={20} />
  },
];

export default consciousnessBubblesData;
