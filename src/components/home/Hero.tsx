
import React from 'react';
import { ArrowDownIcon, SparklesIcon } from 'lucide-react';
import RevealText from '../ui/RevealText';
import BlurEffect from '../ui/BlurEffect';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="min-h-screen pt-32 pb-24 flex flex-col justify-center relative overflow-hidden">
      {/* Refined decorative elements */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-100/10 rounded-full blur-2xl"></div>
      
      <div className="container-narrow relative z-10">
        <div className="space-y-8 text-center sm:text-left">
          <div className="space-y-3">
            {isAuthenticated ? (
              <div className="inline-flex items-center justify-center p-1.5 px-4 rounded-full bg-primary/10 text-primary mb-4 mx-auto sm:mx-0">
                <SparklesIcon size={16} className="mr-2" />
                <span className="text-sm font-medium">Life Operating System</span>
              </div>
            ) : null}
            
            <h1 className="heading-xl">
              {isAuthenticated ? (
                <RevealText>Hello, Angel</RevealText>
              ) : (
                <RevealText>Hello, World</RevealText>
              )}
            </h1>
          </div>
          
          <BlurEffect className="animation-delay-400">
            {isAuthenticated ? (
              <div>
                <p className="body-lg text-foreground max-w-2xl mx-auto sm:mx-0">
                  Welcome to your Life Operating System. A holistic framework for navigating existence and optimizing your experience.
                </p>
              </div>
            ) : (
              <div>
                <p className="body-lg text-foreground max-w-2xl mx-auto sm:mx-0">
                  I'm Angel.
                </p>
                <p className="body-lg text-foreground max-w-2xl mx-auto sm:mx-0 mt-4">
                  You can explore here the different facets of me—through my experiences, the ideas that shape my thinking, and the projects where I bring them to life*
                </p>
                <p className="body-sm italic text-muted-foreground/80 mt-4 border-l-2 border-primary/30 pl-4 max-w-2xl mx-auto sm:mx-0">
                  *Don't take any of this too seriously though, we're all just figuring it out as we go.
                </p>
              </div>
            )}
          </BlurEffect>
          
          <div className="mt-12 opacity-0 animate-fade-in animation-delay-700">
            <a href="#what-i-experience" className="inline-flex flex-col items-center text-foreground hover:text-primary transition-colors group">
              <span className="text-base font-medium mb-3">{isAuthenticated ? 'Explore your Life OS' : 'Scroll to explore'}</span>
              <ArrowDownIcon className="animate-bounce h-6 w-6 group-hover:text-primary" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
