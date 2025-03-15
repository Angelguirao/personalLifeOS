
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ConsciousnessBubbleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ConsciousnessBubble = ({ title, description, icon }: ConsciousnessBubbleProps) => {
  const isSelfBubble = title === 'Self';
  
  const bubbleVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.03, transition: { duration: 0.2 } }
  };
  
  const BubbleContent = () => (
    <motion.div 
      className="p-6 bg-card/80 backdrop-blur-sm border border-border rounded-lg transition-all duration-300 hover:shadow-lg hover:border-primary/40 group"
      variants={bubbleVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-lg text-primary">
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="font-medium text-base group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
  
  return isSelfBubble ? (
    <Link to="/about" className={cn("block", isSelfBubble && "cursor-pointer")}>
      <BubbleContent />
    </Link>
  ) : (
    <div>
      <BubbleContent />
    </div>
  );
};

export default ConsciousnessBubble;
