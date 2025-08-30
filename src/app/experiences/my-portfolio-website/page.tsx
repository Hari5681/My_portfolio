
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, Lightbulb, Construction, Zap, Trophy, GanttChartSquare, Wrench, Clock, BookOpen } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import { motion } from "framer-motion";
import { AnimatedBackButton } from "@/components/animated-back-button";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100
    },
  },
};

const Section = ({ icon: Icon, title, children }) => (
    <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold mb-4 text-accent flex items-center gap-3">
            <Icon className="w-6 h-6" />
            {title}
        </h3>
        {children}
    </motion.div>
);

export default function PortfolioExperiencePage() {
  const tools = [
    "AI Tools → for coding help, fixing bugs, and design suggestions",
    "Firebase Studio → for building and hosting",
    "Namecheap → for buying my domain hariportfolio.xyz (₹300+)",
    "Basic Web Tech → HTML, CSS, JavaScript",
    "GitHub → for saving versions of my work",
  ];

  const skills = [
    "How to use AI as a coding partner while still learning on my own",
    "Hosting a site and connecting it with a custom domain",
    "Debugging real runtime and server errors",
    "Managing deployment and configuration issues",
    "Patience and problem-solving — because nothing worked on the first try",
  ];

  const problems = [
    "Runtime & server errors during Firebase deployment",
    "Trouble setting up the Namecheap domain with Firebase (DNS & SSL)",
    "Layout breaking on desktop but fine on mobile",
    "Some AI-generated code didn’t work directly, so I had to adjust",
    "Took longer than expected — 30 days instead of a week",
  ];


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <AnimatedSection yPadding="pt-12 lg:pt-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="mb-8">
                  <AnimatedBackButton href="/experiences" />
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <Card className="bg-card/60 backdrop-blur-xl border-accent/20 shadow-2xl shadow-accent/10">
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-3xl font-bold text-accent animate-text-glow">
                      My Portfolio Website Journey
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 space-y-8">
                    
                    <Section icon={Lightbulb} title="Overview">
                        <p className="text-muted-foreground leading-relaxed">
                          As a beginner, I wanted to create my own portfolio site to show my skills and projects. I didn’t want to just copy a template, so I tried building it myself using AI tools and Firebase Studio. It wasn’t easy, and even though 30 days is more than enough for a site, that’s how long it took me — because I was learning step by step.
                        </p>
                    </Section>

                     <Section icon={Wrench} title="Tools I Used">
                        <ul className="space-y-3">
                          {tools.map((tool, index) => (
                            <motion.li key={index} variants={itemVariants} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                              <span className="text-muted-foreground">{tool}</span>
                            </motion.li>
                          ))}
                        </ul>
                    </Section>

                    <Section icon={BookOpen} title="Skills I Gained">
                        <ul className="space-y-3">
                          {skills.map((skill, index) => (
                            <motion.li key={index} variants={itemVariants} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                              <span className="text-muted-foreground">{skill}</span>
                            </motion.li>
                          ))}
                        </ul>
                    </Section>
                    
                     <Section icon={Zap} title="Problems I Faced">
                        <ul className="space-y-3">
                          {problems.map((problem, index) => (
                            <motion.li key={index} variants={itemVariants} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-destructive/70 mr-3 mt-1 flex-shrink-0" />
                              <span className="text-muted-foreground">{problem}</span>
                            </motion.li>
                          ))}
                        </ul>
                    </Section>

                    <Section icon={Trophy} title="Conclusion">
                       <p className="text-muted-foreground leading-relaxed">
                          Finally seeing <a href={`/redirect?url=${encodeURIComponent('https://hariportfolio.xyz')}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">hariportfolio.xyz</a> live felt worth it. As a beginner, I faced a lot of errors, but each one taught me something new. Using AI made the journey easier, but the real learning came from fixing mistakes and pushing through. This project gave me confidence that I can create things, even if they take time.
                        </p>
                    </Section>

                     <motion.div variants={itemVariants} className="pt-4 text-center">
                       <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-block"
                      >
                          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 animate-pulse-glow-accent shadow-lg shadow-accent/20">
                              <a href={`/redirect?url=${encodeURIComponent('https://hariportfolio.xyz')}`} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-5 w-5"/>
                                  Visit HariPortfolio.xyz
                              </a>
                          </Button>
                      </motion.div>
                    </motion.div>

                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
