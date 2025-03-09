
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
            <h2 className="heading-lg">Angel Guirao</h2>
            <p className="body-md text-muted-foreground">
              Here's where I'm supposed to include a narrative explaining how life experiences shaped my beliefs and intellectual trajectory, where I build meaning, personal branding or whatever.
            </p>
            <p className="body-md text-muted-foreground">
              But I don't even know what I am, if I have a self or whatever. Seems that I'm a human being at least, whatever that means. Maybe I just am what I do as Aristotle says, but that's changing constantly.
            </p>
            <p className="body-md text-muted-foreground">
              I explore fields from philosophy to computer science, not because I have answers, but because I enjoy getting lost in questions. The tangled mess above is probably a more accurate representation of my thoughts than any polished biography.
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
