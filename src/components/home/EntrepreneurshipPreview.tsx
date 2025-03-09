
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Lock, Tools, Code, Shrink, Heart } from 'lucide-react';
import BlurEffect from '../ui/BlurEffect';

interface ManifestoPointProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ManifestoPoint = ({ icon, title, description }: ManifestoPointProps) => (
  <div className="flex space-x-4">
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 flex-shrink-0 mt-1">
      {icon}
    </div>
    <div>
      <h3 className="font-serif text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const EntrepreneurshipPreview = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="lg:w-1/2 space-y-6">
            <BlurEffect>
              <p className="text-sm uppercase tracking-wider text-muted-foreground">The Solopreneur's Manifesto</p>
              <h2 className="heading-lg">Earning Time, Not Money</h2>
              <p className="body-md text-muted-foreground">
                Solopreneurship is about creating freedom—financial, mental, and creative—by minimizing the necessity of work rather than maximizing income.
              </p>
              <div className="pt-4">
                <Link 
                  to="/entrepreneurship" 
                  className="inline-flex items-center text-sm font-medium hover:underline group"
                >
                  Read the full manifesto
                  <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </BlurEffect>
          </div>
          
          <div className="lg:w-1/2">
            <div className="glass p-8">
              <div className="space-y-6">
                <ManifestoPoint 
                  icon={<Clock size={18} className="text-primary" />}
                  title="Lifestyle-Based"
                  description="Earn time, not money—create freedom to choose how you spend your life."
                />
                <ManifestoPoint 
                  icon={<Lock size={18} className="text-primary" />}
                  title="Bootstrapped"
                  description="Stay independent and lean—maintain full control over your time and vision."
                />
                <ManifestoPoint 
                  icon={<Tools size={18} className="text-primary" />}
                  title="Product-Focused"
                  description="Make things, not manage things—prioritize engineering over operations."
                />
                <ManifestoPoint 
                  icon={<Code size={18} className="text-primary" />}
                  title="Solve Your Own Problems"
                  description="Be your own first user—build tools that solve problems you personally have."
                />
                <ManifestoPoint 
                  icon={<Shrink size={18} className="text-primary" />}
                  title="Start Small, Stay Small"
                  description="Take a small bets approach—scaling complexity kills freedom."
                />
                <ManifestoPoint 
                  icon={<Heart size={18} className="text-primary" />}
                  title="Ethical Development"
                  description="Build open, build for impact—information should be free."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntrepreneurshipPreview;
