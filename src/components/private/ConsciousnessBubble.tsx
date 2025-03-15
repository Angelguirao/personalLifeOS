
import React from 'react';
import { cn } from "@/lib/utils";

export interface ConsciousnessBubbleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const ConsciousnessBubble = ({ title, description, icon, className }: ConsciousnessBubbleProps) => (
  <div className={cn("glass p-6 flex flex-col h-full hover:shadow-md transition-all duration-300 group border-l-4 border-primary/50", className)}>
    <div className="flex items-center gap-3 mb-3">
      <div className="text-primary/80 group-hover:text-primary transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-serif text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">{description}</p>
  </div>
);

export default ConsciousnessBubble;
