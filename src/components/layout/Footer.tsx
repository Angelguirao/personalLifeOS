
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border py-12 mt-24">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Firstname Lastname</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Pursuing information as a means of connecting deeply and meaningfully with people, nature, and the universe.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/philosophy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Philosophy</Link>
              <Link to="/entrepreneurship" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Entrepreneurship</Link>
              <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github size={18} />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="mailto:email@example.com" aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail size={18} />
              </a>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <span className="monospace">Bitcoin: </span>
                <span className="text-xs break-all">bc1q...</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Firstname Lastname. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            Built with intention and purpose.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
