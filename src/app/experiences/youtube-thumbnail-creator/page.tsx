
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, Lightbulb, Zap, Trophy, Brush, Palette, BookOpen, Wrench } from "lucide-react";
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

export default function ThumbnailExperiencePage() {
  const tools = [
    "Canva / Photoshop → for editing and designing",
    "Stock images & icons → to make thumbnails attractive",
    "Color palettes & fonts → to keep a consistent look",
  ];

  const skills = [
    "How important thumbnails are for catching attention",
    "Choosing the right colors, fonts, and layouts",
    "Keeping designs simple but effective",
    "Making the main subject stand out clearly",
  ];

  const problems = [
    "Sometimes my thumbnails looked too plain, sometimes too crowded 😅",
    "Getting the right balance between text and images",
    "Making sure the design stays sharp and high-quality after export",
    "Experimenting a lot before finding a style I liked",
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
                      My YouTube Thumbnail Journey
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 space-y-8">
                    
                    <Section icon={Lightbulb} title="Overview">
                        <p className="text-muted-foreground leading-relaxed">
                          When I started making YouTube thumbnails, I didn’t know much about design. I just wanted to make something that looked clean and caught attention. Over time, I explored different styles, colors, and layouts until I found what worked best.
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
                    
                     <Section icon={Zap} title="Challenges I Faced">
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
                          Creating thumbnails became a fun way for me to practice creativity and improve my design sense. Every thumbnail I made helped me understand what works and what doesn’t. Now, I feel more confident about turning a simple idea into something eye-catching for YouTube.
                        </p>
                    </Section>

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
