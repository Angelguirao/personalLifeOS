
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
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80" 
                    alt="Angel Guirao" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-background rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80" 
                    alt="Exploring nature" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </BlurEffect>
          </div>
          
          <div className="lg:w-1/2 space-y-6 order-1 lg:order-2">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">About Me</p>
            <h2 className="heading-lg">Angel Guirao</h2>
            <p className="body-md text-muted-foreground">
              I'm a philosopher, solopreneur, and interdisciplinary thinker dedicated to pursuing information as a means of connecting deeply and meaningfully with the world around me.
            </p>
            <p className="body-md text-muted-foreground">
              My intellectual journey began with a fascination for how complex systems emerge from simple rules, leading me to explore fields ranging from computer science to philosophy, ethics to machine learning, and economics to aesthetics.
            </p>
            <div className="pt-4">
              <Link 
                to="/about" 
                className="inline-flex items-center text-sm font-medium hover:underline group"
              >
                Learn more about me
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
