
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

const Sparkle = ({ size, x, y, delay }) => (
    <motion.div
      className="absolute rounded-full bg-accent"
      initial={{ scale: 0, opacity: 0, x, y }}
      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
      style={{
        width: size,
        height: size,
      }}
    />
);

export default function VisitorPage() {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

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
            localStorage.setItem('hasVisitedPortfolio', 'true');
            setTimeout(() => router.push('/'), 1500);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-pattern-animated -z-20" />
              <motion.div 
                className="absolute inset-0 z-0 opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
              >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,hsl(var(--accent)_/_0.2),transparent_80%)]" />
              </motion.div>

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
                    className="p-8 bg-card/60 backdrop-blur-xl rounded-2xl animate-breathing-border relative"
                    variants={itemVariants}
                    style={{ transformStyle: "preserve-d" }}
                >
                    <div className="absolute inset-0">
                        <Sparkle size={4} x="10%" y="20%" delay={0} />
                        <Sparkle size={2} x="80%" y="10%" delay={0.2} />
                        <Sparkle size={3} x="90%" y="85%" delay={0.4} />
                        <Sparkle size={4} x="5%" y="70%" delay={0.6} />
                    </div>

                    <motion.div
                        className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-background/50 border-2 border-accent/30 shadow-lg shadow-accent/10"
                        style={{ transform: "translateZ(80px)" }}
                        variants={itemVariants}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Sparkles className="w-12 h-12 text-accent animate-pulse" />
                    </motion.div>
                    
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
                                className="h-12 text-base text-center bg-background/50 border-accent/30 placeholder:text-muted-foreground rounded-lg transition-all duration-300 focus:border-accent focus:shadow-lg focus:shadow-accent/20 input-glow-border"
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
