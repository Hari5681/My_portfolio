
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Smartphone, Code, Wrench, Users, CheckCircle, ArrowRight, Server, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';

const skillsData = {
  'Backend': [
    { name: "Kotlin", level: 60, icon: <Smartphone className="w-5 h-5" /> },
    { name: "Firebase", level: 25, icon: <Code className="w-5 h-5" /> },
    { name: "SharedPreferences & Room", level: 10, icon: <Code className="w-5 h-5" /> },
    { name: "MVVM Architecture", level: 0, icon: <Code className="w-5 h-5" /> },
  ],
  'Frontend': [
    { name: "HTML & CSS", level: 0, icon: <Code className="w-5 h-5" /> },
    { name: "JavaScript", level: 0, icon: <Code className="w-5 h-5" /> },
    { name: "React & Next.js", level: 0, icon: <Code className="w-5 h-5" /> },
  ],
  'Tools': [
    { name: "MS Office", level: 100, icon: <FileText className="w-5 h-5" /> },
    { name: "Android Studio", level: 40, icon: <Wrench className="w-5 h-5" /> },
    { name: "Git & GitHub", level: 20, icon: <Wrench className="w-5 h-5" /> },
    { name: "Debugging & Logcat", level: 5, icon: <Wrench className="w-5 h-5" /> },
  ],
  'Soft Skills': [
      { name: "Teamwork", icon: <CheckCircle className="w-5 h-5" /> },
      { name: "Problem Solving", icon: <CheckCircle className="w-5 h-5" /> },
      { name: "Adaptability", icon: <CheckCircle className="w-5 h-5" /> },
      { name: "Event Management", icon: <CheckCircle className="w-5 h-5" /> },
  ],
};

const categoryOrder: Category[] = ['Backend', 'Frontend', 'Tools', 'Soft Skills'];

const categoryIcons = {
  'Backend': Server,
  'Frontend': Code,
  'Tools': Wrench,
  'Soft Skills': Users,
};

type Category = keyof typeof skillsData;

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const AnimatedCategoryButton = ({ category, isActive, onClick, children }: { category: string, isActive: boolean, onClick: () => void, children: React.ReactNode }) => {
  const [ripples, setRipples] = useState<{ id: number, x: number, y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples([...ripples, newRipple]);
    onClick();
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        'relative w-full p-6 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 text-left overflow-hidden',
        isActive
            ? 'bg-accent/90 text-accent-foreground border-accent shadow-lg shadow-accent/20'
            : 'bg-card/50 border-accent/20 hover:bg-card/80 hover:border-accent/50'
      )}
      variants={itemVariants}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full bg-white/30"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 400, height: 400, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setRipples((prevRipples) => prevRipples.filter((r) => r.id !== ripple.id));
            }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
};

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('Backend');
  const Icon = categoryIcons[activeCategory];

  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-accent text-shadow-glow-accent"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          Technical Skillset
        </motion.h2>

        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
          {/* Category Selector */}
          <motion.div className="grid grid-cols-2 gap-4" variants={containerVariants}>
            {categoryOrder.map((category) => {
              const CategoryIcon = categoryIcons[category as Category];
              return (
                <AnimatedCategoryButton
                  key={category}
                  category={category}
                  isActive={activeCategory === category}
                  onClick={() => setActiveCategory(category as Category)}
                >
                  <CategoryIcon className="w-7 h-7" />
                  <span className="text-lg font-bold">{category}</span>
                </AnimatedCategoryButton>
              );
            })}
          </motion.div>

          {/* Skills Display */}
          <motion.div variants={containerVariants}>
            <Card className="bg-card/50 backdrop-blur-md border-accent/20 shadow-lg shadow-accent/10 h-full">
              <CardContent className="p-8">
                 <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                  <h3 className="text-2xl font-bold text-accent mb-6 flex items-center gap-3">
                    <Icon className="w-7 h-7" />
                    {activeCategory}
                  </h3>
                  {skillsData[activeCategory].map((skill, index) => (
                    <motion.div 
                      key={skill.name}
                      custom={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                       <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                            {skill.icon}
                            {skill.name}
                        </h4>
                        {typeof (skill as any).level !== 'undefined' && 
                            <span className="text-sm font-medium text-accent">
                                {(skill as any).level === 100 ? 'Complete' : (skill as any).level > 0 ? `${(skill as any).level}%` : 'Soon'}
                            </span>
                        }
                      </div>
                       {typeof (skill as any).level !== 'undefined' ? (
                            <Progress value={(skill as any).level} className="h-2 [&>div]:bg-accent" />
                        ) : (
                           <p className="text-sm text-muted-foreground">Key professional attribute.</p>
                        )}
                    </motion.div>
                  ))}
                   <div className="pt-4">
                        <Button asChild variant="outline" className="w-full group">
                           <Link href="/skills">
                             Explore All My Skills
                             <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                           </Link>
                        </Button>
                    </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
