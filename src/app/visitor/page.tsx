
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.2,
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const visitorName = name.trim();
        if (!visitorName) {
            // If name is not entered, just proceed
            localStorage.setItem('hasVisitedPortfolio', 'true');
            router.push('/welcome');
            return;
        }

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
            
            setTimeout(() => router.push('/welcome'), 500);

        } catch (error: any) {
            console.error("Error saving name to Supabase:", error);
            toast({
                variant: 'destructive',
                title: "Submission Failed",
                description: `Could not save your name. Error: ${error.message}`,
            });
            localStorage.setItem('hasVisitedPortfolio', 'true');
            setTimeout(() => router.push('/welcome'), 1500);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-pattern-animated -z-20" />
              <motion.div 
                className="absolute inset-0 z-0 opacity-50"
              >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,hsl(var(--accent)_/_0.2),transparent_80%)]" />
              </motion.div>

            <motion.div
                className="w-full max-w-md z-10 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div 
                    className="p-8 bg-card/60 backdrop-blur-xl rounded-2xl animate-breathing-border relative"
                >
                    <motion.div
                        className="w-40 h-40 mx-auto mb-8 flex items-center justify-center"
                        variants={itemVariants}
                    >
                        <div className="relative w-full h-full">
                            <motion.div
                                className="absolute inset-0 border-2 border-accent/20 rounded-full"
                            />
                            <motion.div
                                className="absolute inset-4 border-t-2 border-t-primary rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <motion.div
                                    className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center"
                                >
                                    <Sparkles className="w-8 h-8 text-accent animate-pulse" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.h1 
                        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent animate-text-glow"
                        variants={itemVariants}
                    >
                        WELCOME
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-muted-foreground"
                        variants={itemVariants}
                    >
                        Glad to have you here. Let me know who's visiting.
                    </motion.p>
                    
                    <motion.form 
                        onSubmit={handleSubmit} 
                        className="mt-8 space-y-6 flex flex-col items-center"
                        variants={itemVariants}
                    >
                        <motion.div className="relative w-full group" whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
                            <Input
                                id="visitor-name"
                                placeholder="What should I call you?"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-12 text-base text-center bg-background/50 border-accent/30 placeholder:text-muted-foreground rounded-lg transition-all duration-300 focus:border-accent focus:shadow-lg focus:shadow-accent/20 input-glow-border"
                                autoComplete="name"
                                disabled={isSubmitting}
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full"
                        >
                            <Button type="submit" size="lg" className="w-full btn-glow animate-pulse-glow-accent text-lg" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Dive into my Universe'}
                            </Button>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </motion.div>
        </div>
    );
}
