
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
    const totalDuration = 5500; // 5.5 seconds total

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
                        <div className="space-y-8">
                            {sentences.map((sentence, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div 
                                        className={cn(
                                            "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                                            activeStep > index ? "bg-accent border-accent" : "bg-transparent border-accent/30"
                                        )}
                                    >
                                        <AnimatePresence>
                                        {activeStep > index && (
                                            <motion.div
                                                initial={{ scale: 0, rotate: -90 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                            >
                                                <Check className="w-6 h-6 text-accent-foreground" />
                                            </motion.div>
                                        )}
                                        </AnimatePresence>
                                         {activeStep === index + 1 && (
                                            <div className="absolute w-10 h-10 rounded-full bg-accent animate-ping"/>
                                         )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <AnimatePresence>
                                        {activeStep > index && (
                                            <motion.h1
                                                className="text-2xl md:text-3xl font-bold text-foreground"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                            >
                                                {sentence}
                                            </motion.h1>
                                        )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="w-full bg-muted/50 rounded-full h-1.5 mt-16 overflow-hidden border border-accent/20">
                            <motion.div
                                className="bg-accent h-full rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: totalDuration / 1000, ease: 'linear' }}
                            />
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
