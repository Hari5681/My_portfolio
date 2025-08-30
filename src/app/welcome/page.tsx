
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

const sentences = [
    "Hello, I’m Hari Krishna",
    "Dive into my Universe"
];

export default function WelcomePage() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setIsMounted(true);

        const sentenceTimer = setTimeout(() => {
            setSentenceIndex(1);
        }, 2500); // Switch to the second sentence after 2.5s

        const redirectTimeout = setTimeout(() => {
            router.push('/');
        }, 5500); // Redirect after 5.5s total

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, 50); // Update progress roughly every 50ms

        return () => {
            clearTimeout(sentenceTimer);
            clearTimeout(redirectTimeout);
            clearInterval(progressInterval);
        };
    }, [router]);

    const sentenceVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.1,
                staggerChildren: 0.05,
            },
        },
        exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 200,
            },
        },
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden bg-background">
            <AnimatePresence>
                {isMounted && (
                    <>
                        {/* Starfield background */}
                        {[...Array(100)].map((_, i) => {
                            const size = Math.random() * 2 + 1;
                            const duration = Math.random() * 3 + 2;
                            return (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full bg-accent"
                                    initial={{
                                        x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                                        y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                                        scale: 0,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        scale: [0, 1, 0],
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: duration,
                                        repeat: Infinity,
                                        delay: Math.random() * 5,
                                    }}
                                    style={{
                                        width: size,
                                        height: size,
                                    }}
                                />
                            );
                        })}
                        
                        <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: -180 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            className="relative mb-8"
                        >
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Rocket className="w-24 h-24 text-accent" />
                            </motion.div>
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-accent/30"
                                animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={sentenceIndex}
                                className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent animate-text-glow"
                                variants={sentenceVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {sentences[sentenceIndex].split("").map((char, index) => (
                                    <motion.span key={index} variants={letterVariants} className="inline-block">
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </motion.h1>
                        </AnimatePresence>

                         <motion.div
                            className="mt-12 w-full max-w-xs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                         >
                            <div className="h-2 bg-accent/20 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="h-full bg-accent"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1, ease: 'linear' }}
                                />
                                <motion.div 
                                    className="absolute top-0 h-full w-4 bg-white/50 blur-md"
                                    style={{ left: `${progress}%` }}
                                    transition={{ duration: 0.1, ease: 'linear' }}
                                />
                            </div>
                            <motion.p className="text-center text-sm font-mono text-accent/80 mt-2 tracking-widest">
                                {Math.round(progress)}%
                            </motion.p>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
