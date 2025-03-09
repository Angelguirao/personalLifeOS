
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlurEffect from '../ui/BlurEffect';

// Use the most recent blog post
const latestPost = {
  id: 1,
  title: "Beyond Happiness: Rethinking What Matters",
  summary: "The global pursuit of happiness overlooks justice and equality. Against Happiness by Owen Flanagan and co-authors critiques the simplistic 'happiness agenda,' urging us to rethink what truly makes a life worth living. Time to prioritize deeper values.",
  date: "2024-09-01T10:23:00", // Updated date
  category: "Ethics"
};

const BlogPreview = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="lg:w-1/2 space-y-6">
            <BlurEffect>
              <h2 className="heading-lg">Blog</h2>
              <p className="body-md text-muted-foreground">
                A written journey into the mysteries of the world—playing language games with ideas and concepts, all in my own words.
              </p>
              <div className="pt-4">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center text-sm font-medium hover:underline group"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Read all entries
                  <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </BlurEffect>
          </div>
          
          <div className="lg:w-1/2">
            <div className="space-y-5">
              <BlurEffect className="animation-delay-100">
                <Link 
                  to="/blog" 
                  className="block glass p-6 transition-transform hover:-translate-y-1"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="mb-2 flex items-center text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{latestPost.category}</span>
                    <span className="mx-2">•</span>
                    <time dateTime={latestPost.date}>{new Date(latestPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>
                  
                  <h3 className="font-serif text-lg font-semibold mb-2">{latestPost.title}</h3>
                  <p className="text-sm text-muted-foreground">{latestPost.summary}</p>
                  <div className="mt-3">
                    <span className="text-xs font-medium text-primary hover:underline">Read more</span>
                  </div>
                </Link>
              </BlurEffect>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
