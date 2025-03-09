
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlurEffect from '../ui/BlurEffect';

// Use just one of the notes provided with today's date for the latest blog post
const latestPost = {
  id: 1,
  title: "Beyond Happiness: Rethinking What Matters",
  summary: "A critique against the simplistic \"happiness agenda\".",
  date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
  category: "Ethics"
};

const BlogPreview = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="lg:w-1/2 space-y-6">
            <BlurEffect>
              <p className="text-sm uppercase tracking-wider text-muted-foreground">Blog</p>
              <h2 className="heading-lg">A playful journey</h2>
              <p className="body-md text-muted-foreground">
                A playful journey into the mysteries of the world—playing language games with ideas and concepts, all in my own words.
              </p>
              <div className="pt-4">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center text-sm font-medium hover:underline group"
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
                <Link to="/blog" className="block glass p-6 transition-transform hover:-translate-y-1">
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
