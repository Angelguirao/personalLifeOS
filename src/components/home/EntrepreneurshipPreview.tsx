
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
  <div className={cn("flex space-x-3 p-4 rounded-lg bg-white/40 backdrop-blur-sm border border-primary/5 hover:border-primary/10 transition-all duration-300 shadow-sm", className)}>
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 flex-shrink-0 text-primary">
      {icon}
    </div>
    <div>
      <h3 className="font-serif text-base font-semibold mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

const EntrepreneurshipPreview = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-background to-amber-50/30">
      {/* Background decorative elements */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-50/40 top-20 -right-64 blur-3xl pointer-events-none"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-amber-50/30 -bottom-32 -left-32 blur-3xl pointer-events-none"></div>
      
      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <BlurEffect>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-2">
                <Zap size={16} className="inline-block mr-1 mb-0.5" />
                The Solopreneur's Manifesto
              </div>
              <h2 className="heading-lg">Earning Time, Not Money</h2>
              <p className="body-md text-muted-foreground mt-4">
                Prioritizing freedom through smart, independent work.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                I view entrepreneurship as a path to freedom—creating space for exploration and connection 
                by building lean, purposeful products that minimize unnecessary work.
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
          
          <div>
            <div className="grid grid-cols-2 gap-3">
              <ManifestoPoint 
                icon={<Clock size={18} />}
                title="Lifestyle-Based"
                description="Earn time, not money—prioritize freedom."
                className="col-span-2"
              />
              <ManifestoPoint 
                icon={<Lock size={18} />}
                title="Bootstrapped"
                description="Stay independent—maintain full control."
              />
              <ManifestoPoint 
                icon={<Wrench size={18} />}
                title="Product-Focused"
                description="Make things, not manage things."
              />
              <ManifestoPoint 
                icon={<Code size={18} />}
                title="Solve Your Problems"
                description="Be your own first user and customer."
              />
              <ManifestoPoint 
                icon={<Shrink size={18} />}
                title="Start Small"
                description="Take small bets—avoid scaling complexity."
              />
              <ManifestoPoint 
                icon={<Heart size={18} />}
                title="Build Open"
                description="Create for impact—share information freely."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntrepreneurshipPreview;
