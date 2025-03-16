
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Bitcoin, Copy, Brain, Lightbulb, Zap, Users } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { useAuth } from '@/hooks/useAuth';

const Footer = () => {
  const { isAuthenticated } = useAuth();
  const bitcoinAddress = "bc1qyt377nm9z7u0zmgpudxgk8cps6qpzjl68xfauy";
  
  const copyBitcoinAddress = () => {
    navigator.clipboard.writeText(bitcoinAddress);
    toast({
      title: "Bitcoin address copied",
      description: "The Bitcoin address has been copied to your clipboard",
    });
  };
  
  return (
    <footer className="border-t border-border py-12 mt-24">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-1">
            <h3 className="font-serif text-lg font-semibold">Angel Guirao</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              I explore and share information to build meaningful connections - embracing wonder, narrative, and play.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                <Brain size={14} className="mr-1.5" /> Home
              </Link>
              <Link to="/garden" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                <Lightbulb size={14} className="mr-1.5" /> Thought
              </Link>
              <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                <Zap size={14} className="mr-1.5" /> Action
              </Link>
              <Link to="/connect" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                <Users size={14} className="mr-1.5" /> Connect
              </Link>
            </nav>
          </div>
          
          {!isAuthenticated && (
            <>
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold">Connect</h3>
                <div className="flex flex-col space-y-2">
                  <a href="https://github.com/Angelguirao" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <Github size={16} className="mr-2" /> GitHub
                  </a>
                  <a href="https://x.com/civicCogitation" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <Twitter size={16} className="mr-2" /> Twitter
                  </a>
                  <a href="https://www.linkedin.com/in/angelguirao/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <Linkedin size={16} className="mr-2" /> LinkedIn
                  </a>
                  <a href="mailto:angelguirao92@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <Mail size={16} className="mr-2" /> Email
                  </a>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold">Support</h3>
                <p className="text-sm text-muted-foreground">
                  If you find value in my work, consider supporting through <a href="https://value4value.info/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors">Value4Value</a>.
                </p>
                
                <div className="pt-4">
                  <p className="text-sm font-medium">Bitcoin Address:</p>
                  <div className="flex items-center mt-1">
                    <Bitcoin size={16} className="text-amber-500 mr-2" />
                    <p className="text-xs break-all font-mono">
                      {bitcoinAddress}
                    </p>
                    <button 
                      onClick={copyBitcoinAddress} 
                      className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Copy Bitcoin address"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Open source work - freely share, adapt and build upon.
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
