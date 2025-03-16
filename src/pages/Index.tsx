
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import PublicContent from '../components/home/PublicContent';
import ConsciousnessOS from '../components/private/ConsciousnessOS';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        
        {isAuthenticated ? (
          <div className="space-y-16">
            {/* Display Life Operating System UI for authenticated users */}
            <div id="consciousness-os" className="bg-gradient-to-br from-background to-purple-50/10">
              <ConsciousnessOS />
            </div>
            
            {/* Also show the public content below the OS for authenticated users */}
            <PublicContent />
          </div>
        ) : (
          // Display public content for non-authenticated users
          <PublicContent />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Index;
