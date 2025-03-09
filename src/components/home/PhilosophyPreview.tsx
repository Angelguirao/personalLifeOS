
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PhilosophyCardProps {
  title: string;
  description: string;
  className?: string;
}

const PhilosophyCard = ({ title, description, className }: PhilosophyCardProps) => (
  <div className={cn("glass p-6 flex flex-col h-full", className)}>
    <h3 className="font-serif text-lg font-semibold mb-3">{title}</h3>
    <p className="text-sm text-muted-foreground flex-grow">{description}</p>
  </div>
);

const PhilosophyPreview = () => {
  return (
    <section id="philosophy-preview" className="py-20 relative">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-6 lg:col-span-1">
            <h2 className="heading-lg">Philosophy of Life</h2>
            <p className="body-md text-muted-foreground">
              My philosophical framework guides how I interact with the world, balancing skepticism with pragmatism, embracing complexity, and seeking meaningful connection.
            </p>
            <Link 
              to="/philosophy" 
              className="inline-flex items-center text-sm font-medium hover:underline group"
            >
              Explore in depth
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <PhilosophyCard 
                title="Metaphysical View" 
                description="I adopt an agnostic, pragmatically idealist stance, considering that information or consciousness might be fundamental to reality while embracing uncertainty and complexity."
              />
              <PhilosophyCard 
                title="Epistemological Stance" 
                description="I align with skepticism, viewing ultimate truth as largely socially constructed, while upholding that contextual, pragmatic, and defensible truths should guide our interactions."
                className="md:translate-y-4"
              />
              <PhilosophyCard 
                title="Ethical Framework" 
                description="My stance is relativistic, recognizing moral frameworks as diverse and context-dependent, prioritizing empathy, understanding, and meaningful dialogue across varied experiences."
              />
              <PhilosophyCard 
                title="Aesthetic Approach" 
                description="I cherish beauty in complexity, finding awe in ordinary moments and subtle intricacies of everyday life, encouraging broad, interdisciplinary appreciation of the world."
                className="md:translate-y-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophyPreview;
