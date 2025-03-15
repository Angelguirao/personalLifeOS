
import React from 'react';
import ConsciousnessBubble from './ConsciousnessBubble';
import consciousnessBubblesData from './consciousnessBubblesData';
import BlurEffect from '@/components/ui/BlurEffect';

const ConsciousnessOS = () => {
  return (
    <section id="consciousness-os" className="py-20 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-100/30 -top-64 -right-64 blur-3xl pointer-events-none"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-100/20 bottom-32 -left-32 blur-3xl pointer-events-none"></div>
      
      <div className="container-wide relative">
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            <h2 className="heading-lg">Consciousness OS</h2>
            <p className="body-md text-muted-foreground">
              Your personal framework for understanding and navigating consciousness.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>Each bubble represents a dimension of conscious experience you can explore and optimize.</p>
            </div>
          </div>
          
          <BlurEffect className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {consciousnessBubblesData.map((bubble) => (
                <ConsciousnessBubble
                  key={bubble.id}
                  title={bubble.title}
                  description={bubble.description}
                  icon={bubble.icon}
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
