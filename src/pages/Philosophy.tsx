
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlurEffect from '../components/ui/BlurEffect';
import RevealText from '../components/ui/RevealText';

const Philosophy = () => {
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
              <RevealText>Philosophy of Life</RevealText>
            </h1>
            <BlurEffect className="animation-delay-200">
              <p className="body-lg text-muted-foreground">
                My purpose in life is to pursue information as a means of connecting deeply and meaningfully with people, nature, and the universe.
              </p>
            </BlurEffect>
          </div>
          
          <div className="content-area">
            <BlurEffect className="animation-delay-300">
              <p>
                My purpose in life is to pursue information as a means of connecting deeply and meaningfully with people, nature, and the universe. I embrace narrative and playful exploration to deepen connection and understanding.
              </p>
              
              <h2>Metaphysical View</h2>
              <p>
                Metaphysically, I adopt an agnostic and pragmatically idealist stance, considering the possibility that information or consciousness might be fundamental to reality, though I remain open about their relationship with physical existence. I value uncertainty, complexity, and chaos over deterministic, stable conceptions of the universe. Embracing free will, I believe that our choices actively shape our experience and understanding of the world, allowing us to participate meaningfully in reality's continual unfolding.
              </p>
              
              <h2>Epistemological Stance</h2>
              <p>
                Epistemologically, I align with skepticism, viewing ultimate truth as largely a social construct. Nevertheless, I uphold that some truths—contextual, pragmatic, and defensible—can and should guide our interactions.
              </p>
              
              <h2>Ethical Framework</h2>
              <p>
                Ethically, my stance is relativistic, recognizing moral frameworks as diverse and context-dependent. Rather than promoting absolute moral standards, I prioritize empathy, understanding, and meaningful dialogue across varied human experiences.
              </p>
              
              <h2>Political Perspective</h2>
              <p>
                Politically, I advocate for liberal ideals influenced by libertarian thought, emphasizing freedom, individual dignity, fairness, and creating conditions that promote human flourishing. I remain open to exploring various political and economic models that best support these ideals.
              </p>
              
              <h2>Aesthetic Approach</h2>
              <p>
                Aesthetically, I cherish the beauty inherent in complexity, finding awe in the ordinary moments and subtle intricacies of everyday life. My aesthetic approach encourages broad, interdisciplinary appreciation, inspiring wonder and deepening my connection to the world around me.
              </p>
              
              <h2>Prioritizing Freedom Through Entrepreneurship</h2>
              <p>
                Recognizing that human life is inherently limited by time and that traditional work often consumes a disproportionate share, I currently prioritize entrepreneurship—particularly solopreneurship—as a means of eliminating unnecessary work. This focus allows me to cultivate greater freedom, enabling broader exploration and deeper connection aligned with my philosophy of life.
              </p>
              
              <p>
                As I navigate the marketplace of ideas, I remain committed to an ongoing process of reflection, refinement, and adaptation, open to new perspectives and continually reshaping my views to deepen understanding and enhance my capacity for meaningful connection.
              </p>
            </BlurEffect>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Philosophy;
