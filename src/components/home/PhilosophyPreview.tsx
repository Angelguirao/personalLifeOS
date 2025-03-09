
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
    <h3 className="font-serif text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <PhilosophyCard 
                title="Metaphysical View" 
                description="Information and consciousness as fundamental aspects of reality, embracing complexity with an agnostic, pragmatic stance."
              />
              <PhilosophyCard 
                title="Epistemological Stance" 
                description="Embracing skepticism while recognizing that contextual, pragmatic truths should guide our interactions."
              />
              <PhilosophyCard 
                title="Ethical Framework" 
                description="Relativistic approach prioritizing empathy and meaningful dialogue across diverse moral frameworks."
              />
              <PhilosophyCard 
                title="Political Stance" 
                description="Advocating for discourse-based governance that balances individual rights with collective well-being and ecological responsibility."
              />
              <PhilosophyCard 
                title="Aesthetic Approach" 
                description="Finding beauty in complexity and everyday moments, encouraging interdisciplinary appreciation of the world."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophyPreview;
