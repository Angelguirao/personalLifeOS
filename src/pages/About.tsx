
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
              <RevealText>About "Me"</RevealText>
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
                    This is usually the part where I'd neatly weave together a narrative about how my life experiences have shaped my beliefs, my intellectual journey, or perhaps even my identity. But truthfully, I'm not entirely sure what "I" even means—if there's a fixed self or just an ever-changing collection of experiences. At the very least, it seems safe to say I'm a human being, though even that's open to interpretation.
                  </p>
                  
                  <p>
                    Maybe Aristotle had a point when he said we are what we repeatedly do, but then again, what I do keeps changing. For now, I spend most of my time reading books, writing human language as notes and articles, and machine language in the form of software, building micro-startups, and, above all, having fun along the way. My deep-rooted skepticism towards absolute truths means I rarely take life—or anything else—too seriously.
                  </p>
                  
                  <h2>The Tangled Mess of Identity</h2>
                  <p>
                    The illustration you see represents my thought process better than any crafted biography could. A chaotic, interconnected web of ideas, questions, and occasional insights that somehow form what others might call "me."
                  </p>
                  
                  <p>
                    Weaving through life's complexity, I try to simplify the non-negotiable aspects of existence through carefully crafted routines—balancing biological, cognitive, social, spatial, technological, and financial essentials efficiently. Yet, within these constraints, all there truly is left to do is play along with society's spectacle, building beautiful and meaningful relationships with my wife, family, and friends.
                  </p>
                  
                  <h2>Professional Confusion</h2>
                  <p>
                    My interests jump from philosophy to computer science, from ethics to aesthetics, not because I'm particularly good at any of them, but because I enjoy the confusion that emerges when different domains collide.
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
