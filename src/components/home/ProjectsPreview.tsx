
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import BlurEffect from '../ui/BlurEffect';

const projects = [
  {
    title: "Open Source Project 1",
    description: "A developer tool that helps with XYZ, built with React and TypeScript.",
    technologies: ["React", "TypeScript", "Node.js"],
    github: "https://github.com/",
    live: "https://example.com/"
  },
  {
    title: "SaaS Application",
    description: "A minimalist SaaS tool designed to solve ABC problem for small businesses.",
    technologies: ["Next.js", "Tailwind CSS", "Supabase"],
    github: "",
    live: "https://example.com/"
  },
  {
    title: "AI Experiment",
    description: "An experimental project exploring the intersection of AI and human creativity.",
    technologies: ["Python", "TensorFlow", "React"],
    github: "https://github.com/",
    live: ""
  }
];

const ProjectsPreview = () => {
  return (
    <section className="py-20">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="lg:w-1/3 space-y-6 sticky top-32">
            <h2 className="heading-lg">Projects & Works</h2>
            <p className="body-md text-muted-foreground">
              A selection of my software projects, open-source contributions, and other creative works that embody my philosophy and approach.
            </p>
            <div className="pt-2">
              <Link 
                to="/projects" 
                className="inline-flex items-center text-sm font-medium hover:underline group"
              >
                View all projects
                <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((project, index) => (
                <BlurEffect key={index} className={`animation-delay-${(index + 1) * 100}`}>
                  <div className="glass p-6 flex flex-col h-full">
                    <h3 className="font-serif text-lg font-semibold mb-3">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-auto">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="View GitHub repository"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.live && (
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="View live project"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </BlurEffect>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
