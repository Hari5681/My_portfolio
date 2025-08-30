
"use client";

import { LandingSection } from '@/components/landing-section';
import { SkillsSection } from '@/components/skills-section';
import { EducationSection } from '@/components/education-section';
import { ProjectsSection } from '@/components/projects-section';
import { ExperienceSection } from '@/components/experience-section';
import { AboutSection } from '@/components/about-section';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { CertificatesSection } from '@/components/certificates-section';
import { RoadmapsPreviewSection } from '@/components/roadmaps-preview-section';
import { AnimatedSection } from '@/components/animated-section';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Bug, MessageSquare, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <LandingSection />
        <AnimatedSection>
            <SkillsSection />
        </AnimatedSection>
        <AnimatedSection>
            <EducationSection />
        </AnimatedSection>
        <AnimatedSection>
            <ExperienceSection />
        </AnimatedSection>
        <AnimatedSection>
            <ProjectsSection />
        </AnimatedSection>
        <AnimatedSection>
            <CertificatesSection />
        </AnimatedSection>
        <AnimatedSection>
            <RoadmapsPreviewSection />
        </AnimatedSection>
        <AnimatedSection>
            <AboutSection />
        </AnimatedSection>
        
        <AnimatedSection yPadding="py-20 lg:py-24">
            <div className="text-center container mx-auto px-4 md:px-6 relative">
                 <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                     <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse" />
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                       <span className="animate-text-glow bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent">
                          Your Experience Matters
                       </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                        Did you find a bug, have a suggestion, or just want to share your thoughts? I’m always learning, and your feedback helps me grow.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                       <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="group relative">
                           <Button asChild size="lg" variant="outline" className="w-64 h-16 text-lg relative overflow-hidden bg-transparent border-2 border-destructive/50 text-destructive-foreground hover:bg-destructive/10 hover:border-destructive hover:text-destructive-foreground transition-all duration-300 shadow-lg shadow-destructive/10 hover:shadow-destructive/20 group">
                               <Link href="/contact" className="z-10">
                                   <Bug className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                                   Report a Bug
                               </Link>
                           </Button>
                       </motion.div>
                       <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="group relative">
                           <Button asChild size="lg" className="w-64 h-16 text-lg relative overflow-hidden btn-glow animate-pulse-glow-accent group">
                               <Link href="/contact" className="z-10">
                                   <MessageSquare className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                   Share Feedback
                                   <ArrowRight className="ml-2 h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                               </Link>
                           </Button>
                           <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur-lg opacity-0 group-hover:opacity-75 transition duration-300" />
                       </motion.div>
                    </div>
                </motion.div>
            </div>
        </AnimatedSection>

      </main>
      <Footer />
    </div>
  );
}
