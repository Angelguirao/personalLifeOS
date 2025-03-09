
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownIcon } from 'lucide-react';
import RevealText from '../ui/RevealText';
import BlurEffect from '../ui/BlurEffect';

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 flex flex-col justify-center relative overflow-hidden">
      <div className="container-narrow relative z-10">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-wider text-muted-foreground opacity-0 animate-fade-in">
              Philosophy • Entrepreneurship • Connection
            </p>
            <h1 className="heading-xl">
              <RevealText>Connecting deeply</RevealText>
              <RevealText delay="animation-delay-200">through information</RevealText>
              <RevealText delay="animation-delay-300">and meaning</RevealText>
            </h1>
          </div>
          
          <BlurEffect className="animation-delay-400">
            <p className="body-lg text-muted-foreground max-w-2xl">
              My purpose is to pursue information as a means of connecting deeply and meaningfully with people, nature, and the universe—embracing narrative and playful exploration.
            </p>
          </BlurEffect>
          
          <div className="pt-6 opacity-0 animate-fade-in animation-delay-700">
            <Link to="/philosophy" className="inline-flex items-center justify-center px-8 py-3 border border-primary bg-primary text-primary-foreground font-medium rounded-lg transition-colors hover:bg-primary/90 text-base">
              Explore All
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-1000">
        <a href="#philosophy-preview" className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-xs mb-2">Scroll to explore</span>
          <ArrowDownIcon className="animate-bounce" size={16} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
