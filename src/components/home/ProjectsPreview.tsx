
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, ExternalLink, BookText, Cpu, Database, Code, Server } from 'lucide-react';
import BlurEffect from '../ui/BlurEffect';

const projects = [
  {
    title: "AI Ebook System",
    description: "An intelligent e-reader platform that extracts knowledge from books using AI to create summaries, flashcards, and concept maps.",
    technologies: ["Node.js", "MongoDB", "Express", "OpenAI API"],
    github: "https://github.com/Angelguirao/ai-ebook-system",
    live: "",
    phases: [
      "Core Ebook System",
      "AI Summarization",
      "Semantic Search"
    ],
    icon: <BookText className="w-5 h-5" />
  }
];

const ProjectsPreview = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-50/20 top-20 -left-64 blur-3xl pointer-events-none"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-50/20 bottom-20 -right-32 blur-3xl pointer-events-none"></div>
      
      <div className="container-wide relative">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="lg:w-1/3 space-y-6 sticky top-32">
            <h2 className="heading-lg">Projects & Works</h2>
            <p className="body-md text-muted-foreground">
              A selection of my software projects, open-source contributions, and other creative works that embody my philosophy and approach.
            </p>
            <div className="pt-2">
              <Link 
                to="/projects" 
                className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors group"
              >
                View all projects
                <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            {projects.map((project, index) => (
              <BlurEffect key={index} className="animation-delay-200">
                <div className="glass p-6 md:p-8 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {project.icon}
                    </div>
                    <h3 className="font-serif text-xl font-semibold">{project.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-5">{project.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-primary/5">
                      <Cpu size={18} className="text-primary mb-2" />
                      <h4 className="font-medium text-sm mb-1">Phase 1</h4>
                      <p className="text-xs text-muted-foreground">Core Ebook System with Node.js & MongoDB</p>
                    </div>
                    
                    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-primary/5">
                      <Database size={18} className="text-primary mb-2" />
                      <h4 className="font-medium text-sm mb-1">Phase 2</h4>
                      <p className="text-xs text-muted-foreground">AI Summarization & Knowledge Extraction</p>
                    </div>
                    
                    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-primary/5">
                      <Server size={18} className="text-primary mb-2" />
                      <h4 className="font-medium text-sm mb-1">Phase 3</h4>
                      <p className="text-xs text-muted-foreground">Semantic Search & AI Assistant</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center text-sm text-primary hover:underline group"
                        aria-label="View GitHub repository"
                      >
                        <Github size={16} className="mr-1" />
                        View on GitHub
                        <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </BlurEffect>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
