
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, BookText } from 'lucide-react';
import BlurEffect from '../ui/BlurEffect';
import RevealText from '../ui/RevealText';

const projects = [
  {
    title: "Scriptoria",
    description: "An AI-powered ebook management system that finally brings true digital revolution to books, going beyond the simple digital copies that ebooks have been until now. Because who doesn't love a good book empowered by AI?",
    github: "https://github.com/Angelguirao/ai-ebook-system",
    icon: <BookText className="w-5 h-5" />
  }
];

const ProjectsPreview = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-50/5 top-20 -left-64 blur-3xl pointer-events-none"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-50/5 bottom-20 -right-32 blur-3xl pointer-events-none"></div>
      
      <div className="container-wide relative">
        <div className="flex flex-col gap-10 items-start">
          <div className="w-full space-y-6">
            <RevealText>
              <h2 className="heading-lg">Projects</h2>
            </RevealText>
            <p className="body-md text-muted-foreground max-w-xl">
              A collection of software experiments, tools, and creative works that embody my approach to building meaningful solutions.
            </p>
            <div className="pt-2">
              <Link 
                to="/projects" 
                className="inline-flex items-center px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-medium hover:bg-primary/10 transition-colors group"
                onClick={() => window.scrollTo(0, 0)}
              >
                View all projects
                <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          
          <div className="w-full">
            {projects.map((project, index) => (
              <BlurEffect key={index} className="animation-delay-200">
                <div className="p-6 md:p-8 hover:shadow-sm transition-all duration-300 border border-primary/5 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/70">
                      {project.icon}
                    </div>
                    <h3 className="font-serif text-xl font-semibold">{project.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4">
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
                      onClick={() => window.scrollTo(0, 0)}
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
