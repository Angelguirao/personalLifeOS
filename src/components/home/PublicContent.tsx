import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, Heart, User, Briefcase, Users, BookOpen, Cpu, Activity, Clock, Globe, HelpCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Section = ({ id, title, children, icon }) => {
  const Icon = icon;
  return (
    <motion.section 
      id={id}
      className="mb-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center mb-8 gap-3">
        <div className="bg-primary/5 p-2 rounded-full">
          <Icon size={20} className="text-primary" />
        </div>
        <h2 className="text-2xl font-serif font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="prose prose-lg max-w-none text-foreground space-y-6">
        {children}
      </div>
    </motion.section>
  );
};

const HighlightedLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="text-primary font-medium hover:underline decoration-primary decoration-2 underline-offset-4 transition-all"
  >
    {children}
  </Link>
);

const PublicContent = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="bg-gradient-to-br from-white to-purple-50/5 py-24 mt-[-20vh]">
      <div className="container-narrow mx-auto px-6 pt-[30vh]">
        <Section id="what-i-experience" title="What I Experience" icon={Brain}>
          <p className="text-foreground">
            Maybe identity isn't just a thought or an action—perhaps it's first and foremost a sensation. My existence is filtered through consciousness, an ongoing interplay of perception and awareness. The "what-it-is-like" of being me is an evolving state, shaped by emotions, sensations, and encounters with the world.
          </p>
          <p className="text-foreground">
            I explore this more deeply in my <HighlightedLink to="/consciousness">Consciousness Operating System</HighlightedLink> project, where I examine how subjective experience, awareness, and meaning intertwine.
          </p>
        </Section>

        <Section id="what-i-think" title="What I Think" icon={Lightbulb}>
          <p className="text-foreground">
            Maybe Descartes was onto something when he claimed, "I think, therefore I am." Ideas, I believe, are among the most powerful forces shaping the world—and my identity.
          </p>
          
          <p className="text-foreground">
            I find comfort in the contradiction between wanting to understand everything and recognizing that complete understanding is impossible. It's in this tension that I find the motivation to keep exploring, even when (especially when) I have no idea where I'm going.
          </p>
          
          <p className="text-foreground">
            I explore this further in my <HighlightedLink to="/cognition">Cognition Compass</HighlightedLink> project, where I use DSRP and other mental models for structuring information and making sense of complexity.
          </p>
        </Section>

        <Section id="what-i-value" title="What I Value & Strive For" icon={Heart}>
          <p className="text-foreground">
            Philosophy is my favorite playground, filled with questions that have no answers, too many answers, or answers that inevitably lead to more questions—the sort of intellectual adventures that can quickly clear a room.
          </p>
          
          <p className="text-foreground">
            Yet, despite this endless questioning, I have outlined a <HighlightedLink to="/philosophy">philosophy of life</HighlightedLink> that serves as a guiding framework. It weaves together my metaphysical, epistemological, ethical, political, and aesthetic perspectives, shaping how I navigate the world and make decisions.
          </p>
          
          <p className="text-foreground">
            Yet, beneath all this intellectual exploration and life's unavoidable constraints, what truly matters to me is nurturing beautiful and meaningful relationships with my wife, family, and friends.
          </p>
        </Section>

        <Section id="what-i-do" title="What I Do & How I Act" icon={Activity}>
          <p className="text-foreground">
            Maybe Aristotle had a point when he said we are what we repeatedly do, but then again, what I do keeps changing. Right now, my life revolves around reading extensively, distilling ideas into notes, and building digital products and micro-startups—endeavors that challenge me to think, create, and iterate.
          </p>
          <p className="text-foreground">
            But what I do isn't just a list of activities; it's also about how I do them. The way I engage with ideas, the discipline I bring to creation, and the care I put into my relationships all shape who I am. Identity isn't static—it's something formed and refined through <HighlightedLink to="/action">action</HighlightedLink>, decision, and habit.
          </p>
        </Section>

        <Section id="what-i-do-for-living" title="What I Do for a Living" icon={Briefcase}>
          <p className="text-foreground">
            Still, the phrase "what I do for a living" feels strangely limiting—as if work alone could define someone.
          </p>
          <p className="text-foreground"> 
            Although I studied law at university, I quickly discovered <HighlightedLink to="/entrepreneurship">entrepreneurship</HighlightedLink> as my natural habitat. I've launched a travel blog, bought and operated a mobile game app, created a litigation finance marketplace, and explored various other ventures. Throughout this journey, I've built and broken things, written and deleted things—continuously refining ideas.
          </p>
          <p className="text-foreground">
            Later, I worked as a venture analyst in a venture builder, where I learned the ins and outs of startup ecosystems.
          </p>
          <p className="text-foreground">
            And right now I also work as a software engineer in startup environments, because why not add more chaos to the mix?
          </p>
          {!isAuthenticated && (
            <p className="text-foreground">
              The survivors of this ongoing experimentation are what you'll find on my <HighlightedLink to="/projects">Projects page</HighlightedLink>.
            </p>
          )}
        </Section>

        <Section id="who-i-am-in-relation" title="Who I Am in Relation to Others" icon={Users}>
          {isAuthenticated ? (
            <>
              <p className="text-foreground">
                The relationships you nurture are an integral part of your identity. Your Life OS includes tools to help you map, nurture, and deepen these connections, creating a network of meaningful relationships that support your growth and well-being.
              </p>
              <p className="text-foreground">
                Use the <HighlightedLink to="/">home page</HighlightedLink> to access your public persona and see how others experience your online presence.
              </p>
            </>
          ) : (
            <>
              <p className="text-foreground">
                Identity is never built in isolation. My sense of self is shaped through friendships, family, and cultural influences. The connections I form and nurture are an essential part of who I am, creating a web of relationships that both ground and challenge me.
              </p>
              <p className="text-foreground">
                You can <HighlightedLink to="/connect">connect with me</HighlightedLink> through various channels if you'd like to become part of this ongoing conversation about life, ideas, and the fascinating complexity of being human.
              </p>
            </>
          )}
        </Section>

        <Section id="how-tools-shape-me" title="How My Tools & Extensions Shape Me" icon={Cpu}>
          <p className="text-foreground">
            We are no longer just our minds and bodies; we are our tools, our data, and our digital selves. Technology is an extension of identity, shaping how we think, remember, and interact. The digital systems I build and use are not separate from me—they are part of how I navigate reality.
          </p>
        </Section>

        <Section id="what-body-says" title="What My Body & Biology Say About Me" icon={User}>
          <p className="text-foreground">
            Embodiment shapes identity. My body isn't just a vessel—it's an active participant in how I experience the world. Movement, sensation, and health influence my sense of self in ways both subtle and profound. Living with Type 1 Diabetes has made this transparency unavoidable, a daily reminder that identity is not only thought but chosen but lived.
          </p>
        </Section>

        <Section id="who-i-am-over-time" title="The Story I Tell Myself" icon={Clock}>
          <p className="text-foreground">
            I am not static. None of us are. The past me, the present me, and the future me may have little in common, but they are somehow linked in an ongoing process of change. My identity is an unfolding story, and while I may not control every twist in the plot, I am, to some extent, its co-author.
          </p>
        </Section>

        <Section id="so-who-am-i" title="So, Who Am I?" icon={HelpCircle}>
          <p className="text-foreground">
            I have no idea. And I'm increasingly convinced that having no idea is the most honest position to take. I am a collection of experiences, influences, contradictions, and questions—constantly changing, rarely consistent, and perpetually curious.
          </p>
          <p className="text-foreground">
            If that sounds like a cop-out, you're probably right. But it's the most truthful cop-out I can offer. Maybe next year I'll have a more coherent story.
          </p>
        </Section>
      </div>
    </div>
  );
};

export default PublicContent;
