
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft, Mail, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlurEffect from '../components/ui/BlurEffect';
import RevealText from '../components/ui/RevealText';

const About = () => {
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
              <RevealText>About</RevealText>
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/3">
              <BlurEffect className="animation-delay-200">
                <div className="aspect-square overflow-hidden rounded-lg mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="glass p-6 space-y-4">
                  <h2 className="font-serif text-xl font-semibold">Connect</h2>
                  <div className="space-y-3">
                    <a 
                      href="mailto:email@example.com" 
                      className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail size={16} className="mr-2" />
                      email@example.com
                    </a>
                    <a 
                      href="https://github.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github size={16} className="mr-2" />
                      github.com/username
                    </a>
                    <a 
                      href="https://twitter.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Twitter size={16} className="mr-2" />
                      @username
                    </a>
                    <a 
                      href="https://linkedin.com/in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Linkedin size={16} className="mr-2" />
                      linkedin.com/in/username
                    </a>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1">Value4Value:</p>
                    <p className="monospace text-xs break-all">
                      bc1q...
                    </p>
                  </div>
                </div>
              </BlurEffect>
            </div>
            
            <div className="md:w-2/3">
              <div className="content-area">
                <BlurEffect className="animation-delay-300">
                  <p>
                    I'm a philosopher, solopreneur, and interdisciplinary thinker dedicated to pursuing information as a means of connecting deeply and meaningfully with the world around me.
                  </p>
                  
                  <p>
                    My intellectual journey began with a fascination for how complex systems emerge from simple rules, leading me to explore fields ranging from computer science to philosophy, ethics to machine learning, and economics to aesthetics.
                  </p>
                  
                  <h2>Background & Journey</h2>
                  <p>
                    With a background in [your background here], I've cultivated a unique perspective that brings together technical expertise with philosophical inquiry. My approach is characterized by a willingness to question established frameworks, embrace uncertainty, and seek out meaningful connections across seemingly disparate domains.
                  </p>
                  
                  <p>
                    Throughout my professional journey, I've been guided by the principle that technology should serve to enhance human freedom and connection, not diminish it. This has led me to focus on creating tools and systems that solve real problems while respecting individual autonomy and dignity.
                  </p>
                  
                  <h2>Current Focus</h2>
                  <p>
                    Currently, I'm focused on solopreneurship as a means of creating greater freedom in my life while building useful tools for others. My projects reflect my commitment to ethical development, open-source principles, and the belief that information should be freely shared.
                  </p>
                  
                  <p>
                    When I'm not working on my various projects, you might find me exploring philosophy books, experimenting with new technologies, or engaged in deep conversations about consciousness, ethics, or the nature of reality.
                  </p>
                  
                  <h2>Values & Approach</h2>
                  <p>
                    I value intellectual honesty, empathy, and a playful approach to exploration and learning. I believe that the most profound insights often come from crossing disciplinary boundaries and questioning fundamental assumptions.
                  </p>
                  
                  <p>
                    My work and life are guided by the principle that meaningful connection—to ideas, to nature, and to other people—is what gives life its richness and purpose. In all that I do, I strive to deepen these connections and to share the journey with others who are similarly curious about the world.
                  </p>
                </BlurEffect>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
