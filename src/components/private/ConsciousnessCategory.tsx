
import React from 'react';
import { ConsciousnessBubbleData } from './consciousnessBubblesData';
import ConsciousnessBubble from './ConsciousnessBubble';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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

const getBorderColor = (title: string) => {
  const colorMap: Record<string, string> = {
    'Self & Personal Identity': 'from-purple-500/50',
    'Directedness & Awareness': 'from-blue-500/50',
    'Temporality': 'from-amber-500/50',
    'Qualia & Cognitive Content': 'from-pink-500/50',
    'Change vs. Stability': 'from-green-500/50',
    'Internal vs. External Awareness': 'from-indigo-500/50',
    'Agency & Free Will': 'from-red-500/50',
  };
  
  return colorMap[title] || 'from-primary/50';
};

const ConsciousnessCategory = ({ title, bubbles }: ConsciousnessCategoryProps) => {
  const categoryColor = getCategoryColor(title);
  const borderColor = getBorderColor(title);
  
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <motion.div 
      className="mb-12"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      viewport={{ once: true }}
    >
      <div className="mb-6">
        <h3 className={cn("text-xl font-bold mb-2", categoryColor)}>{title}</h3>
        <div className={cn("h-1 w-16 bg-gradient-to-r rounded-full", borderColor, "to-transparent")}></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {bubbles.map((bubble) => (
          <div key={bubble.id} className="h-full">
            <ConsciousnessBubble
              title={bubble.title}
              description={bubble.description}
              icon={bubble.icon}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ConsciousnessCategory;
