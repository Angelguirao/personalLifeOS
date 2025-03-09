
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout } from 'lucide-react';
import RevealText from '../ui/RevealText';

const GardenPreview = () => {
  return (
    <section className="py-20">
      <div className="container-narrow">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
              <Sprout size={12} className="mr-1" />
              Philosophy & Ethics
            </div>
          </div>
          
          <RevealText>
            <h2 className="heading-lg mb-6">Digital Garden</h2>
          </RevealText>
          
          <div className="mb-4">
            <p className="text-sm uppercase tracking-wider text-muted-foreground font-medium">Philosophical Explorations</p>
          </div>
          
          <p className="body-md text-muted-foreground mb-8 max-w-2xl">
            A collection of philosophical reflections on ethics, consciousness, and what it means to be human. These seedling ideas evolve over time as I continue to explore complex questions about our existence.
          </p>
          
          <Link 
            to="/garden" 
            className="inline-flex items-center text-sm font-medium text-primary hover:underline group"
            onClick={() => window.scrollTo(0, 0)}
          >
            Explore the garden
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GardenPreview;
