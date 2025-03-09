
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
                    src="/lovable-uploads/2da07e1c-3347-4f46-a181-e87596b5e596.png" 
                    alt="Illustration of a person with tangled thoughts" 
                    className="w-full h-full object-contain bg-white/5"
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
                    Here's where I'm supposed to include a narrative explaining how life experiences shaped my beliefs and intellectual trajectory, where I build meaning, personal branding or whatever.
                  </p>
                  
                  <p>
                    But I don't even know what I am, if I have a self or whatever. Seems that I'm a human being at least, whatever that means. Maybe I just am what I do as Aristotle says, but that's changing constantly.
                  </p>
                  
                  <h2>The Tangled Mess of Identity</h2>
                  <p>
                    The illustration you see represents my thought process better than any crafted biography could. A chaotic, interconnected web of ideas, questions, and occasional insights that somehow form what others might call "me."
                  </p>
                  
                  <p>
                    My interests jump from philosophy to computer science, from ethics to aesthetics, not because I'm particularly good at any of them, but because I enjoy the confusion that emerges when different domains collide.
                  </p>
                  
                  <h2>Professional Confusion</h2>
                  <p>
                    Professionally, I've wandered through several fields, leaving a trail of half-finished projects and overly ambitious ideas. Some might call this "interdisciplinary work" – I call it an inability to commit to a single path.
                  </p>
                  
                  <p>
                    I've built things, broken things, written things, and deleted things. The ones that survived this process are what you might find on the Projects page – survivors of my fickle attention, not necessarily my best work.
                  </p>
                  
                  <h2>Philosophical Meanderings</h2>
                  <p>
                    Philosophy is my favorite playground for confusion. I'm drawn to questions that have no answers, or too many answers, or answers that lead to more questions. The kind of intellectual endeavors that make people at parties slowly back away.
                  </p>
                  
                  <p>
                    I find comfort in the contradiction between wanting to understand everything and knowing that complete understanding is impossible. It's in this tension that I find the motivation to keep exploring, even when (especially when) I have no idea where I'm going.
                  </p>
                  
                  <h2>So, Who Am I?</h2>
                  <p>
                    I have no idea. And I'm increasingly convinced that having no idea is the most honest position to take. I am a collection of experiences, influences, contradictions, and questions – constantly changing, rarely consistent, and perpetually curious.
                  </p>
                  
                  <p>
                    If that sounds like a cop-out, you're probably right. But it's the most truthful cop-out I can offer. Maybe next year I'll have a more coherent story. But I doubt it.
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
