
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlurEffect from '../components/ui/BlurEffect';
import RevealText from '../components/ui/RevealText';

const Constraints = () => {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container-narrow">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft size={16} className="mr-1" />
            Back to home
          </Link>
          
          <div className="space-y-4 mb-12">
            <h1 className="heading-lg">
              <RevealText>Constraints</RevealText>
            </h1>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="w-full max-w-3xl mx-auto">
              <BlurEffect className="animation-delay-300">
                <p className="text-muted-foreground text-center">
                  This page is under construction. Check back soon for information about system constraints and limitations.
                </p>
              </BlurEffect>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Constraints;
