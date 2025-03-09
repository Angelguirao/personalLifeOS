
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlurEffect from '../ui/BlurEffect';

const AboutPreview = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <BlurEffect>
              <div className="relative group">
                <div className="aspect-square overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl">
                  <img 
                    src="/lovable-uploads/2da07e1c-3347-4f46-a181-e87596b5e596.png" 
                    alt="Illustration of a person with tangled thoughts" 
                    className="w-full h-full object-contain bg-white/5 transition-transform duration-500 group-hover:scale-105"
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
                className="inline-flex items-center px-5 py-2.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors group"
                onClick={() => window.scrollTo(0, 0)}
              >
                Learn more about "me" 
                <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
