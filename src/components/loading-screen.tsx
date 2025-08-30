
'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function LoadingScreen() {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        when: 'afterChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm p-4 h-screen overflow-hidden"
    >
      <motion.div variants={itemVariants} className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 border-4 border-accent rounded-full"
          animate={{
            scale: [1, 1.2, 1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-2 border-2 border-primary rounded-full"
           animate={{
            scale: [1, 0.8, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={itemVariants}
        >
          <Sparkles className="w-10 h-10 text-accent animate-pulse-glow-accent" />
        </motion.div>
      </motion.div>
      <motion.p
        variants={itemVariants}
        className="mt-8 text-lg font-semibold text-foreground tracking-widest text-center"
      >
        LOADING...
      </motion.p>
    </motion.div>
  );
}
