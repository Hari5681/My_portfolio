
'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight, Code, Server, BrainCircuit, Map } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

const iconVariants = {
    animate: {
        rotate: 360,
        transition: {
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
        },
    },
};

export function RoadmapsPreviewSection() {
    const icons = [
        { icon: Code, position: 'top-1/4 left-1/4' },
        { icon: Server, position: 'top-1/2 right-1/4' },
        { icon: BrainCircuit, position: 'bottom-1/4 left-1/2' },
    ];
    return (
        <section id="roadmaps-preview" className="py-20 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    className="max-w-4xl mx-auto text-center relative"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    <div className="absolute -inset-16 w-[calc(100%+8rem)] h-[calc(100%+8rem)] -z-10">
                        <motion.div
                            className="absolute inset-0"
                            variants={iconVariants}
                            animate="animate"
                        >
                            {icons.map((item, index) => (
                                <item.icon
                                    key={index}
                                    className={`absolute w-8 h-8 text-accent/20 ${item.position}`}
                                    style={{ transform: `translate(-50%, -50%) rotate(${index * 120}deg)` }}
                                />
                            ))}
                        </motion.div>
                    </div>
                    <motion.div variants={itemVariants} className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-accent/30">
                        <Map className="w-10 h-10 text-accent animate-pulse"/>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-5xl font-bold text-foreground mb-6"
                    >
                        <span className="animate-text-glow bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent">
                            Start Your Learning Journey
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
                    >
                        Explore curated roadmaps designed to guide you from beginner to expert in various tech fields. Choose your path and start building skills today.
                    </motion.p>

                    <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button asChild size="lg" className="btn-glow animate-pulse-glow-accent group">
                            <Link href="/learning-roadmaps">
                                Explore All Roadmaps
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
