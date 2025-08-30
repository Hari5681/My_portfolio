
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Server, Smartphone, ShieldCheck, BrainCircuit, Columns3 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnimatedSection } from '@/components/animated-section';
import { AnimatedStats } from '@/components/animated-stats';


const roadmaps = [
  {
    title: 'Frontend Development',
    description: 'Learn to build beautiful and interactive user interfaces for the web.',
    icon: Code,
    href: '/learning-roadmaps/frontend',
  },
  {
    title: 'Backend Development',
    description: 'Master the server-side logic, databases, and APIs that power applications.',
    icon: Server,
    href: '/learning-roadmaps/backend',
  },
  {
    title: 'Full Stack Development',
    description: 'Become a versatile developer who can handle both frontend and backend tasks.',
    icon: Columns3,
    href: '/learning-roadmaps/full-stack',
  },
  {
    title: 'Mobile App Development',
    description: 'Create applications for Android and iOS devices, from concept to deployment.',
    icon: Smartphone,
    href: '/learning-roadmaps/mobile',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Dive into the world of artificial intelligence and build intelligent systems.',
    icon: BrainCircuit,
    href: '/learning-roadmaps/ai-ml',
  },
  {
    title: 'Cybersecurity',
    description: 'Learn how to protect systems, networks, and data from digital attacks.',
    icon: ShieldCheck,
    href: '/learning-roadmaps/cybersecurity',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function LearningRoadmapsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <AnimatedSection yPadding="pt-12 lg:pt-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.h1 
                className="text-4xl md:text-6xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="relative z-10 animate-text-glow bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent">
                    Your Learning Journey Starts Here
                </span>
            </motion.h1>
            <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Choose a path and master the skills needed to excel in the tech industry. Each roadmap is a curated guide to success.
            </motion.p>
            
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
              {roadmaps.map((roadmap) => (
                <motion.div key={roadmap.title} variants={itemVariants} className="h-full">
                  <Card className="bg-card/50 backdrop-blur-xl border-accent/20 shadow-lg shadow-accent/10 h-full flex flex-col transition-all duration-300 hover:border-accent hover:shadow-accent/20 hover:-translate-y-2">
                    <CardHeader className="items-center text-center">
                      <div className="p-4 bg-accent/10 rounded-full border border-accent/20 mb-4">
                        <roadmap.icon className="w-10 h-10 text-accent" />
                      </div>
                      <CardTitle>{roadmap.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <CardDescription className="mb-6 text-center">
                        {roadmap.description}
                      </CardDescription>
                       <Button asChild className="w-full mt-auto btn-glow">
                        <Link href={roadmap.href}>
                          Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
        <AnimatedSection>
            <div className="container mx-auto px-4 md:px-6">
                <AnimatedStats />
            </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
