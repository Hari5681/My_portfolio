
'use client';

import { motion } from 'framer-motion';
import { RoadmapMilestone } from '@/components/milestone-node';
import { AnimatedBackButton } from '@/components/animated-back-button';
import { cn } from '@/lib/utils';

const cardVariants = (isLeft: boolean) => ({
    hidden: { opacity: 0, x: isLeft ? -100 : 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
});

export function RoadmapDetailClient({ roadmap, details }: { roadmap: any, details: any }) {
    return (
        <div className="container mx-auto px-4 md:px-6">
           <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center mb-16"
           >
                <div className="mb-8">
                    <AnimatedBackButton href="/learning-roadmaps" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                    <span className="relative z-10 animate-text-glow bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent">
                        {details.title}
                    </span>
                </h1>
           </motion.div>
            
           <div className="relative max-w-5xl mx-auto">
                <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-accent/20 -translate-x-1/2">
                    <motion.div
                        className="h-full w-full bg-accent"
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                    />
                </div>

                <div className="space-y-16 md:space-y-0">
                    {roadmap.map((milestone: any, index: number) => {
                        const isLeft = index % 2 === 0;
                        return (
                             <motion.div
                                key={index}
                                className="relative md:grid md:grid-cols-2 md:gap-x-12 items-start"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ amount: 0.3 }}
                                variants={cardVariants(isLeft)}
                            >
                                <div className={cn("md:flex", isLeft ? "md:justify-end md:pr-6" : "md:justify-start md:pl-6 md:col-start-2")}>
                                     <div className="md:w-full">
                                         <RoadmapMilestone milestone={milestone} isLast={index === roadmap.length - 1} />
                                     </div>
                                </div>
                                 <div className="hidden md:block absolute left-1/2 top-2 -translate-x-1/2 w-5 h-5 rounded-full bg-background border-2 border-accent ring-4 ring-accent/30 z-10" />
                            </motion.div>
                        )
                    })}
                </div>
           </div>
        </div>
    );
}
