
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function AnimatedBackButton({ href }: { href: string }) {
    const [sparks, setSparks] = useState<Array<{
        id: number;
        angle: number;
        distance: number;
    }>>([]);
    const [isPressed, setIsPressed] = useState(false);
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPressed(true);
        const newSparks = Array.from({ length: 12 }).map((_, i) => ({
            id: Date.now() + Math.random(),
            angle: i * 30,
            distance: Math.random() * 20 + 40,
        }));
        setSparks(prev => [...prev, ...newSparks]);
        
        setTimeout(() => {
            router.push(href);
        }, 400);

        setTimeout(() => {
            setIsPressed(false);
        }, 200);
    };

    const getButtonText = () => {
        if (href === '/') return 'Back to Home';
        if (href.includes('learning-roadmaps')) return 'Back to All Roadmaps';
        if (href.includes('skills')) return 'Back to Skills';
        if (href.includes('experiences')) return 'Back to Experiences';
        if (href.includes('projects')) return 'Back to Projects';
        return 'Go Back';
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        >
            <Button 
                asChild 
                variant="ghost" 
                className={cn("text-muted-foreground hover:text-accent hover:bg-transparent relative overflow-hidden group")}
                onClick={handleClick}
            >
                <Link href={href}>
                    <motion.div
                        animate={{ scale: isPressed ? 0.9 : 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="flex items-center z-10"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        {getButtonText()}
                    </motion.div>
                    <AnimatePresence>
                        {sparks.map((spark) => (
                            <motion.div
                                key={spark.id}
                                className="absolute rounded-full bg-accent"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    x: '-50%',
                                    y: '-50%',
                                    width: '6px',
                                    height: '6px',
                                }}
                                initial={{ scale: 0 }}
                                animate={{
                                    x: `${Math.cos(spark.angle * (Math.PI / 180)) * spark.distance}px`,
                                    y: `${Math.sin(spark.angle * (Math.PI / 180)) * spark.distance}px`,
                                    scale: [1, 0.5, 0],
                                    opacity: [1, 0.8, 0],
                                }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                onAnimationComplete={() => {
                                    setSparks((prev) => prev.filter((s) => s.id !== spark.id));
                                }}
                            />
                        ))}
                    </AnimatePresence>
                </Link>
            </Button>
        </motion.div>
    );
}
