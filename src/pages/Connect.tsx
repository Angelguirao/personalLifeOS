
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlurEffect from '../components/ui/BlurEffect';
import RevealText from '../components/ui/RevealText';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

const Connect = () => {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container-narrow">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft size={16} className="mr-1" />
            Back to home
          </Link>
          
          <div className="space-y-4 mb-12">
            <h1 className="heading-lg">
              <RevealText>Connect</RevealText>
            </h1>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="w-full max-w-3xl mx-auto">
              <BlurEffect className="animation-delay-300">
                <div className="space-y-6">
                  <p className="text-center text-muted-foreground mb-8">
                    Feel free to reach out through any of the following channels:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <a 
                      href="mailto:angelguirao92@gmail.com" 
                      className="flex items-center p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
                    >
                      <Mail className="mr-3 text-primary" size={24} />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-muted-foreground">angelguirao92@gmail.com</p>
                      </div>
                    </a>
                    
                    <a 
                      href="https://github.com/Angelguirao" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
                    >
                      <Github className="mr-3 text-primary" size={24} />
                      <div>
                        <h3 className="font-medium">GitHub</h3>
                        <p className="text-sm text-muted-foreground">@Angelguirao</p>
                      </div>
                    </a>
                    
                    <a 
                      href="https://x.com/civicCogitation" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
                    >
                      <Twitter className="mr-3 text-primary" size={24} />
                      <div>
                        <h3 className="font-medium">Twitter</h3>
                        <p className="text-sm text-muted-foreground">@civicCogitation</p>
                      </div>
                    </a>
                    
                    <a 
                      href="https://www.linkedin.com/in/angelguirao/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
                    >
                      <Linkedin className="mr-3 text-primary" size={24} />
                      <div>
                        <h3 className="font-medium">LinkedIn</h3>
                        <p className="text-sm text-muted-foreground">Angel Guirao</p>
                      </div>
                    </a>
                  </div>
                </div>
              </BlurEffect>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Connect;
