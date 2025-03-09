
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Atom, Brain, HeartHandshake, Flag, Palette } from 'lucide-react';
import { cn } from "@/lib/utils";

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

const PhilosophyPreview = () => {
  return (
    <section id="philosophy-preview" className="py-20 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-100/30 -top-64 -right-64 blur-3xl pointer-events-none"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-100/20 bottom-32 -left-32 blur-3xl pointer-events-none"></div>
      
      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-6 lg:col-span-1">
            <h2 className="heading-lg">Philosophy</h2>
            <p className="body-md text-muted-foreground">
              My philosophical framework guides how I interact with the world.
            </p>
            <Link 
              to="/philosophy" 
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline group py-1"
            >
              Explore in depth
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-3 gap-4">
              {/* First row */}
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
              
              {/* Second row */}
              <div className="col-start-2 col-span-2">
                <div className="grid grid-cols-2 gap-4">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophyPreview;
