
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, Lightbulb, Construction, Zap, Trophy, GanttChartSquare, Wrench, BookOpen } from "lucide-react";
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

export default function PortfolioProjectPage() {
  const tools = [
    "Firebase Studio → for building and hosting",
    "Namecheap → domain setup (hariportfolio.xyz)",
    "HTML, CSS, JavaScript → the basics of frontend",
    "GitHub → to save my work safely",
  ];

  const skills = [
    "How to host a website and connect it to a custom domain",
    "Fixing runtime and server errors (trust me, there were many)",
    "Designing pages that work both on mobile and desktop",
    "Debugging, patience, and the value of small wins",
    "That finishing something is way more important than being perfect",
  ];

  const problems = [
    "Firebase gave me server errors again and again during hosting",
    "My domain setup kept failing until I finally figured out DNS & SSL",
    "Layout looked fine on my phone but broke completely on desktop 🤦‍♂️",
    "Deployment failed multiple times — had to recheck configs and files",
    "Took 30 days instead of a week because I was learning from scratch",
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
                  <AnimatedBackButton href="/projects" />
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
                      My Portfolio Website Story – hariportfolio.xyz
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 space-y-8">
                    
                    <Section icon={Lightbulb} title="Overview">
                        <p className="text-muted-foreground leading-relaxed">
                          When I started working on my portfolio site, I honestly had no idea how many errors I was about to face 😅. I just wanted a simple website where I could show my projects, skills, and journey as a beginner. But step by step, this project turned into one of my biggest learning experiences.
                          <br/><br/>
                          It took me almost 30 days (yeah, way longer than it should have) because I was learning everything as I went. I built it using Firebase Studio, and I bought my first-ever custom domain from Namecheap for about ₹300+ — that’s how hariportfolio.xyz was born.
                        </p>
                    </Section>

                    <Section icon={Wrench} title="What I Used">
                        <ul className="space-y-3">
                          {tools.map((tool, index) => (
                            <motion.li key={index} variants={itemVariants} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                              <span className="text-muted-foreground">{tool}</span>
                            </motion.li>
                          ))}
                        </ul>
                    </Section>

                    <Section icon={BookOpen} title="What I Learned">
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

                    <Section icon={Trophy} title="How It Felt in the End">
                       <p className="text-muted-foreground leading-relaxed">
                          The moment I typed hariportfolio.xyz into my browser and saw my site live, it felt amazing 🎉. It wasn’t just a website — it was proof that I could actually build something real on my own. This project gave me confidence, taught me how to face errors without giving up, and reminded me that every beginner has to start somewhere. For me, this portfolio is not just a site — it’s my first step as a developer and a piece of my journey that I’ll always remember.
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
