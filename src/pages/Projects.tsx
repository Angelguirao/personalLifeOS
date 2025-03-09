
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
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageSrc?: string;
}

const ProjectCard = ({ title, description, tags, githubUrl, liveUrl, imageSrc }: ProjectCardProps) => (
  <div className="glass overflow-hidden flex flex-col h-full">
    {imageSrc && (
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500"
        />
      </div>
    )}
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="font-serif text-xl font-semibold mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground flex-grow mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center space-x-3 mt-auto">
        {githubUrl && (
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm flex items-center text-muted-foreground hover:text-foreground"
          >
            <Github size={16} className="mr-1" />
            Source
          </a>
        )}
        {liveUrl && (
          <a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm flex items-center text-muted-foreground hover:text-foreground"
          >
            <ExternalLink size={16} className="mr-1" />
            Live
          </a>
        )}
      </div>
    </div>
  </div>
);

const Projects = () => {
  // Sample projects - replace with your actual projects
  const projects = [
    {
      title: "Project One",
      description: "An open-source tool that solves a personal problem while contributing to the broader development community.",
      tags: ["React", "TypeScript", "Open Source"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      imageSrc: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Project Two",
      description: "A solo-built software product that emphasizes ethical development and information sharing.",
      tags: ["Node.js", "MongoDB", "Ethics"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      imageSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Project Three",
      description: "An experiment in AI-driven automation that helps reduce unnecessary work and creates more freedom.",
      tags: ["AI", "Python", "Automation"],
      githubUrl: "https://github.com",
      imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Project Four",
      description: "A minimalist application designed with intention and purpose, reflecting aesthetic principles of simplicity.",
      tags: ["Design", "UX", "Minimalism"],
      liveUrl: "https://example.com",
      imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
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
              <RevealText>Projects & Works</RevealText>
            </h1>
            <BlurEffect className="animation-delay-200">
              <p className="body-lg text-muted-foreground max-w-2xl">
                A collection of software, open-source contributions, and other works that reflect my philosophy and approach to meaningful creation.
              </p>
            </BlurEffect>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
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
