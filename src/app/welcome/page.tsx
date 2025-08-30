
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function WelcomePage() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const redirectTimeout = setTimeout(() => {
            router.push('/');
        }, 4000); // 4 seconds

        return () => clearTimeout(redirectTimeout);
    }, [router]);

    const sentence = "Dive into my Universe".split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                staggerChildren: 0.08,
            },
        },
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
                                        x: Math.random() * window.innerWidth,
                                        y: Math.random() * window.innerHeight,
                                        scale: 0,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        scale: [0, size, 0],
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

                        <motion.h1
                            className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent animate-text-glow"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {sentence.map((char, index) => (
                                <motion.span key={index} variants={letterVariants}>
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </motion.h1>

                         <motion.div
                            className="mt-12 w-full max-w-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 0.5 }}
                         >
                            <div className="h-2 bg-accent/20 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="h-full bg-accent"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 4, ease: 'linear' }}
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
