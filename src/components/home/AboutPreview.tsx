
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlurEffect from '../ui/BlurEffect';

const AboutPreview = () => {
  return (
    <section className="py-20">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <BlurEffect>
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img 
                    src="/lovable-uploads/2da07e1c-3347-4f46-a181-e87596b5e596.png" 
                    alt="Illustration of a person with tangled thoughts" 
                    className="w-full h-full object-contain bg-white/5"
                  />
                </div>
              </div>
            </BlurEffect>
          </div>
          
          <div className="lg:w-1/2 space-y-6 order-1 lg:order-2">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">About Me</p>
            <h2 className="heading-lg">About</h2>
            <p className="body-md text-muted-foreground">
              This is usually the part where I'd neatly weave together a narrative about how my life experiences have shaped my beliefs, my intellectual journey, or perhaps even my personal brand. But truthfully, I'm not entirely sure what "I" even means—if there's a fixed self or just an ever-changing collection of experiences.
            </p>
            <p className="body-md text-muted-foreground">
              Maybe Aristotle had a point when he said we are what we repeatedly do, but then again, what I do keeps changing. For now, I spend most of my time thinking, writing human language as notes and articles, and machine language in the form of software.
            </p>
            <p className="body-md text-muted-foreground">
              The tangled mess above probably captures my true self far better than any polished biography could.
            </p>
            <div className="pt-4">
              <Link 
                to="/about" 
                className="inline-flex items-center text-sm font-medium hover:underline group"
              >
                Learn more about me (or whatever "me" means)
                <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
