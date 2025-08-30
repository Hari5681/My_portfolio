
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from './ui/card';

export function AiHeroSection() {
    return (
        <section className="relative container mx-auto px-4 md:px-6 py-16 md:py-24 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                {/* Background glow */}
                <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: 'mirror'
                    }}
                />
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                     <motion.h1 
                        className="text-4xl md:text-6xl font-bold text-foreground mb-4 relative inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <span className="relative z-10 animate-text-glow bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent">
                            Welcome to the Nexus
                        </span>
                    </motion.h1>
                    <motion.p 
                        className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Interact with a suite of next-generation AI tools, designed to showcase the future of intelligent applications.
                    </motion.p>
                </div>

                <motion.div 
                    className="relative flex justify-center items-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, type: 'spring', stiffness: 100, delay: 0.4 }}
                >
                     <Card className="bg-card/30 backdrop-blur-xl border-accent/20 rounded-full w-64 h-64 md:w-80 md:h-80 p-4 shadow-2xl shadow-accent/10">
                        <div className="relative w-full h-full">
                            <Image 
                                src="https://placehold.co/400x400.png"
                                alt="AI Brain Placeholder"
                                fill
                                className="object-cover rounded-full animate-pulse-glow"
                                data-ai-hint="glowing orb"
                            />
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
