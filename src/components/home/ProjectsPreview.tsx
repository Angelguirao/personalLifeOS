
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, BookText } from 'lucide-react';
import BlurEffect from '../ui/BlurEffect';

const projects = [
  {
    title: "AI Ebook System",
    description: "An AI-powered ebook management system that extracts insights, creates summaries, and enables semantic search across your digital library.",
    github: "https://github.com/Angelguirao/ai-ebook-system",
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
                  
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  
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
                    <Link 
                      to="/projects" 
                      className="flex items-center text-sm text-primary hover:underline group"
                    >
                      Learn more
                      <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-0.5" />
                    </Link>
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
