import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft, Github, ExternalLink, BookText, Cpu, Server, Database, Code } from 'lucide-react';
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
  content?: React.ReactNode;
}

const ProjectCard = ({ title, description, tags, githubUrl, liveUrl, imageSrc, content }: ProjectCardProps) => (
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
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      
      {content}
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground font-medium">
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
            className="text-sm flex items-center text-primary hover:underline"
          >
            <Github size={16} className="mr-1" />
            View on GitHub
          </a>
        )}
        {liveUrl && (
          <a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm flex items-center text-primary hover:underline"
          >
            <ExternalLink size={16} className="mr-1" />
            Live Demo
          </a>
        )}
      </div>
    </div>
  </div>
);

const Projects = () => {
  const AiEbookContent = (
    <div className="mb-5">
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Cpu size={14} />
          </div>
          <div>
            <h4 className="text-sm font-medium">Phase 1: Core Ebook System</h4>
            <p className="text-xs text-muted-foreground">Book storage, metadata extraction, text processing</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Database size={14} />
          </div>
          <div>
            <h4 className="text-sm font-medium">Phase 2: AI Summarization</h4>
            <p className="text-xs text-muted-foreground">AI-generated summaries, flashcards, concept maps</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Server size={14} />
          </div>
          <div>
            <h4 className="text-sm font-medium">Phase 3: Semantic Search</h4>
            <p className="text-xs text-muted-foreground">Vector DB, natural language queries, AI assistant</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const projects = [
    {
      title: "AI Ebook System",
      description: "An intelligent e-reader platform that extracts knowledge from books using AI to create summaries, flashcards, and concept maps.",
      tags: ["Node.js", "MongoDB", "Express", "OpenAI API", "Vector DB"],
      githubUrl: "https://github.com/Angelguirao/ai-ebook-system",
      content: AiEbookContent
    },
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
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
