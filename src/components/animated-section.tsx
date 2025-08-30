
"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function AnimatedSection({ children, yPadding = 'py-20 lg:py-32' }: { children: React.ReactNode, yPadding?: string }) {
  const sectionVariants = {
    hidden: { opacity: 0, y: 75, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className={cn("min-h-screen flex items-center justify-center md:min-h-0", yPadding)}
    >
      {children}
    </motion.div>
  );
}
