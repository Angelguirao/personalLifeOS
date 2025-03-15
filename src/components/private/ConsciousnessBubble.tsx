
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ConsciousnessBubbleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ConsciousnessBubble = ({ title, description, icon }: ConsciousnessBubbleProps) => {
  const isSelfBubble = title === 'Self';
  
  const BubbleContent = () => (
    <div className="p-6 bg-card/80 backdrop-blur-sm border border-border rounded-lg transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-2.5 rounded-md text-primary">
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="font-medium text-base group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
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
