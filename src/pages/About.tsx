
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
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
          
          <div className="flex flex-col gap-8">
            <div className="w-full max-w-3xl mx-auto">
              <div className="aspect-square w-48 h-48 overflow-hidden rounded-lg mb-8 mx-auto">
                <img 
                  src="/lovable-uploads/2da07e1c-3347-4f46-a181-e87596b5e596.png" 
                  alt="Illustration of a person with tangled thoughts" 
                  className="w-full h-full object-contain bg-white/5"
                />
              </div>
              
              <div className="content-area">
                <BlurEffect className="animation-delay-300">
                  <h2>The Tangled Mess of Identity</h2>
                  <p>
                    The illustration you see represents my thought process better than any crafted biography could—a chaotic, interconnected web of ideas, questions, and occasional insights that somehow form what others might call "me."
                  </p>
                  
                  <p>
                    This is usually the part where I'd neatly weave together a narrative about who I am, but truthfully, I'm not entirely sure what "I" even means—whether there's a fixed self or just an ever-changing collection of experiences. And you know what? That's perfectly fine!
                  </p>
                  
                  <h2>What I Think</h2>
                  <p>
                    Maybe Descartes was onto something when he claimed, "I think, therefore I am." Ideas, I believe, are among the most powerful forces shaping the world—and my identity. <Link to="/philosophy" className="text-primary font-medium hover:text-primary/80 underline underline-offset-4">Philosophy</Link> is my favorite playground, filled with questions that have no answers, too many answers, or answers that inevitably lead to more questions—the sort of intellectual adventures that can quickly clear a room.
                  </p>
                  
                  <p>
                    I find comfort in the contradiction between wanting to understand everything and recognizing that complete understanding is impossible. It's in this tension that I find the motivation to keep exploring, even when (especially when) I have no idea where I'm going.
                  </p>
                  
                  <p>
                    At the end of the day, though, what matters most is enjoying the journey itself. My deep-rooted skepticism about finding absolute truths has led me to embrace a playful approach to life—if we can't reach definitive conclusions anyway, why not have fun while we search? Life's too brief and wonderful to be taken too seriously.
                  </p>
                  
                  <h2>What I Do</h2>
                  <p>
                    Maybe Aristotle had a point when he said we are what we repeatedly do, but then again, what I do keeps changing (and that's the fun part!). Currently, my life involves meditation and movement practices inspired by embodied cognition, reading extensively, writing notes and articles, and building digital products and micro-startups.
                  </p>
                  
                  <p>
                    Yet, beneath all this intellectual exploration and life's unavoidable constraints, what truly matters to me is nurturing beautiful and meaningful relationships with my wife, family, and friends.
                  </p>
                  
                  <h2>What I Do for a Living</h2>
                  <p>
                    Still, the phrase "what I do for a living" feels strangely limiting—as if work alone could define someone. Although I studied law at university, I quickly discovered <Link to="/entrepreneurship" className="text-primary font-medium hover:text-primary/80 underline underline-offset-4">entrepreneurship</Link> as my natural habitat. I've launched a travel blog, bought and operated a mobile game app, created a litigation finance marketplace, and explored various other ventures. Later, I worked as a venture analyst in a venture builder, where I learned the ins and outs of startup ecosystems.
                  </p>

                  <p>
                    Throughout this journey, I've built and broken things, written and deleted things—continuously refining ideas. The survivors of this ongoing experimentation are what you'll find on my <Link to="/projects" className="text-primary font-medium hover:text-primary/80 underline underline-offset-4">Projects</Link> page.
                  </p>
                  
                  <p>
                    I also work as a software engineer in startup environments, because why not add more chaos to the mix?
                  </p>
                  
                  <h2>So, Who Am I?</h2>
                  <p>
                    I have no idea. And I'm increasingly convinced that having no idea is the most honest position to take. I am a collection of experiences, influences, contradictions, and questions—constantly changing, rarely consistent, and perpetually curious. All there truly is left to do is play along with society's spectacle and have fun while doing it!
                  </p>
                  
                  <p>
                    If that sounds like a cop-out, you're probably right. But it's the most truthful cop-out I can offer. Maybe next year I'll have a more coherent story. But I doubt it, and that's perfectly okay!
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
