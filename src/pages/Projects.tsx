
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlurEffect from '../components/ui/BlurEffect';
import RevealText from '../components/ui/RevealText';

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  imageSrc?: string;
  tags?: string[];
}

const ProjectCard = ({ title, description, githubUrl, liveUrl, imageSrc, tags }: ProjectCardProps) => (
  <div className="glass rounded-2xl overflow-hidden flex flex-col h-full hover-lift">
    {imageSrc && (
      <div className="h-48 sm:h-64 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500"
        />
      </div>
    )}
    <div className="p-6 sm:p-8 flex flex-col flex-grow">
      <h3 className="font-serif text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-secondary/50 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex flex-wrap items-center gap-4 mt-auto pt-4">
        {githubUrl && (
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary hover:underline group"
          >
            <Github size={16} className="mr-1.5" />
            Code
          </a>
        )}
        {liveUrl && (
          <a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary hover:underline group"
          >
            <ExternalLink size={16} className="mr-1.5" />
            Live Demo
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
      imageSrc: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
      tags: ["AI", "React", "Python", "NLP"]
    }
  ];
  
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 min-h-screen">
        <div className="container-wide px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-1.5" />
            Back to home
          </Link>
          
          {/* Decorative background elements */}
          <div className="absolute top-32 right-16 w-96 h-96 bg-blue-50/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-32 left-16 w-64 h-64 bg-purple-50/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="space-y-4 mb-16 relative">
            <h1 className="heading-lg">
              <RevealText>Projects</RevealText>
            </h1>
            <BlurEffect className="animation-delay-200">
              <p className="body-lg text-muted-foreground max-w-2xl">
                A collection of software and open-source contributions that reflect my philosophy and approach to meaningful creation.
              </p>
            </BlurEffect>
          </div>
          
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
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
