
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Lock, Wrench, Code, Shrink, Heart, Zap } from 'lucide-react';
import BlurEffect from '../ui/BlurEffect';
import { cn } from "@/lib/utils";

interface ManifestoPointProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const ManifestoPoint = ({ icon, title, description, className }: ManifestoPointProps) => (
  <div className={cn("flex space-x-4 p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300", className)}>
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 flex-shrink-0 mt-1 text-primary shadow-sm">
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
    <section className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-50/30 top-20 -right-64 blur-3xl pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-50/20 -bottom-64 -left-64 blur-3xl pointer-events-none"></div>
      
      <div className="container-wide relative">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-2/5 space-y-6">
            <BlurEffect>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-2">
                <Zap size={16} className="inline-block mr-1 mb-0.5" />
                Entrepreneurship Philosophy
              </div>
              <h2 className="heading-lg">The Solopreneur's Manifesto</h2>
              <p className="body-md text-muted-foreground mt-4">
                Prioritizing Freedom Through Entrepreneurship
              </p>
              <p className="text-muted-foreground mt-2">
                Recognizing that human life is inherently limited by time and that traditional work often consumes a disproportionate share, I currently prioritize entrepreneurship—particularly solopreneurship—as a means of eliminating unnecessary work. This focus allows me to cultivate greater freedom, enabling broader exploration and deeper connection aligned with my philosophy of life.
              </p>
              <div className="pt-4">
                <Link 
                  to="/entrepreneurship" 
                  className="inline-flex items-center text-sm font-medium px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors group"
                >
                  Read the full manifesto
                  <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </BlurEffect>
          </div>
          
          <div className="lg:w-3/5">
            <div className="glass p-8 border border-primary/10 shadow-lg">
              <h3 className="text-2xl font-serif mb-6 text-center font-bold">Earning Time, Not Money</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ManifestoPoint 
                  icon={<Clock size={20} />}
                  title="Lifestyle-Based"
                  description="Earn time, not money—create freedom to choose how you spend your life."
                  className="md:col-span-2"
                />
                <ManifestoPoint 
                  icon={<Lock size={20} />}
                  title="Bootstrapped"
                  description="Stay independent and lean—maintain full control over your time and vision."
                />
                <ManifestoPoint 
                  icon={<Wrench size={20} />}
                  title="Product-Focused"
                  description="Make things, not manage things—prioritize engineering over operations."
                />
                <ManifestoPoint 
                  icon={<Code size={20} />}
                  title="Solve Your Own Problems"
                  description="Be your own first user—build tools that solve problems you personally have."
                />
                <ManifestoPoint 
                  icon={<Shrink size={20} />}
                  title="Start Small, Stay Small"
                  description="Take a small bets approach—scaling complexity kills freedom."
                />
                <ManifestoPoint 
                  icon={<Heart size={20} />}
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
