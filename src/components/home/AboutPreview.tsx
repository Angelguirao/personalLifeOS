
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
            <h2 className="heading-lg">About "Me"</h2>
            <p className="body-md text-muted-foreground">
              The illustration you see represents my thought process better than any crafted biography could—a chaotic, interconnected web of ideas, questions, and occasional insights that somehow form what others might call "me."
            </p>
            <div className="pt-4">
              <Link 
                to="/about" 
                className="inline-flex items-center text-sm font-medium hover:underline group"
                onClick={() => window.scrollTo(0, 0)}
              >
                Learn more about "me" (or whatever "me" means)
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
