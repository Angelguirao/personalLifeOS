
import React from 'react';
import { ArrowDownIcon, Sparkles } from 'lucide-react';
import RevealText from '../ui/RevealText';
import BlurEffect from '../ui/BlurEffect';

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 flex flex-col justify-center relative overflow-hidden">
      <div className="container-narrow relative z-10">
        <div className="space-y-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-primary/70 mb-3 opacity-0 animate-fade-in">
            <Sparkles size={18} className="text-primary/90" />
            <span className="text-sm font-medium tracking-wide uppercase">Thoughts & Explorations</span>
          </div>
          
          <div className="space-y-3">
            <h1 className="heading-xl">
              <RevealText>Hello, World</RevealText>
            </h1>
          </div>
          
          <BlurEffect className="animation-delay-400">
            <p className="body-lg text-muted-foreground max-w-2xl mx-auto sm:mx-0">
              I'm Angel. I explore and share information to build meaningful connections - embracing wonder, narrative, and play*
            </p>
            <p className="body-sm italic text-muted-foreground/80 mt-6 border-l-2 border-primary/30 pl-4 max-w-2xl mx-auto sm:mx-0">
              *Don't take any of this too seriously though, we're all just figuring it out as we go.
            </p>
          </BlurEffect>
          
          <div className="mt-12 opacity-0 animate-fade-in animation-delay-700">
            <a href="#philosophy-preview" className="inline-flex flex-col items-center text-foreground hover:text-primary transition-colors group">
              <span className="text-base font-medium mb-3">Scroll to explore</span>
              <ArrowDownIcon className="animate-bounce h-6 w-6 group-hover:text-primary" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Refined decorative elements */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-100/10 rounded-full blur-2xl"></div>
    </section>
  );
};

export default Hero;
