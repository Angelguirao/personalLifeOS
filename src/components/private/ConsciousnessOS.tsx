
import React from 'react';
import { getBubblesByCategory } from './consciousnessBubblesData';
import BlurEffect from '@/components/ui/BlurEffect';
import ConsciousnessCategory from './ConsciousnessCategory';

const ConsciousnessOS = () => {
  const categorizedBubbles = getBubblesByCategory();
  const categories = Object.keys(categorizedBubbles);

  return (
    <section id="consciousness-os" className="py-20 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-100/30 -top-64 -right-64 blur-3xl pointer-events-none"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-100/20 bottom-32 -left-32 blur-3xl pointer-events-none"></div>
      
      <div className="container-wide relative">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="heading-lg">Consciousness OS</h2>
            <p className="body-md text-muted-foreground">
              Your personal framework for understanding and navigating consciousness.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>Each category represents a dimension of conscious experience you can explore and optimize.</p>
            </div>
          </div>
          
          <BlurEffect className="w-full">
            <div className="space-y-16">
              {categories.map((category) => (
                <ConsciousnessCategory 
                  key={category}
                  title={category}
                  bubbles={categorizedBubbles[category]}
                />
              ))}
            </div>
          </BlurEffect>
        </div>
      </div>
    </section>
  );
};

export default ConsciousnessOS;
