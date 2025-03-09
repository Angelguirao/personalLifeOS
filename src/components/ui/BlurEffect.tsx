
import React from 'react';
import { cn } from "@/lib/utils";

interface BlurEffectProps {
  className?: string;
  children: React.ReactNode;
}

const BlurEffect = ({ className, children }: BlurEffectProps) => {
  return (
    <div className={cn("opacity-0 animate-blur-in", className)}>
      {children}
    </div>
  );
};

export default BlurEffect;
