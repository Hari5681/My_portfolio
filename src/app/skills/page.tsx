
"use client";

import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnimatedSection } from '@/components/animated-section';
import { Server, Code, Palette, Film, Smartphone, Database, GitBranch, Bug, Split, FileText, Component, TerminalSquare, Wrench } from 'lucide-react';
import { SkillCard } from '@/components/skill-card';

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

const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const allSkills = [
  // Backend
  { id: "kotlin", name: "Kotlin", level: 60, icon: <Smartphone className="w-8 h-8" />, href: "/skills/kotlin", category: "backend" },
  { id: "firebase", name: "Firebase", level: 25, icon: <Database className="w-8 h-8" />, href: "/skills/firebase", category: "backend" },
  { id: "shared-preferences", name: "SharedPreferences & Room", level: 10, icon: <Database className="w-8 h-8" />, href: "/skills/shared-preferences", category: "backend" },
  { id: "mvvm", name: "MVVM Architecture", level: 0, icon: <Split className="w-8 h-8" />, href: "/skills/mvvm", category: "backend" },
  
  // Frontend
  { id: "xml-layouts", name: "XML Layouts", level: 0, icon: <FileText className="w-8 h-8" />, href: "#", category: "frontend" },
  { id: "jetpack-compose", name: "Jetpack Compose", level: 0, icon: <Component className="w-8 h-8" />, href: "#", category: "frontend" },
  { id: "material-design", name: "Material Design", level: 0, icon: <Palette className="w-8 h-8" />, href: "#", category: "frontend" },
  { id: "ui-animations", name: "UI Animations", level: 0, icon: <Film className="w-8 h-8" />, href: "#", category: "frontend" },
  
  // Tools
  { id: "ms-office", name: "MS Office", level: 100, icon: <FileText className="w-8 h-8" />, href: "/skills/ms-office", category: "tools" },
  { id: "android-studio", name: "Android Studio", level: 40, icon: <TerminalSquare className="w-8 h-8" />, href: "/skills/android-studio", category: "tools" },
  { id: "git-github", name: "Git & GitHub", level: 20, icon: <GitBranch className="w-8 h-8" />, href: "/skills/git-github", category: "tools" },
  { id: "debugging", name: "Debugging & Logcat", level: 5, icon: <Bug className="w-8 h-8" />, href: "/skills/debugging", category: "tools" },
];


export default function SkillsPage() {
  const backendSkills = allSkills.filter(s => s.category === "backend");
  const frontendSkills = allSkills.filter(s => s.category === "frontend");
  const toolSkills = allSkills.filter(s => s.category === "tools");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <AnimatedSection yPadding="pt-12 lg:pt-16">
          <div className="container mx-auto px-4 md:px-6">
            
             <motion.h2 
                className="text-4xl md:text-5xl font-bold text-center mb-4 text-accent text-shadow-glow-accent"
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                My Technical Universe
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A curated collection of the tools and technologies I use to build and innovate. Each skill is a star in my ever-expanding galaxy of knowledge.
            </motion.p>
            
            <div className="space-y-16">
              {/* Backend & App Logic Section */}
              <div>
                <motion.h3 
                  className="text-3xl font-bold mb-8 flex items-center gap-4 text-foreground"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <Server className="w-8 h-8 text-accent" />
                  Backend & App Logic
                </motion.h3>
                <motion.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                  {backendSkills.map((skill) => (
                    <SkillCard key={skill.id} {...skill} />
                  ))}
                </motion.div>
              </div>

              {/* Frontend Section */}
               <div>
                <motion.h3 
                  className="text-3xl font-bold mb-8 flex items-center gap-4 text-foreground"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                   <Code className="w-8 h-8 text-accent" />
                  Frontend (UI) & Design
                </motion.h3>
                <motion.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                  {frontendSkills.map((skill) => (
                    <SkillCard key={skill.id} {...skill} />
                  ))}
                </motion.div>
              </div>

              {/* Tools & Workflow Section */}
              <div>
                <motion.h3 
                  className="text-3xl font-bold mb-8 flex items-center gap-4 text-foreground"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <Wrench className="w-8 h-8 text-accent" />
                  Tools & Workflow
                </motion.h3>
                <motion.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                  {toolSkills.map((skill) => (
                    <SkillCard key={skill.id} {...skill} />
                  ))}
                </motion.div>
              </div>

            </div>

          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
