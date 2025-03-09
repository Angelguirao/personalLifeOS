
import React from 'react';
import { cn } from "@/lib/utils";

interface RevealTextProps {
  children: React.ReactNode;
  delay?: string;
  className?: string;
}

const RevealText = ({ children, delay = "animation-delay-100", className }: RevealTextProps) => {
  return (
    <div className="reveal-container">
      <div className={cn("opacity-0 animate-text-reveal", delay, className)}>
        {children}
      </div>
    </div>
  );
};

export default RevealText;
