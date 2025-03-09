
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft, Sprout, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealText from '../components/ui/RevealText';
import BlurEffect from '../components/ui/BlurEffect';

const gardenNotes = [
  {
    id: 1,
    title: "Complexity Theory and Emergent Behavior",
    summary: "Notes on how complex systems emerge from simple rules and what this means for understanding consciousness.",
    stage: "seedling",
    lastUpdated: "2023-12-05",
    connections: ["consciousness", "systems-thinking", "emergence"]
  },
  {
    id: 2,
    title: "Information as a Fundamental Property",
    summary: "Exploring the idea that information might be as fundamental to reality as matter and energy.",
    stage: "growing",
    lastUpdated: "2023-11-22",
    connections: ["metaphysics", "quantum-mechanics", "consciousness"]
  },
  {
    id: 3,
    title: "Open Source Ethics",
    summary: "The moral case for open source software and its relationship to freedom and information sharing.",
    stage: "evergreen",
    lastUpdated: "2023-10-18",
    connections: ["ethics", "open-source", "information-freedom"]
  },
];

const getStageIcon = (stage: string) => {
  switch(stage) {
    case "seedling":
      return <Sprout size={16} className="text-green-400" />;
    case "growing":
      return <Sprout size={16} className="text-green-500" />;
    case "evergreen":
      return <Sprout size={16} className="text-green-600" />;
    default:
      return <Sprout size={16} />;
  }
};

const Garden = () => {
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium mb-2">
              <Sprout size={12} className="mr-1" />
              Work in Progress
            </div>
            <h1 className="heading-lg">
              <RevealText>Digital Garden</RevealText>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Unlike a traditional blog, this digital garden is a living collection of interconnected ideas, 
              notes, and explorations. It grows organically over time and represents my continuous learning journey.
            </p>
          </div>
          
          <div className="mb-10 glass p-4 border-l-4 border-green-500">
            <h3 className="font-serif text-sm font-semibold mb-1">How to navigate this garden:</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-center">
                <Sprout size={12} className="text-green-400 mr-2" /> 
                <span><strong>Seedlings</strong>: Early-stage ideas, still taking shape</span>
              </li>
              <li className="flex items-center">
                <Sprout size={12} className="text-green-500 mr-2" /> 
                <span><strong>Growing</strong>: Developing thoughts with some substantial content</span>
              </li>
              <li className="flex items-center">
                <Sprout size={12} className="text-green-600 mr-2" /> 
                <span><strong>Evergreen</strong>: Well-developed, mature ideas</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-10">
            {gardenNotes.map((note) => (
              <BlurEffect key={note.id} className={`animation-delay-${note.id * 100}`}>
                <article className="glass p-8 transition-transform hover:-translate-y-1">
                  <div className="mb-3 flex items-center text-xs text-muted-foreground">
                    <div className="flex items-center">
                      {getStageIcon(note.stage)}
                      <span className="ml-1 capitalize">{note.stage}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <time dateTime={note.lastUpdated}>Updated: {new Date(note.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>
                  
                  <h2 className="font-serif text-xl font-semibold mb-3">
                    <Link to={`/garden/${note.id}`} className="hover:text-primary transition-colors">
                      {note.title}
                    </Link>
                  </h2>
                  
                  <p className="text-muted-foreground mb-4">{note.summary}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.connections.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs">
                        <Link2 size={10} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    to={`/garden/${note.id}`} 
                    className="text-sm font-medium text-primary hover:underline inline-flex items-center"
                  >
                    Explore note
                    <ArrowLeft size={14} className="ml-1 rotate-180" />
                  </Link>
                </article>
              </BlurEffect>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Garden;
