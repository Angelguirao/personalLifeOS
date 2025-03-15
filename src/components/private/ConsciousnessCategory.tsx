
import React from 'react';
import { ConsciousnessBubbleData } from './consciousnessBubblesData';
import ConsciousnessBubble from './ConsciousnessBubble';

interface ConsciousnessCategoryProps {
  title: string;
  bubbles: ConsciousnessBubbleData[];
}

const ConsciousnessCategory = ({ title, bubbles }: ConsciousnessCategoryProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-3 text-primary/80">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bubbles.map((bubble) => (
          <ConsciousnessBubble
            key={bubble.id}
            title={bubble.title}
            description={bubble.description}
            icon={bubble.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default ConsciousnessCategory;
