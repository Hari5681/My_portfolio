
'use client';

import { motion } from "framer-motion";

export function GeminiLoader() {
  return (
    <div className="flex items-center space-x-1">
      <motion.div
        className="h-3 w-1.5 bg-accent rounded-full"
        animate={{
          scaleY: [1.5, 0.8, 1.5],
          opacity: [1, 0.7, 1]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0
        }}
      />
      <motion.div
        className="h-3 w-1.5 bg-accent rounded-full"
        animate={{
          scaleY: [1.5, 0.8, 1.5],
          opacity: [1, 0.7, 1]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
      />
      <motion.div
        className="h-3 w-1.5 bg-accent rounded-full"
        animate={{
          scaleY: [1.5, 0.8, 1.5],
          opacity: [1, 0.7, 1]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4
        }}
      />
    </div>
  );
}
