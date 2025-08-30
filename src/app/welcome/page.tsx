
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WelcomePage() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [sentences, setSentences] = useState<string[]>([]);
    const totalDuration = 6000; // 6 seconds total

    useEffect(() => {
        setIsMounted(true);
        const visitorName = localStorage.getItem('visitorName');
        const welcomeSentences = [
            `Yo, ${visitorName || 'Visitor'}!`,
            "I'm Hari",
            "Hold tight..."
        ];
        setSentences(welcomeSentences);

        const stepTimers = [
            setTimeout(() => setActiveStep(1), 100),
            setTimeout(() => setActiveStep(2), 2000),
            setTimeout(() => setActiveStep(3), 4000),
        ];

        const redirectTimeout = setTimeout(() => {
            router.push('/');
        }, totalDuration);


        return () => {
            stepTimers.forEach(clearTimeout);
            clearTimeout(redirectTimeout);
        };
    }, [router]);
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden bg-background">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"/>
             <motion.div 
                className="absolute inset-0 z-0 opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,hsl(var(--accent)_/_0.2),transparent_80%)]" />
              </motion.div>
             <AnimatePresence>
                {isMounted && (
                    <motion.div
                        className="w-full max-w-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative">
                            {/* The timeline line */}
                            <div className="absolute left-4 top-0 h-full w-0.5 bg-accent/20 -translate-x-1/2">
                                <motion.div
                                    className="h-full w-full bg-accent"
                                    style={{ originY: 0 }}
                                    animate={{ scaleY: (activeStep / sentences.length) }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                />
                            </div>

                            <div className="space-y-16">
                                {sentences.map((sentence, index) => (
                                    <div key={index} className="relative flex items-center">
                                        <div 
                                            className={cn(
                                                "absolute left-4 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                                                activeStep > index ? "bg-accent border-accent" : "bg-background border-accent/30"
                                            )}
                                        >
                                            {activeStep > index && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                >
                                                    <Check className="w-5 h-5 text-accent-foreground" />
                                                </motion.div>
                                            )}
                                             {activeStep === index + 1 && (
                                                <div className="absolute inset-0 rounded-full bg-accent animate-ping"/>
                                             )}
                                        </div>
                                        <div className="pl-12">
                                            <AnimatePresence>
                                            {activeStep > index && (
                                                <motion.h1
                                                    className="text-3xl md:text-4xl font-bold text-foreground"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                                                >
                                                    {sentence}
                                                </motion.h1>
                                            )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
