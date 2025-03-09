
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import PhilosophyPreview from '../components/home/PhilosophyPreview';
import EntrepreneurshipPreview from '../components/home/EntrepreneurshipPreview';

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PhilosophyPreview />
        <EntrepreneurshipPreview />
      </main>
      <Footer />
    </>
  );
};

export default Index;
