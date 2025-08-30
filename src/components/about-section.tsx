
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail, Instagram, User, Lightbulb, Target } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const AnimatedSocialButton = ({ href, isExternal = false, children, ariaLabel }) => {
    interface Spark {
        id: number;
        angle: number;
        distance: number;
    }

    const [sparks, setSparks] = useState<Spark[]>([]);
    const router = useRouter();

    const handleClick = useCallback((e: React.MouseEvent) => {
        const newSparks = Array.from({ length: 12 }).map((_, i) => ({
            id: Date.now() + Math.random(),
            angle: i * 30,
            distance: Math.random() * 20 + 40,
        }));
        setSparks(prev => [...prev, ...newSparks]);
        
        if (!isExternal) {
            e.preventDefault();
            setTimeout(() => {
                router.push(href);
            }, 400); 
        }
    }, [href, isExternal, router]);
    
    return (
        <Button
            asChild
            variant="outline"
            className="text-muted-foreground hover:text-accent border-accent/50 hover:border-accent hover:bg-transparent relative overflow-hidden group"
        >
            <a 
              href={isExternal ? `/redirect?url=${encodeURIComponent(href)}` : href}
              onClick={handleClick} 
              aria-label={ariaLabel} 
              target={isExternal ? '_blank' : '_self'} 
              rel={isExternal ? 'noopener noreferrer' : ''}
            >
                <span className="z-10 flex items-center">{children}</span>
                 <AnimatePresence>
                    {sparks.map((spark: Spark) => (
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
            </a>
        </Button>
    );
};

const Sparkle = ({ size, x, y, delay }) => (
    <motion.div
      className="absolute rounded-full bg-accent"
      initial={{ scale: 0, opacity: 0 }}
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
        left: x,
        top: y,
      }}
    />
);

export function AboutSection() {
  const router = useRouter();

  const renderSparkles = () => [
      { size: 4, x: '10%', y: '20%', delay: 0 },
      { size: 2, x: '80%', y: '10%', delay: 0.2 },
      { size: 3, x: '90%', y: '85%', delay: 0.4 },
      { size: 4, x: '5%', y: '70%', delay: 0.6 },
      { size: 2, x: '20%', y: '90%', delay: 0.8 },
      { size: 3, x: '60%', y: '5%', delay: 1.0 },
  ].map((s, i) => <Sparkle key={i} {...s} />);
  
  return (
    <section id="about" className="py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="flex flex-col items-center text-center"
            variants={itemVariants}
          >
            <div className="relative w-48 h-48 lg:w-64 lg:h-64 mb-8">
              <div className="absolute inset-0">
                  {renderSparkles()}
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 animate-breathing-border"/>
               <motion.div
                  className="absolute inset-2 border-t-2 border-t-accent rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
               <motion.div
                  className="absolute inset-4 border-2 border-dashed border-primary/50 rounded-full"
                  animate={{ rotate: 360, scale: [0.95, 1, 0.95] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <Image
                src="https://res.cloudinary.com/dasii2ow3/image/upload/v1756463411/avatar_ym8sjp.jpg"
                alt="Hari Krishna"
                width={400}
                height={400}
                data-ai-hint="avatar"
                className="rounded-full object-cover p-2 bg-background relative z-10"
                priority
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent text-shadow-glow-accent">A Little More About Me</h2>
          </motion.div>

          <div className="space-y-8 mt-12">
              <motion.div variants={itemVariants}>
                <Card className="bg-card/50 backdrop-blur-lg border-accent/20">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <User className="w-8 h-8 text-accent" />
                        <CardTitle>Who I Am</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                         Hi, I’m Hari Krishna 👨‍💻. I’m in my 3rd year of B.Tech ECE from Visakhapatnam. I’ve always been curious about how things work, and that curiosity pushed me into creating — from designing small UIs to building complete applications.
                        </p>
                    </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                 <Card className="bg-card/50 backdrop-blur-lg border-accent/20">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Lightbulb className="w-8 h-8 text-accent" />
                        <CardTitle>My Philosophy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          I believe the best way to learn is to just try, fail, and try again. Mistakes don’t scare me — they teach me. Every time I break something while coding or face an error, I see it as a step closer to figuring things out. That’s where the real growth happens.
                        </p>
                    </CardContent>
                </Card>
              </motion.div>
               <motion.div variants={itemVariants}>
                 <Card className="bg-card/50 backdrop-blur-lg border-accent/20">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Target className="w-8 h-8 text-accent" />
                        <CardTitle>My Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          My dream is to mix my background in electronics with my passion for coding. I want to create smart and easy-to-use applications, especially AI-powered projects that not only work but also feel simple, clean, and beautiful to use.
                        </p>
                    </CardContent>
                </Card>
              </motion.div>
            </div>

             <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-12 justify-center">
               <AnimatedSocialButton href="mailto:hari7569871463@gmail.com" ariaLabel="Email">
                  <Mail className="mr-2 h-4 w-4" /> Email
               </AnimatedSocialButton>
                <AnimatedSocialButton href="https://www.linkedin.com/in/hari5681" isExternal ariaLabel="LinkedIn">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </AnimatedSocialButton>
                <AnimatedSocialButton href="https://github.com/Hari5681" isExternal ariaLabel="Github">
                    <Github className="mr-2 h-4 w-4" /> Github
                </AnimatedSocialButton>
                <AnimatedSocialButton href="https://www.instagram.com/hari.krishna.00?igsh=cmF2cHA1eTE3ZmJw" isExternal ariaLabel="Instagram">
                    <Instagram className="mr-2 h-4 w-4" /> Instagram
                </AnimatedSocialButton>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
