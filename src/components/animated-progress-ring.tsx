
"use client";

import { motion } from "framer-motion";

export const AnimatedProgressRing = ({ value, label }: { value: number; label: string }) => {
    const circumference = 2 * Math.PI * 45; // 2 * pi * r
  
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-accent/10"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            <motion.circle
              className="text-accent"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: circumference - (value / 100) * circumference }}
              transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
              viewport={{ once: true }}
            />
          </svg>
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-xl font-bold text-foreground"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {value}%
          </motion.span>
        </div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      </div>
    );
};
