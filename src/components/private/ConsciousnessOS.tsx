
import React from 'react';
import { getBubblesByCategory } from './consciousnessBubblesData';
import BlurEffect from '@/components/ui/BlurEffect';
import ConsciousnessCategory from './ConsciousnessCategory';
import { Button } from '@/components/ui/button';
import { SparklesIcon, BookIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const ConsciousnessOS = () => {
  const categorizedBubbles = getBubblesByCategory();
  const categories = Object.keys(categorizedBubbles);

  return (
    <section id="consciousness-os" className="py-24 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-400/5 -top-64 -right-64 blur-3xl pointer-events-none"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-300/10 bottom-32 -left-32 blur-3xl pointer-events-none"></div>
      <div className="absolute w-[200px] h-[200px] rounded-full bg-pink-200/10 top-1/2 right-1/4 blur-2xl pointer-events-none opacity-70"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-amber-200/10 bottom-20 right-20 blur-2xl pointer-events-none opacity-50"></div>
      
      <div className="container-wide relative z-10">
        <div className="space-y-16 max-w-5xl mx-auto">
          <motion.div 
            className="space-y-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center p-1.5 px-4 rounded-full bg-primary/10 text-primary mb-4">
              <SparklesIcon size={16} className="mr-2" />
              <span className="text-sm font-medium">Life Operating System</span>
            </div>
            
            <h2 className="heading-lg">Consciousness OS</h2>
            <p className="body-md text-muted-foreground max-w-2xl mx-auto">
              Your personal framework for understanding and navigating consciousness.
              Each category represents a dimension of conscious experience you can explore and optimize.
            </p>
            
            <div className="flex justify-center pt-6">
              <Button 
                variant="outline" 
                className="bg-card/80 backdrop-blur-sm hover:bg-card/90 group"
                size="lg"
              >
                <BookIcon size={16} className="mr-2 group-hover:text-primary transition-colors" />
                <span>Learn more about this framework</span>
              </Button>
            </div>
          </motion.div>
          
          <BlurEffect className="w-full">
            <Card className="border-none shadow-lg bg-card/70 backdrop-blur-md p-8">
              <div className="grid grid-cols-1 gap-16">
                {categories.map((category) => (
                  <ConsciousnessCategory 
                    key={category}
                    title={category}
                    bubbles={categorizedBubbles[category]}
                  />
                ))}
              </div>
            </Card>
          </BlurEffect>
        </div>
      </div>
    </section>
  );
};

export default ConsciousnessOS;
