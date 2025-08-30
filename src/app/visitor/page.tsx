
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const dynamic = 'force-dynamic';

// This is a public, client-side connection to Supabase, initialized once.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.3,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: 'easeOut',
        },
    },
};

export default function VisitorPage() {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const visitorName = name.trim();
        if (!visitorName) return;

        setIsSubmitting(true);
        try {
            const { error } = await supabase
              .from('visitors')
              .insert([{ visited_name: visitorName }]);

            if (error) throw error;
            
            localStorage.setItem('hasVisitedPortfolio', 'true');
            toast({
              title: `Welcome, ${visitorName}!`,
              description: "So glad to have you here. Enjoy the journey.",
            });
            
            setTimeout(() => router.push('/'), 500);

        } catch (error: any) {
            console.error("Error saving name to Supabase:", error);
            toast({
                variant: 'destructive',
                title: "Submission Failed",
                description: `Could not save your name. Error: ${error.message}`,
            });
            // Still allow access to the site even if Supabase fails
            localStorage.setItem('hasVisitedPortfolio', 'true');
            setTimeout(() => router.push('/'), 1500);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden bg-grid-pattern-animated">
            <motion.div
                className="w-full max-w-md z-10 text-center perspective-1000"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY }}
            >
                <motion.div 
                    className="p-8 bg-card/60 backdrop-blur-xl rounded-2xl animate-breathing-border"
                    variants={itemVariants}
                    style={{ transformStyle: "preserve-d" }}
                >
                    <motion.h1 
                        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent animate-text-glow"
                        style={{ transform: "translateZ(50px)" }}
                        variants={itemVariants}
                    >
                        WELCOME
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-muted-foreground"
                        style={{ transform: "translateZ(40px)" }}
                        variants={itemVariants}
                    >
                        “Dive into my universe — and explore the galaxies of creativity within.”
                    </motion.p>
                    
                    <motion.form 
                        onSubmit={handleSubmit} 
                        className="mt-8 space-y-6 flex flex-col items-center"
                        variants={itemVariants}
                        style={{ transform: "translateZ(40px)" }}
                    >
                        <div className="relative w-full group">
                            <Input
                                id="visitor-name"
                                placeholder="Tell the universe who you are"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-12 text-base text-center bg-background/50 border-accent/30 placeholder:text-muted-foreground rounded-lg backdrop-blur-sm transition-all duration-300 focus:border-accent focus:shadow-lg focus:shadow-accent/20 input-glow-border"
                                autoComplete="name"
                                disabled={isSubmitting}
                            />
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full"
                        >
                            <Button type="submit" size="lg" className="w-full btn-glow animate-pulse-glow-accent text-lg" disabled={isSubmitting || !name.trim()}>
                                {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Unfold the Story'}
                            </Button>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </motion.div>
        </div>
    );
}
