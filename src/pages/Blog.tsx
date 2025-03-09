
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft, Feather } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealText from '../components/ui/RevealText';
import BlurEffect from '../components/ui/BlurEffect';

const blogPosts = [
  {
    id: 1,
    title: "Beyond Happiness: Rethinking What Matters",
    summary: "The global pursuit of happiness overlooks justice and equality. Against Happiness by Owen Flanagan and co-authors critiques the simplistic 'happiness agenda,' urging us to rethink what truly makes a life worth living. Time to prioritize deeper values.",
    date: new Date().toISOString().split('T')[0], // Today's date
    category: "Reflection",
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "Humanity's Future: Transform, Not Extinct",
    summary: "Todd May's Should We Go Extinct? provokes deep reflection on humanity's future. What if the answer lies not in our extinction, but in transforming how we live—by valuing nature as part of ourselves?",
    date: "2023-12-10", // Earlier date
    category: "Philosophy",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Knowledge as Ethical Solidarity",
    summary: "Richard Rorty's book 'Objectivity, Relativism, and Truth' is a reminder that the heart of inquiry is ethical solidarity, not an objective endpoint. What if our pursuit of knowledge is really about how we relate to each other?",
    date: "2023-11-25", // Earlier date
    category: "Ethics",
    readTime: "5 min read"
  },
  {
    id: 4,
    title: "Reclaiming Reflection in a Thoughtless Age",
    summary: "In an age of thoughtless actions, Arendt's The Human Condition urges us to reclaim our capacity for reflection. Are we mindlessly drifting, or consciously shaping our world?",
    date: "2023-11-15", // Earlier date
    category: "Society",
    readTime: "4 min read"
  },
  {
    id: 5,
    title: "The Beautiful Mystery of Truth",
    summary: "From divine to scientific, our pursuit of certainty reflects a deeper need. But truth, shaped by our consciousness, remains a mystery we cannot fully grasp. To truly evolve, we must embrace skepticism and the beauty of uncertainty.",
    date: "2023-10-30", // Earlier date
    category: "Epistemology",
    readTime: "6 min read"
  }
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
              <RevealText>Blog</RevealText>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              An open-ended, playful exploration of the mysteries of the world. 
              These entries represent my ongoing journey to understand the deeper questions 
              of existence, consciousness, and what it means to be human.
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
