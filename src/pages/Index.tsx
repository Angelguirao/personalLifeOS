
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import PhilosophyPreview from '../components/home/PhilosophyPreview';
import EntrepreneurshipPreview from '../components/home/EntrepreneurshipPreview';
import ProjectsPreview from '../components/home/ProjectsPreview';
import GardenPreview from '../components/home/GardenPreview';
import AboutPreview from '../components/home/AboutPreview';
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
        <div id="philosophy-preview" className="bg-gradient-to-br from-background to-purple-50/10">
          <PhilosophyPreview />
        </div>
        
        {/* Only show these sections for public (non-authenticated) users */}
        {!isAuthenticated && (
          <>
            <EntrepreneurshipPreview />
            <div className="bg-gradient-to-br from-background to-amber-50/10">
              <ProjectsPreview />
            </div>
            <GardenPreview />
            <div className="bg-gradient-to-br from-background to-green-50/10">
              <AboutPreview />
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Index;
