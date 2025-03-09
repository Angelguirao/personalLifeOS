
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlurEffect from '../components/ui/BlurEffect';
import RevealText from '../components/ui/RevealText';

const Entrepreneurship = () => {
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
              <RevealText>The Solopreneur's Manifesto</RevealText>
            </h1>
            <BlurEffect className="animation-delay-200">
              <p className="body-lg text-muted-foreground">
                Earning Time, Not Money
              </p>
            </BlurEffect>
          </div>
          
          <div className="content-area">
            <BlurEffect className="animation-delay-300">
              <h2>1. Lifestyle-Based → Earn Time, Not Money</h2>
              <p>
                Solopreneurship is about minimizing the necessity of work, not maximizing income. The goal is <strong>to create freedom</strong>—financial, mental, and creative. <strong>What you do with that time is your choice.</strong>
              </p>
              
              <h2>2. Bootstrapped → Stay Independent & Lean</h2>
              <p>
                No investors, no employees, no bureaucracy. Bootstrapping means maintaining <strong>full control</strong> over your time, product, and vision. You don't need external validation—just profitable, sustainable projects that work for you.
              </p>
              
              <h2>3. Product-Focused → Build with an Engineering Mindset</h2>
              <p>
                Solopreneurship is about <strong>making things, not managing things</strong>. Prioritize <strong>indie hacking, AI-driven automation, and software product engineering</strong> over marketing-heavy, service-based, or operationally complex businesses.
              </p>
              
              <h2>4. Solve Your Own Problems First → Reduce Complexity</h2>
              <p>
                The best way to stay small and independent is to <strong>be your own first user</strong>. Build tools that solve real problems <strong>you personally have</strong>—this keeps development focused, ensures product-market fit, and minimizes unnecessary complexity.
              </p>
              
              <h2>5. Start Small, Stay Small—Unless It Grows Right</h2>
              <p>
                Not every business needs to scale. <strong>Scaling complexity kills freedom.</strong> Instead, take a <em>Small Bets</em> approach—<strong>launch multiple small projects, iterate based on traction, and gradually build a portfolio of income-generating tools</strong>.
              </p>
              <ul>
                <li><strong>Keep it small:</strong> Automate or limit scope to maintain independence.</li>
                <li><strong>License it out:</strong> Open-source, partnerships, or ethical monetization.</li>
                <li><strong>Exit smartly:</strong> If scaling is inevitable, consider selling or making it self-sustaining.</li>
              </ul>
              
              <h2>6. Ethical Development → Build Open, Build for Impact</h2>
              <p>
                Software is information, and <strong>information should be free</strong>. As a solopreneur, this means <strong>building open-source tools</strong> that allow others to use, modify, and learn from them freely. Monetization should come from <strong>convenience, not control</strong>—charging for premium features, hosting, or ease-of-use, while keeping the core technology accessible.
              </p>
              <ul>
                <li><strong>Solve real problems</strong> (yours first, but useful to others).</li>
                <li><strong>Build in public (audience-driven):</strong> Share your process through <Link to="/blog" className="text-primary hover:underline">value-for-value content</Link> to give back to the community.</li>
                <li><strong>Make open-source sustainable:</strong> Ensure financial independence while contributing to a freer, more open software ecosystem.</li>
              </ul>
              
              <p className="quote mt-10 pt-6 border-t border-border">
                "The goal isn't to maximize income, it's to minimize the necessity of work."
              </p>
            </BlurEffect>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Entrepreneurship;
