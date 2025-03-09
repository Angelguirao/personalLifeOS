
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
    title: "Humanity's Future: Transform, Not Extinct",
    summary: "Todd May's Should We Go Extinct? provokes deep reflection on humanity's future. What if the answer lies not in our extinction, but in transforming how we live—by valuing nature as part of ourselves?",
    date: "2024-09-01T10:23:00",
    category: "Ethics",
    status: "WIP",
    link: "https://x.com/civicCogitation/status/1830159600789676137?t=8jw3paoyT7eez4RESUTa2Q&s=03",
    bookInfo: {
      title: "Should We Go Extinct?",
      author: "Todd May",
      link: "https://openlibrary.org/works/OL37629912W/Should_We_Go_Extinct?edition=key%3A/books/OL50735111M"
    }
  },
  {
    id: 2,
    title: "Knowledge as Ethical Solidarity",
    summary: "Richard Rorty's book \"Contingency, irony, and solidarity\" is a reminder that the heart of inquiry is ethical solidarity, not an objective endpoint. What if our pursuit of knowledge is really about how we relate to each other?",
    date: "2024-08-31T10:03:00",
    category: "Ethics",
    status: "WIP",
    link: "https://x.com/civicCogitation/status/1829792194984607757?t=ay3pL0O04MtGsL2lPrwOig&s=03",
    bookInfo: {
      title: "Contingency, irony, and solidarity",
      author: "Richard Rorty",
      link: "https://openlibrary.org/works/OL2018373W/Contingency_irony_and_solidarity?edition=key%3A/books/OL23241517M"
    }
  },
  {
    id: 3,
    title: "Reclaiming Reflection in a Thoughtless Age",
    summary: "In an age of thoughtless actions, Arendt's The Human Condition urges us to reclaim our capacity for reflection. Are we mindlessly drifting, or consciously shaping our world?",
    date: "2024-08-29T07:33:00",
    category: "Ethics",
    status: "WIP",
    link: "https://x.com/civicCogitation/status/1829029665849106459?t=UpuT23V8_pDRZ3bXkpxD9w&s=03",
    bookInfo: {
      title: "The Human Condition",
      author: "Hannah Arendt",
      link: "https://openlibrary.org/works/OL10460638W/The_Human_Condition?edition=key%3A/books/OL14968018M"
    }
  },
  {
    id: 4,
    title: "The Beautiful Mystery of Truth",
    summary: "From divine to scientific, our pursuit of certainty reflects a deeper need. But truth, shaped by our consciousness, remains a mystery we cannot fully grasp. To truly evolve, we must embrace skepticism and the beauty of uncertainty.",
    date: "2024-08-29T00:13:00",
    category: "Ethics",
    status: "WIP",
    link: "https://x.com/civicCogitation/status/1828918892908986566?t=xCTNH7zA12VxTKlz_68YTA&s=03"
  },
  {
    id: 5,
    title: "Beyond Happiness: Rethinking What Matters",
    summary: "The global pursuit of happiness overlooks justice and equality. Against Happiness by Owen Flanagan and co-authors critiques the simplistic 'happiness agenda,' urging us to rethink what truly makes a life worth living. Time to prioritize deeper values.",
    date: "2024-09-01T10:23:00",
    category: "Ethics",
    status: "WIP",
    link: "https://x.com/civicCogitation/status/1830159600789676137?t=8jw3paoyT7eez4RESUTa2Q&s=03",
    bookInfo: {
      title: "Against Happiness",
      author: "Owen Flanagan",
      link: "https://openlibrary.org/works/OL34335891W/Against_Happiness?edition=key%3A/books/OL46566568M"
    }
  }
];

// Sort posts by date (newest first)
const sortedPosts = [...blogPosts].sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
);

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
              A written journey into the mysteries of the world—playing language games with ideas and concepts, all in my own words.
            </p>
          </div>
          
          <div className="space-y-10">
            {sortedPosts.map((post) => (
              <BlurEffect key={post.id} className={`animation-delay-${post.id * 100}`}>
                <article className="glass p-8 transition-transform hover:-translate-y-1">
                  <div className="mb-3 flex items-center text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{post.category}</span>
                    <span className="mx-2">•</span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{post.status}</span>
                  </div>
                  
                  <h2 className="font-serif text-xl font-semibold mb-3">
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      {post.title}
                    </a>
                  </h2>
                  
                  <p className="text-muted-foreground mb-4">
                    {post.summary.includes(post.bookInfo?.author) ? (
                      <>
                        {post.summary.split(post.bookInfo.title)[0]}
                        <a 
                          href={post.bookInfo.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {post.bookInfo.title}
                        </a>
                        {post.summary.split(post.bookInfo.title)[1]}
                      </>
                    ) : post.bookInfo ? (
                      <>
                        {post.summary.split(post.bookInfo.author)[0]}
                        <a 
                          href={post.bookInfo.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {post.bookInfo.author}
                        </a>
                        {post.summary.split(post.bookInfo.author)[1]}
                      </>
                    ) : (
                      post.summary
                    )}
                  </p>
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
