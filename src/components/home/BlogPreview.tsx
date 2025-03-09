
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlurEffect from '../ui/BlurEffect';

const featuredPosts = [
  {
    id: 1,
    title: "The Ethics of Artificial Intelligence",
    summary: "Exploring the moral implications of AI systems.",
    date: "2023-12-15",
    category: "Ethics"
  },
  {
    id: 2,
    title: "Freedom Through Entrepreneurship",
    summary: "How building your own ventures creates personal freedom.",
    date: "2023-11-30",
    category: "Entrepreneurship"
  }
];

const BlogPreview = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="lg:w-1/2 space-y-6">
            <BlurEffect>
              <p className="text-sm uppercase tracking-wider text-muted-foreground">Ideas & Essays</p>
              <h2 className="heading-lg">Exploring Philosophy & Technology</h2>
              <p className="body-md text-muted-foreground">
                Essays on philosophy, technology, ethics, and entrepreneurship—exploring how these fields interconnect and shape our understanding of the world.
              </p>
              <div className="pt-4">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center text-sm font-medium hover:underline group"
                >
                  Read all essays
                  <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </BlurEffect>
          </div>
          
          <div className="lg:w-1/2">
            <div className="space-y-5">
              {featuredPosts.map((post, index) => (
                <BlurEffect key={post.id} className={`animation-delay-${(index + 1) * 100}`}>
                  <Link to={`/blog/${post.id}`} className="block glass p-6 transition-transform hover:-translate-y-1">
                    <div className="mb-2 flex items-center text-xs text-muted-foreground">
                      <span className="font-medium text-primary">{post.category}</span>
                      <span className="mx-2">•</span>
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    </div>
                    
                    <h3 className="font-serif text-lg font-semibold mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.summary}</p>
                  </Link>
                </BlurEffect>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
