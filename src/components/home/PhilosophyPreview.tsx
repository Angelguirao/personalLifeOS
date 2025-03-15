
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Atom, Brain, HeartHandshake, Flag, Palette, 
  Focus, Target, Eye, MountainSnow, Compass, PlayCircle, Clock,
  Hourglass, Lightbulb, Bookmark, Calendar, Activity, Repeat,
  Map, Heart, Globe, Cloud, Layers
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useAuth } from '@/hooks/useAuth';

interface PhilosophyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const PhilosophyCard = ({ title, description, icon, className }: PhilosophyCardProps) => (
  <div className={cn("glass p-6 flex flex-col h-full hover:shadow-md transition-all duration-300 group", className)}>
    <div className="flex items-center gap-3 mb-3">
      <div className="text-primary/80 group-hover:text-primary transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-serif text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">{description}</p>
  </div>
);

const ConsciousnessCard = ({ title, description, icon, className }: PhilosophyCardProps) => (
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

const PhilosophyPreview = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section id="philosophy-preview" className="py-20 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-100/30 -top-64 -right-64 blur-3xl pointer-events-none"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-100/20 bottom-32 -left-32 blur-3xl pointer-events-none"></div>
      
      <div className="container-wide relative">
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            <h2 className="heading-lg">
              {isAuthenticated ? "Consciousness OS" : "Philosophy"}
            </h2>
            <p className="body-md text-muted-foreground">
              {isAuthenticated 
                ? "Your personal framework for understanding and navigating consciousness."
                : "My philosophical framework guides how I interact with the world."
              }
            </p>
            {isAuthenticated ? (
              <div className="text-sm text-muted-foreground">
                <p>Each bubble represents a dimension of conscious experience you can explore and optimize.</p>
              </div>
            ) : (
              <Link 
                to="/philosophy"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline group py-1"
                onClick={() => window.scrollTo(0, 0)}
              >
                Explore in depth
                <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
          
          <div className="w-full">
            {/* Conditional rendering based on authentication */}
            {isAuthenticated ? (
              // Consciousness bubbles for authenticated user
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ConsciousnessCard 
                  title="Self" 
                  description="The sense of a distinct, enduring 'I' with personal identity"
                  icon={<Compass size={20} />}
                />
                <ConsciousnessCard 
                  title="Directedness" 
                  description="The 'aboutness' of mental states, i.e., thoughts and perceptions aimed at objects or ideas"
                  icon={<Target size={20} />}
                />
                <ConsciousnessCard 
                  title="Focus/Attention" 
                  description="How consciousness selects and holds objects of awareness"
                  icon={<Focus size={20} />}
                />
                <ConsciousnessCard 
                  title="No-Self" 
                  description="Experiences where boundaries dissolve, as found in certain meditative or nondual states"
                  icon={<MountainSnow size={20} />}
                />
                <ConsciousnessCard 
                  title="Free-Will" 
                  description="Deliberate, self-directed actions and choices"
                  icon={<Compass size={20} />}
                />
                <ConsciousnessCard 
                  title="Passive Reception" 
                  description="The experience of being acted upon or absorbing experiences without directed intervention"
                  icon={<PlayCircle size={20} />}
                />
                <ConsciousnessCard 
                  title="Past" 
                  description="Memory, history, retrospection"
                  icon={<Clock size={20} />}
                />
                <ConsciousnessCard 
                  title="Present" 
                  description="Immediate awareness, moment-to-moment experience"
                  icon={<Hourglass size={20} />}
                />
                <ConsciousnessCard 
                  title="Qualia" 
                  description="The raw sensory and emotional 'feel' of experiences"
                  icon={<Lightbulb size={20} />}
                />
                <ConsciousnessCard 
                  title="Cognitive Content" 
                  description="Abstract thought, language, and conceptual frameworks that interpret qualia"
                  icon={<Bookmark size={20} />}
                />
                <ConsciousnessCard 
                  title="Future" 
                  description="Anticipation, planning, projection"
                  icon={<Calendar size={20} />}
                />
                <ConsciousnessCard 
                  title="Stasis/Constancy" 
                  description="States of equilibrium or persistence"
                  icon={<Activity size={20} />}
                />
                <ConsciousnessCard 
                  title="Flux/Change" 
                  description="Processes of transformation, evolution, or movement in thought and experience"
                  icon={<Repeat size={20} />}
                />
                <ConsciousnessCard 
                  title="Internal" 
                  description="The felt 'inner landscape' of imagination, mind's eye, and subjective boundaries"
                  icon={<Map size={20} />}
                />
                <ConsciousnessCard 
                  title="Bodily Awareness" 
                  description="Sensations and perceptions rooted in physicality"
                  icon={<Heart size={20} />}
                />
                <ConsciousnessCard 
                  title="External" 
                  description="Perception of the physical environment, location, and relational context"
                  icon={<Globe size={20} />}
                />
                <ConsciousnessCard 
                  title="Disembodied" 
                  description="States where consciousness feels less tied to physical form (e.g., during deep meditation or dream states)"
                  icon={<Cloud size={20} />}
                />
                <ConsciousnessCard 
                  title="Boundary Perception" 
                  description="The interface between self and non-self, interiority and exteriority"
                  icon={<Layers size={20} />}
                />
              </div>
            ) : (
              // Original philosophy cards for public users
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <PhilosophyCard 
                  title="Metaphysics" 
                  description="Information and consciousness as fundamental aspects of reality, embracing complexity with an agnostic, pragmatic stance."
                  icon={<Atom size={20} />}
                />
                <PhilosophyCard 
                  title="Epistemology" 
                  description="Embracing skepticism while recognizing that contextual, pragmatic truths should guide our interactions."
                  icon={<Brain size={20} />}
                />
                <PhilosophyCard 
                  title="Ethics" 
                  description="Relativistic approach prioritizing empathy and meaningful dialogue across diverse moral frameworks."
                  icon={<HeartHandshake size={20} />}
                />
                <PhilosophyCard 
                  title="Politics" 
                  description="Advocating for liberal ideals with libertarian influence, emphasizing freedom, dignity, and conditions that promote human flourishing."
                  icon={<Flag size={20} />}
                />
                <PhilosophyCard 
                  title="Aesthetics" 
                  description="Finding beauty in complexity and everyday moments, encouraging interdisciplinary appreciation of the world."
                  icon={<Palette size={20} />}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophyPreview;
