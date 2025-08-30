
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

    useEffect(() => {
        setIsMounted(true);

        const sentenceTimer = setTimeout(() => {
            setSentenceIndex(1);
        }, 2500); // Switch to the second sentence after 2.5s

        const redirectTimeout = setTimeout(() => {
            router.push('/');
        }, 5500); // Redirect after 5.5s total

        return () => {
            clearTimeout(sentenceTimer);
            clearTimeout(redirectTimeout);
        };
    }, [router]);

    const sentenceVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } }
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
                                        x: Math.random() * window.innerWidth,
                                        y: Math.random() * window.innerHeight,
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
                                {sentences[sentenceIndex]}
                            </motion.h1>
                        </AnimatePresence>

                         <motion.div
                            className="mt-12 w-full max-w-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                         >
                            <div className="h-2 bg-accent/20 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="h-full bg-accent"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 5.5, ease: 'linear' }}
                                />
                                <motion.div
                                    className="absolute top-0 left-0 h-full w-full bg-accent opacity-50"
                                    animate={{ scaleX: [1, 1.05, 1] }}
                                    transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
