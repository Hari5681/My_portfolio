
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function BackToHomeButton({ href }: { href: string }) {
    interface Spark {
        id: number;
        angle: number;
        distance: number;
    }
    const [sparks, setSparks] = useState<Spark[]>([]);
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const newSparks = Array.from({ length: 12 }).map((_, i) => ({
            id: Date.now() + Math.random(),
            angle: i * 30,
            distance: Math.random() * 20 + 30,
        }));
        setSparks(prev => [...prev, ...newSparks]);
        
        // Delay navigation to allow animation to play
        setTimeout(() => {
            router.push(href);
        }, 400);
    };

    return (
        <Button 
            asChild 
            variant="ghost" 
            className="text-muted-foreground hover:text-accent hover:bg-transparent relative overflow-hidden"
            onClick={handleClick}
        >
            <Link href={href}>
                <ArrowLeft className="mr-2 h-4 w-4 z-10" />
                <span className="z-10">Back to Home</span>
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
    );
}
