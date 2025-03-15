
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import PrivateProjectBadge from './PrivateProjectBadge';
import { Project } from '@/lib/projects/types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, github_url, live_url, image_url, is_private } = project;
  
  return (
    <div className="glass rounded-2xl overflow-hidden flex flex-col h-full hover-lift">
      {image_url && (
        <div className="h-48 sm:h-64 overflow-hidden">
          <img 
            src={image_url} 
            alt={title} 
            className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500"
          />
        </div>
      )}
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-serif text-xl font-semibold">{title}</h3>
          {is_private && <PrivateProjectBadge />}
        </div>
        
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <div className="flex flex-wrap items-center gap-4 mt-auto pt-4">
          {github_url && (
            <a 
              href={github_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors group"
            >
              <Github size={16} className="mr-1.5" />
              Code
            </a>
          )}
          {live_url && (
            <a 
              href={live_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors group"
            >
              <ExternalLink size={16} className="mr-1.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
