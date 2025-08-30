
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  { text: (name: string) => `Yo, ${name || 'Visitor'}!`, icon: '👋' },
  { text: () => "I'm Hari", icon: '👨‍💻' },
  { text: () => 'Hold tight…', icon: '🚀' },
];

const containerVariants = {
    enter: {
        transition: {
            staggerChildren: 0.3,
        },
    },
    exit: {
        transition: {
            staggerChildren: 0.2,
            staggerDirection: -1,
        },
    }
};

const itemVariants = {
    initial: { opacity: 0, y: 30 },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 150,
            damping: 20,
        },
    },
    exit: {
        opacity: 0,
        y: -30,
        transition: {
            ease: 'easeInOut',
            duration: 0.4
        },
    },
};

export default function WelcomePage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [visitorName, setVisitorName] = useState('');
    const totalDuration = 5500;

    useEffect(() => {
        const name = localStorage.getItem('visitorName');
        setVisitorName(name || 'Visitor');
        
        const stepTimers = [
            setTimeout(() => setStep(1), 1800),
            setTimeout(() => setStep(2), 3600),
        ];

        const redirectTimeout = setTimeout(() => {
            router.push('/');
        }, totalDuration);


        return () => {
            stepTimers.forEach(clearTimeout);
            clearTimeout(redirectTimeout);
        };
    }, [router]);

    const currentMessage = messages[step];
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden bg-background">
            <div className="absolute inset-0 bg-grid-pattern-animated -z-20" />
             <motion.div 
                className="absolute inset-0 z-0 opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,hsl(var(--accent)_/_0.2),transparent_80%)]" />
              </motion.div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    className="flex flex-col items-center justify-center text-center"
                    variants={containerVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    <motion.div
                        className="text-6xl md:text-7xl mb-6"
                        variants={itemVariants}
                        animate={{
                            y: [0, -10, 0],
                            rotate: step === 0 ? [0, 15, -10, 0] : (step === 2 ? [0, -5, 5, 0] : 0),
                        }}
                        transition={{
                             duration: 2,
                             repeat: Infinity,
                             ease: 'easeInOut',
                        }}
                    >
                        {currentMessage.icon}
                    </motion.div>
                    <motion.h1
                        className="text-3xl md:text-4xl font-bold text-foreground"
                        variants={itemVariants}
                    >
                        {currentMessage.text(visitorName)}
                    </motion.h1>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
