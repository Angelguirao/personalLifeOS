
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Brain, Heart, User, Briefcase, Users, BookOpen, Cpu, Activity, Clock, Globe, HelpCircle } from 'lucide-react';

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
      <div className="flex items-center mb-6 gap-3">
        <div className="bg-primary/5 p-2 rounded-full">
          <Icon size={18} className="text-primary" />
        </div>
        <h2 className="text-2xl font-serif font-semibold tracking-tight">{title}</h2>
      </div>
      <Card className="bg-white/60 backdrop-blur-sm border-none shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6 sm:p-8">
          <div className="prose prose-lg max-w-none text-muted-foreground">
            {children}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

const PublicContent = () => {
  return (
    <div className="bg-gradient-to-br from-white to-purple-50/5 py-20">
      <div className="container-narrow mx-auto">
        <Section id="what-i-experience" title="What I Experience" icon={Brain}>
          <p>
            Maybe identity isn't just a thought or an action—perhaps it's first and foremost a sensation. My existence is filtered through consciousness, an ongoing interplay of perception and awareness. The "what-it-is-like" of being me is an evolving state, shaped by emotions, sensations, and encounters with the world.
          </p>
          <p>
            I explore this more deeply in my Consciousness Operating System project, where I examine how subjective experience, awareness, and meaning intertwine.
          </p>
        </Section>

        <Section id="what-i-think" title="What I Think" icon={Lightbulb}>
          <p>
            Maybe Descartes was onto something when he claimed, "I think, therefore I am." Ideas, I believe, are among the most powerful forces shaping the world—and my identity. I find comfort in the contradiction between wanting to understand everything and recognizing that complete understanding is impossible. It's in this tension that I find the motivation to keep exploring, even when (especially when) I have no idea where I'm going.
          </p>
          <p>
            I explore this further in my Cognition Compass project, where I map out frameworks for thinking, perception, and structured knowledge.
          </p>
        </Section>

        <Section id="what-i-value" title="What I Value & Strive For" icon={Heart}>
          <p>
            Philosophy is my favorite playground, filled with questions that have no answers, too many answers, or answers that inevitably lead to more questions—the sort of intellectual adventures that can quickly clear a room. Yet, despite this endless questioning, I have outlined a philosophy of life that serves as a guiding framework. It weaves together my metaphysical, epistemological, ethical, political, and aesthetic perspectives, shaping how I navigate the world and make decisions. Yet, beneath all this intellectual exploration and life's unavoidable constraints, what truly matters to me is nurturing beautiful and meaningful relationships with my wife, family, and friends.
          </p>
          <p>
            <Link to="/philosophy" className="text-primary hover:underline">Explore more in my Philosophy of Life.</Link>
          </p>
        </Section>

        <Section id="what-i-do" title="What I Do & How I Act" icon={Activity}>
          <p>
            Maybe Aristotle had a point when he said we are what we repeatedly do, but then again, what I do keeps changing. Right now, my life revolves around reading extensively, distilling ideas into notes, and building digital products and micro-startups—endeavors that challenge me to think, create, and iterate.
          </p>
          <p>
            But what I do isn't just a list of activities; it's also about how I do them. The way I engage with ideas, the discipline I bring to creation, and the care I put into my relationships all shape who I am. Identity isn't static—it's something formed and refined through action, decision, and habit.
          </p>
        </Section>

        <Section id="what-i-do-for-living" title="What I Do for a Living" icon={Briefcase}>
          <p>
            Still, the phrase "what I do for a living" feels strangely limiting—as if work alone could define someone. Although I studied law at university, I quickly discovered entrepreneurship as my natural habitat. I've launched a travel blog, bought and operated a mobile game app, created a litigation finance marketplace, and explored various other ventures. Later, I worked as a venture analyst in a venture builder, where I learned the ins and outs of startup ecosystems.
          </p>
          <p>
            Throughout this journey, I've built and broken things, written and deleted things—continuously refining ideas. The survivors of this ongoing experimentation are what you'll find on my <Link to="/projects" className="text-primary hover:underline">Projects page</Link>.
          </p>
          <p>
            I also work as a software engineer in startup environments, because why not add more chaos to the mix?
          </p>
        </Section>

        <Section id="who-i-am-in-relation" title="Who I Am in Relation to Others" icon={Users}>
          <p>
            Identity is never built in isolation. My sense of self is shaped through friendships, family, and cultural influences.
          </p>
        </Section>

        <Section id="the-story-i-tell" title="The Story I Tell About Myself" icon={BookOpen}>
          <p>
            This is usually the part where I'd neatly weave together a narrative about who I am, but truthfully, I'm not entirely sure what "I" even means—whether there's a fixed self or just an ever-changing collection of experiences. And you know what? That's perfectly fine! Life's too brief to take identity crises too seriously.
          </p>
          <p>
            Identity is not just what happens to me but how I interpret it. The stories I tell—to myself and to the world—shape who I am. Maybe that's why I resist defining myself too neatly. To claim a single, fixed identity would be to close off possibilities, to commit to a version of myself that might not exist tomorrow.
          </p>
        </Section>

        <Section id="how-tools-shape-me" title="How My Tools & Extensions Shape Me" icon={Cpu}>
          <p>
            We are no longer just our minds and bodies; we are our tools, our data, and our digital selves. Technology is an extension of identity, shaping how we think, remember, and interact. The digital systems I build and use are not separate from me—they are part of how I navigate reality.
          </p>
        </Section>

        <Section id="what-body-says" title="What My Body & Biology Say About Me" icon={User}>
          <p>
            Embodiment shapes identity. My body isn't just a vessel—it's an active participant in how I experience the world. Movement, sensation, and health influence my sense of self in ways both subtle and profound. Living with Type 1 Diabetes has made this transparency unavoidable, a daily reminder that identity is not only thought but chosen but lived.
          </p>
        </Section>

        <Section id="who-i-am-over-time" title="Who I Am Over Time" icon={Clock}>
          <p>
            I am not static. None of us are. The past me, the present me, and the future me may have little in common, but they are somehow linked in an ongoing process of change. My identity is an unfolding story, and while I may not control every twist in the plot, I am, to some extent, its co-author.
          </p>
        </Section>

        <Section id="who-i-am-grand-scheme" title="Who I Am in the Grand Scheme of Things" icon={Globe}>
          <p>
            The existential question looms large: who am I, really? Some traditions suggest the self is an illusion, a fleeting construct. Others argue for an enduring essence. I don't claim to have the answer. What I do know is that I am a process, not a product.
          </p>
        </Section>

        <Section id="so-who-am-i" title="So, Who Am I?" icon={HelpCircle}>
          <p>
            I have no idea. And I'm increasingly convinced that having no idea is the most honest position to take. I am a collection of experiences, influences, contradictions, and questions—constantly changing, rarely consistent, and perpetually curious.
          </p>
          <p>
            If that sounds like a cop-out, you're probably right. But it's the most truthful cop-out I can offer. Maybe next year I'll have a more coherent story.
          </p>
        </Section>
      </div>
    </div>
  );
};

export default PublicContent;
