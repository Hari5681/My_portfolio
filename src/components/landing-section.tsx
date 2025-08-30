
"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, ChevronsDown } from "lucide-react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

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

export function LandingSection() {
    const isMobile = useIsMobile();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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
    
    const introText = "Hello, I'm Bothsa Hari Krishna".split("");

    const renderSparkles = () => [
        { size: 4, x: '10%', y: '20%', delay: 0 },
        { size: 2, x: '80%', y: '10%', delay: 0.2 },
        { size: 3, x: '90%', y: '85%', delay: 0.4 },
        { size: 4, x: '5%', y: '70%', delay: 0.6 },
        { size: 2, x: '20%', y: '90%', delay: 0.8 },
        { size: 3, x: '60%', y: '5%', delay: 1.0 },
    ].map((s, i) => <Sparkle key={i} {...s} />);

    return (
        <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="max-w-3xl text-center md:text-left mx-auto"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                         <motion.div 
                            className="text-md md:text-lg font-medium mb-2 text-accent"
                            variants={itemVariants}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                           Hello, I'm Bothsa Hari Krishna
                        </motion.div>
                        

                        <motion.h1
                            className="text-4xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent my-4 animate-text-glow whitespace-nowrap"
                            variants={itemVariants}
                        >
                            Android Developer
                        </motion.h1>

                        <motion.h2
                            className="text-2xl md:text-3xl text-accent font-bold"
                            variants={itemVariants}
                        >
                            Building with Kotlin
                        </motion.h2>

                         <motion.p 
                            className="text-md md:text-lg font-medium mt-4 text-muted-foreground"
                            variants={itemVariants}
                        >
                           ECE Undergraduate (2023–2027)
                        </motion.p>
                         <motion.p 
                            className="text-md md:text-lg font-medium mt-1 text-muted-foreground"
                            variants={itemVariants}
                        >
                           UI/UX Explorer | Electronics Enthusiast
                        </motion.p>
                        
                        <motion.div 
                            className="mt-10 flex flex-col items-center md:items-start gap-4"
                            variants={itemVariants}
                        >
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Button asChild size="lg" className="btn-glow animate-pulse-glow-accent px-10">
                                    <Link href="/projects">
                                        My Projects <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                             <div className="flex items-center gap-4 mt-4">
                                <motion.a href="mailto:hari7569871463@gmail.com" whileHover={{ scale: 1.1, y: -2 }} className="text-muted-foreground hover:text-accent transition-colors">
                                    <Mail className="w-6 h-6" />
                                </motion.a>
                                <motion.a href={`/redirect?url=${encodeURIComponent('https://www.linkedin.com/in/hari5681/')}`} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} className="text-muted-foreground hover:text-accent transition-colors">
                                    <Linkedin className="w-6 h-6" />
                                </motion.a>
                                <motion.a href={`/redirect?url=${encodeURIComponent('https://github.com/Hari5681')}`} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} className="text-muted-foreground hover:text-accent transition-colors">
                                    <Github className="w-6 h-6" />
                                </motion.a>
                            </div>
                            {isMobile && (
                                <motion.div
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-4"
                                >
                                    <Button asChild variant="link" className="text-accent animate-text-glow px-0">
                                        <Link href="/about">
                                            About Me
                                        </Link>
                                    </Button>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hidden md:flex justify-center items-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, type: 'spring', stiffness: 100, delay: 0.4 }}
                    >
                         <motion.div 
                            className="relative w-80 h-80 lg:w-96 lg:h-96"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                         >
                            <motion.div
                                className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/50 to-primary/50 blur-2xl"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            />
                             <div className="absolute inset-0">
                                {renderSparkles()}
                            </div>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 animate-breathing-border"/>
                             <motion.div
                                className="absolute inset-4 border-t-2 border-t-accent rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                            />
                             <motion.div
                                className="absolute inset-8 border-2 border-dashed border-primary/50 rounded-full"
                                animate={{ rotate: 360, scale: [0.95, 1, 0.95] }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
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
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 10 }}
              transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
              <ChevronsDown className="w-8 h-8 text-accent/50" />
            </motion.div>
        </section>
    );
}
