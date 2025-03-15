
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RevealText from '@/components/ui/RevealText';
import BlurEffect from '@/components/ui/BlurEffect';

const GardenHeader = () => {
  return (
    <>
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-1.5" />
        Back to home
      </Link>
      
      <div className="space-y-4 mb-12 relative text-center">
        <h1 className="heading-lg">
          <RevealText>Digital Garden</RevealText>
        </h1>
        <BlurEffect className="animation-delay-200">
          <p className="body-lg text-muted-foreground mx-auto max-w-2xl">
            A space for growing and cultivating ideas. These notes connect with one another to form a network of related concepts.
          </p>
        </BlurEffect>
      </div>
    </>
  );
};

export default GardenHeader;
