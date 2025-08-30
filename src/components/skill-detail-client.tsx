
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { AnimatedBackButton } from '@/components/animated-back-button';
import { AnimatedProgressRing } from '@/components/animated-progress-ring';
import type { SkillContent } from '@/lib/skills-data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const RoadmapPhase = ({ phase, isLast }: { phase: any, isLast: boolean }) => {
    return (
        <motion.div 
            className="relative pl-10"
            variants={itemVariants}
        >
            {/* Timeline Line Segment */}
            {!isLast && (
                 <div className="absolute left-4 top-5 h-full w-0.5 bg-accent/20" />
            )}

            {/* Timeline Node */}
            <div className="absolute left-4 top-5 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-accent ring-4 ring-accent/30 z-10" />

            {/* Content Card */}
            <div className="pb-8">
                 <h4 className="font-bold text-lg text-accent mb-1">{phase.title}</h4>
                 <p className="text-sm text-muted-foreground mb-3">{phase.status}</p>
                 <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80">
                    {phase.points.map((point: string, i: number) => (
                        <li key={i}>{point}</li>
                    ))}
                 </ul>
            </div>
        </motion.div>
    );
};

export function SkillDetailClient({ skill }: { skill: SkillContent }) {
    return (
        <div className="container mx-auto px-4 md:px-6">
           <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-4xl mx-auto"
           >
                <motion.div variants={itemVariants} className="mb-8">
                     <AnimatedBackButton href="/skills" />
                </motion.div>

                <motion.div 
                    variants={itemVariants} 
                    className="grid md:grid-cols-3 gap-8 items-center mb-12"
                >
                    <div className="md:col-span-2">
                         <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            <span className="relative z-10 animate-text-glow bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent">
                                {skill.title}
                            </span>
                        </h1>
                        <ReactMarkdown className="prose prose-lg prose-invert text-muted-foreground max-w-none">
                            {skill.intro}
                        </ReactMarkdown>
                    </div>
                    {skill.progress !== undefined && (
                        <div className="flex justify-center">
                            <AnimatedProgressRing value={skill.progress} label="Journey Complete" />
                        </div>
                    )}
                </motion.div>
                
                <motion.div variants={itemVariants} className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-h2:text-accent prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mb-4 prose-h3:text-primary prose-h3:text-xl prose-li:text-muted-foreground">
                    <ReactMarkdown>{skill.details}</ReactMarkdown>
                </motion.div>
                
                {skill.roadmap && (
                    <motion.div variants={itemVariants} className="mt-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-8">My Roadmap – How I Learn & Build</h2>
                        <div className="relative">
                             <AnimatePresence>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={containerVariants}
                                >
                                    {skill.roadmap.map((phase, index) => (
                                        <RoadmapPhase key={index} phase={phase} isLast={index === skill.roadmap!.length - 1} />
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
           </motion.div>
        </div>
    );
}
