
import React from 'react';
import { 
  Compass, Target, Focus, MountainSnow, 
  PlayCircle, Clock, Hourglass, Lightbulb, Bookmark, 
  Calendar, Activity, Repeat, Map, Heart, 
  Globe, Cloud, Layers
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface ConsciousnessBubbleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const ConsciousnessBubble = ({ title, description, icon, className }: ConsciousnessBubbleProps) => (
  <div className={cn("glass p-6 flex flex-col h-full hover:shadow-md transition-all duration-300 group border-l-4 border-primary/50", className)}>
    <div className="flex items-center gap-3 mb-3">
      <div className="text-primary/80 group-hover:text-primary transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-serif text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">{description}</p>
  </div>
);

const ConsciousnessOS = () => {
  return (
    <section id="consciousness-os" className="py-20 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-100/30 -top-64 -right-64 blur-3xl pointer-events-none"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-100/20 bottom-32 -left-32 blur-3xl pointer-events-none"></div>
      
      <div className="container-wide relative">
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            <h2 className="heading-lg">Consciousness OS</h2>
            <p className="body-md text-muted-foreground">
              Your personal framework for understanding and navigating consciousness.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>Each bubble represents a dimension of conscious experience you can explore and optimize.</p>
            </div>
          </div>
          
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ConsciousnessBubble 
                title="Self" 
                description="The sense of a distinct, enduring 'I' with personal identity"
                icon={<Compass size={20} />}
              />
              <ConsciousnessBubble 
                title="Directedness" 
                description="The 'aboutness' of mental states, i.e., thoughts and perceptions aimed at objects or ideas"
                icon={<Target size={20} />}
              />
              <ConsciousnessBubble 
                title="Focus/Attention" 
                description="How consciousness selects and holds objects of awareness"
                icon={<Focus size={20} />}
              />
              <ConsciousnessBubble 
                title="No-Self" 
                description="Experiences where boundaries dissolve, as found in certain meditative or nondual states"
                icon={<MountainSnow size={20} />}
              />
              <ConsciousnessBubble 
                title="Free-Will" 
                description="Deliberate, self-directed actions and choices"
                icon={<Compass size={20} />}
              />
              <ConsciousnessBubble 
                title="Passive Reception" 
                description="The experience of being acted upon or absorbing experiences without directed intervention"
                icon={<PlayCircle size={20} />}
              />
              <ConsciousnessBubble 
                title="Past" 
                description="Memory, history, retrospection"
                icon={<Clock size={20} />}
              />
              <ConsciousnessBubble 
                title="Present" 
                description="Immediate awareness, moment-to-moment experience"
                icon={<Hourglass size={20} />}
              />
              <ConsciousnessBubble 
                title="Qualia" 
                description="The raw sensory and emotional 'feel' of experiences"
                icon={<Lightbulb size={20} />}
              />
              <ConsciousnessBubble 
                title="Cognitive Content" 
                description="Abstract thought, language, and conceptual frameworks that interpret qualia"
                icon={<Bookmark size={20} />}
              />
              <ConsciousnessBubble 
                title="Future" 
                description="Anticipation, planning, projection"
                icon={<Calendar size={20} />}
              />
              <ConsciousnessBubble 
                title="Stasis/Constancy" 
                description="States of equilibrium or persistence"
                icon={<Activity size={20} />}
              />
              <ConsciousnessBubble 
                title="Flux/Change" 
                description="Processes of transformation, evolution, or movement in thought and experience"
                icon={<Repeat size={20} />}
              />
              <ConsciousnessBubble 
                title="Internal" 
                description="The felt 'inner landscape' of imagination, mind's eye, and subjective boundaries"
                icon={<Map size={20} />}
              />
              <ConsciousnessBubble 
                title="Bodily Awareness" 
                description="Sensations and perceptions rooted in physicality"
                icon={<Heart size={20} />}
              />
              <ConsciousnessBubble 
                title="External" 
                description="Perception of the physical environment, location, and relational context"
                icon={<Globe size={20} />}
              />
              <ConsciousnessBubble 
                title="Disembodied" 
                description="States where consciousness feels less tied to physical form (e.g., during deep meditation or dream states)"
                icon={<Cloud size={20} />}
              />
              <ConsciousnessBubble 
                title="Boundary Perception" 
                description="The interface between self and non-self, interiority and exteriority"
                icon={<Layers size={20} />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsciousnessOS;
