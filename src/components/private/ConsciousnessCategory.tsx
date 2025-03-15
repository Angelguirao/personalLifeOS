
import React from 'react';
import { ConsciousnessBubbleData } from './consciousnessBubblesData';
import ConsciousnessBubble from './ConsciousnessBubble';
import { cn } from '@/lib/utils';

interface ConsciousnessCategoryProps {
  title: string;
  bubbles: ConsciousnessBubbleData[];
}

const getCategoryColor = (title: string) => {
  const colorMap: Record<string, string> = {
    'Self & Personal Identity': 'text-purple-500',
    'Directedness & Awareness': 'text-blue-500',
    'Temporality': 'text-amber-500',
    'Qualia & Cognitive Content': 'text-pink-500',
    'Change vs. Stability': 'text-green-500',
    'Internal vs. External Awareness': 'text-indigo-500',
    'Agency & Free Will': 'text-red-500',
  };
  
  return colorMap[title] || 'text-primary';
};

const ConsciousnessCategory = ({ title, bubbles }: ConsciousnessCategoryProps) => {
  const categoryColor = getCategoryColor(title);
  
  return (
    <div className="mb-8 animate-fade-in animation-delay-300">
      <div className="mb-6">
        <h3 className={cn("text-xl font-bold mb-2", categoryColor)}>{title}</h3>
        <div className="h-1 w-16 bg-gradient-to-r from-primary/50 to-transparent rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
