
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RevealText from '../ui/RevealText';
import BlurEffect from '../ui/BlurEffect';

const GardenPreview = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-background via-background to-blue-50/10">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-50/5 top-20 -left-64 blur-3xl pointer-events-none"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-50/5 bottom-20 -right-32 blur-3xl pointer-events-none"></div>
      
      <div className="container-narrow relative">
        <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">          
          <div className="md:w-2/3 mx-auto">
            <RevealText>
              <h2 className="heading-lg mb-6">Digital Garden</h2>
            </RevealText>
            
            <div className="mb-4">
              <p className="text-sm uppercase tracking-wider text-muted-foreground font-medium">Non-Linear Exploration</p>
            </div>
            
            <p className="body-md text-muted-foreground mb-8 max-w-2xl">
              Unlike traditional blogs or essays, a digital garden embraces the messiness of thinking in public. 
              Ideas connect in unexpected ways, creating a rich network of concepts that evolve over time.
            </p>
            
            <Link 
              to="/garden" 
              className="inline-flex items-center px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-medium hover:bg-primary/10 transition-colors group"
              onClick={() => window.scrollTo(0, 0)}
            >
              Explore the garden
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GardenPreview;
