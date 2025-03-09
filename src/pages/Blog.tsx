
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealText from '../components/ui/RevealText';
import BlurEffect from '../components/ui/BlurEffect';

const blogPosts = [
  {
    id: 1,
    title: "The Ethics of Artificial Intelligence",
    summary: "Exploring the moral implications of developing increasingly autonomous AI systems and their impact on society.",
    date: "2023-12-15",
    category: "Ethics",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Freedom Through Entrepreneurship",
    summary: "How building your own ventures can create the ultimate personal freedom when approached with the right mindset.",
    date: "2023-11-30",
    category: "Entrepreneurship",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "The Value of Interdisciplinary Thinking",
    summary: "Why crossing boundaries between fields is essential for innovation and deeper understanding in the modern world.",
    date: "2023-11-10",
    category: "Philosophy",
    readTime: "10 min read"
  },
];

const Blog = () => {
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
              <RevealText>Ideas & Essays</RevealText>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              A collection of my thoughts on philosophy, technology, ethics, and entrepreneurship. 
              These essays represent my ongoing exploration of ideas that shape how we understand and interact with the world.
            </p>
          </div>
          
          <div className="space-y-10">
            {blogPosts.map((post) => (
              <BlurEffect key={post.id} className={`animation-delay-${post.id * 100}`}>
                <article className="glass p-8 transition-transform hover:-translate-y-1">
                  <div className="mb-3 flex items-center text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{post.category}</span>
                    <span className="mx-2">•</span>
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="font-serif text-xl font-semibold mb-3">
                    <Link to={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-muted-foreground mb-4">{post.summary}</p>
                  
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="text-sm font-medium text-primary hover:underline inline-flex items-center"
                  >
                    Read more
                    <ArrowLeft size={14} className="ml-1 rotate-180" />
                  </Link>
                </article>
              </BlurEffect>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
