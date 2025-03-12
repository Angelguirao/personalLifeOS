
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import PhilosophyPreview from '../components/home/PhilosophyPreview';
import EntrepreneurshipPreview from '../components/home/EntrepreneurshipPreview';
import ProjectsPreview from '../components/home/ProjectsPreview';
import GardenPreview from '../components/home/GardenPreview';
import AboutPreview from '../components/home/AboutPreview';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <div id="philosophy-preview">
          <PhilosophyPreview />
        </div>
        <EntrepreneurshipPreview />
        <ProjectsPreview />
        <GardenPreview />
        <AboutPreview />
      </main>
      <Footer />
    </>
  );
};

export default Index;
