
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlurEffect from '../components/ui/BlurEffect';
import RevealText from '../components/ui/RevealText';

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl?: string;
  imageSrc?: string;
}

const ProjectCard = ({ title, description, githubUrl, imageSrc }: ProjectCardProps) => (
  <div className="glass overflow-hidden flex flex-col h-full">
    {imageSrc && (
      <div className="h-64 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500"
        />
      </div>
    )}
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="font-serif text-xl font-semibold mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      
      <div className="flex items-center space-x-3 mt-auto">
        {githubUrl && (
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm flex items-center text-primary hover:underline"
          >
            <Github size={16} className="mr-1" />
            View on GitHub
          </a>
        )}
      </div>
    </div>
  </div>
);

const Projects = () => {
  const projects = [
    {
      title: "Scriptoria",
      description: "An AI-powered ebook management system that extracts insights, creates summaries, and enables semantic search across your digital library.",
      githubUrl: "https://github.com/Angelguirao/ai-ebook-system",
      imageSrc: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80"
    }
  ];
  
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container-wide">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft size={16} className="mr-1" />
            Back to home
          </Link>
          
          <div className="space-y-4 mb-12">
            <h1 className="heading-lg">
              <RevealText>Projects</RevealText>
            </h1>
            <BlurEffect className="animation-delay-200">
              <p className="body-lg text-muted-foreground max-w-2xl">
                A collection of software and open-source contributions that reflect my philosophy and approach to meaningful creation.
              </p>
            </BlurEffect>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 mt-12 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <BlurEffect key={project.title} className={`animation-delay-${(index + 3) * 100}`}>
                <ProjectCard {...project} />
              </BlurEffect>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
