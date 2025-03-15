
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlurEffect from '../components/ui/BlurEffect';
import RevealText from '../components/ui/RevealText';
import ProjectCard from '../components/projects/ProjectCard';
import NoProjects from '../components/projects/NoProjects';
import { useProjects } from '../hooks/useProjects';
import { Project } from '@/lib/projects/types';
import { useAuth } from '@/hooks/useAuth';

// Sample project data for initial rendering and in case API fails
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Scriptoria",
    description: "An AI-powered ebook management system that finally brings true digital revolution to books, going beyond the simple digital copies that ebooks have been until now. Because who doesn't love a good book empowered by AI?",
    github_url: "https://github.com/Angelguirao/ai-ebook-system",
    image_url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
    is_private: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Marriage Enrichment Blueprint",
    description: "Forge a vibrant marital bond through heartfelt communication, shared adventures in nature and culture, culinary exploration, and playful moments. Embrace intimacy, navigate parenthood, and nurture personal growth together. This initiative is a holistic blueprint for a fulfilling marriage rooted in love and mutual empowerment.",
    image_url: "https://images.unsplash.com/photo-1590524223810-37e843f965a3?auto=format&fit=crop&w=800&q=80",
    is_private: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const Projects = () => {
  const { isAuthenticated } = useAuth?.() || { isAuthenticated: false };
  const { projects, isLoading, error } = useProjects();
  
  // Use sample projects if API fails or while loading during first render
  const displayedProjects = projects.length > 0 ? projects : sampleProjects;
  
  // Filter projects based on authentication status
  const filteredProjects = isAuthenticated 
    ? displayedProjects
    : displayedProjects.filter(project => !project.is_private);
  
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container-narrow">
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
                A selection of my software projects, open-source contributions, and other creative works that embody my philosophy and approach.
              </p>
            </BlurEffect>
          </div>
          
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <NoProjects />
          ) : (
            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
              {filteredProjects.map((project, index) => (
                <BlurEffect key={project.id} className={`animation-delay-${(index + 3) * 100}`}>
                  <ProjectCard project={project} />
                </BlurEffect>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
