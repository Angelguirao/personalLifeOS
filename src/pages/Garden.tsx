
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft, Sprout, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealText from '../components/ui/RevealText';
import BlurEffect from '../components/ui/BlurEffect';

const gardenNotes = [
  {
    id: 1,
    title: "Humanity's Future: Transform, Not Extinct",
    summary: "Todd May's Should We Go Extinct? provokes deep reflection on humanity's future. What if the answer lies not in our extinction, but in transforming how we live—by valuing nature as part of ourselves?",
    stage: "seedling",
    lastUpdated: "2024-09-01",
    connections: ["ethics", "humanity", "environment"],
    bookInfo: {
      title: "Should We Go Extinct?",
      author: "Todd May",
      link: "https://openlibrary.org/works/OL37629912W/Should_We_Go_Extinct?edition=key%3A/books/OL50735111M"
    }
  },
  {
    id: 2,
    title: "Beyond Happiness: Rethinking What Matters",
    summary: "The global pursuit of happiness overlooks justice and equality. Against Happiness by Owen Flanagan and co-authors critiques the simplistic 'happiness agenda,' urging us to rethink what truly makes a life worth living. Time to prioritize deeper values.",
    stage: "seedling",
    lastUpdated: "2024-09-01",
    connections: ["ethics", "happiness", "values"],
    bookInfo: {
      title: "Against Happiness",
      author: "Owen Flanagan",
      link: "https://openlibrary.org/works/OL34335891W/Against_Happiness?edition=key%3A/books/OL46566568M"
    }
  },
  {
    id: 3,
    title: "Knowledge as Ethical Solidarity",
    summary: "Richard Rorty's book \"Contingency, irony, and solidarity\" is a reminder that the heart of inquiry is ethical solidarity, not an objective endpoint. What if our pursuit of knowledge is really about how we relate to each other?",
    stage: "seedling",
    lastUpdated: "2024-08-31",
    connections: ["ethics", "knowledge", "solidarity"],
    bookInfo: {
      title: "Contingency, irony, and solidarity",
      author: "Richard Rorty",
      link: "https://openlibrary.org/works/OL2018373W/Contingency_irony_and_solidarity?edition=key%3A/books/OL23241517M"
    }
  },
  {
    id: 4,
    title: "Reclaiming Reflection in a Thoughtless Age",
    summary: "In an age of thoughtless actions, Arendt's The Human Condition urges us to reclaim our capacity for reflection. Are we mindlessly drifting, or consciously shaping our world?",
    stage: "seedling",
    lastUpdated: "2024-08-29",
    connections: ["ethics", "reflection", "consciousness"],
    bookInfo: {
      title: "The Human Condition",
      author: "Hannah Arendt",
      link: "https://openlibrary.org/works/OL10460638W/The_Human_Condition?edition=key%3A/books/OL14968018M"
    }
  },
  {
    id: 5,
    title: "The Beautiful Mystery of Truth",
    summary: "From divine to scientific, our pursuit of certainty reflects a deeper need. But truth, shaped by our consciousness, remains a mystery we cannot fully grasp. To truly evolve, we must embrace skepticism and the beauty of uncertainty.",
    stage: "seedling",
    lastUpdated: "2024-08-29",
    connections: ["truth", "consciousness", "uncertainty"],
  }
];

const getStageIcon = (stage: string) => {
  switch(stage) {
    case "seedling":
      return <Sprout size={16} className="text-green-400" />;
    case "growing":
      return <Sprout size={16} className="text-green-500" />;
    case "evergreen":
      return <Sprout size={16} className="text-green-600" />;
    default:
      return <Sprout size={16} />;
  }
};

const Garden = () => {
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium mb-2">
              <Sprout size={12} className="mr-1" />
              Philosophy & Ethics
            </div>
            <h1 className="heading-lg">
              <RevealText>Digital Garden</RevealText>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Unlike a traditional blog, this digital garden is a living collection of interconnected ideas, 
              notes, and explorations. It grows organically over time and represents my continuous learning journey.
              In the future, I intend to make it graph based for non-linear exploration and interconnectedness.
            </p>
          </div>
          
          <div className="mb-10 glass p-4 border-l-4 border-green-500">
            <h3 className="font-serif text-sm font-semibold mb-1">How to navigate this garden:</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-center">
                <Sprout size={12} className="text-green-400 mr-2" /> 
                <span><strong>Seedlings</strong>: Early-stage ideas, still taking shape</span>
              </li>
              <li className="flex items-center">
                <Sprout size={12} className="text-green-500 mr-2" /> 
                <span><strong>Growing</strong>: Developing thoughts with some substantial content</span>
              </li>
              <li className="flex items-center">
                <Sprout size={12} className="text-green-600 mr-2" /> 
                <span><strong>Evergreen</strong>: Well-developed, mature ideas</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-10">
            {gardenNotes.map((note) => (
              <BlurEffect key={note.id} className={`animation-delay-${note.id * 100}`}>
                <article className="glass p-8 transition-transform hover:-translate-y-1">
                  <div className="mb-3 flex items-center text-xs text-muted-foreground">
                    <div className="flex items-center">
                      {getStageIcon(note.stage)}
                      <span className="ml-1 capitalize">{note.stage}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <time dateTime={note.lastUpdated}>Updated: {new Date(note.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>
                  
                  <h2 className="font-serif text-xl font-semibold mb-3">
                    {note.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4">
                    {note.bookInfo ? (
                      <>
                        {note.summary.split(note.bookInfo.title)[0]}
                        <a 
                          href={note.bookInfo.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {note.bookInfo.title}
                        </a>
                        {note.summary.split(note.bookInfo.title)[1]}
                      </>
                    ) : (
                      note.summary
                    )}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {note.connections.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs">
                        <Link2 size={10} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
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

export default Garden;
