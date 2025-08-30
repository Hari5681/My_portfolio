
"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from 'next/link';
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

export interface SkillProps {
  id: string;
  name: string;
  level: number;
  icon: React.ReactNode;
  href: string;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export function SkillCard({ id, name, level, icon, href }: SkillProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
  const scale = useTransform([mouseX, mouseY], ([newX, newY]) => (Math.abs(newX) > 0 || Math.abs(newY) > 0 ? 1.05 : 1));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isComingSoon = level === 0;
  
  const CardContent = () => (
    <div
      className={`relative p-6 rounded-2xl h-full flex flex-col justify-between overflow-hidden
      bg-card/50 backdrop-blur-lg
      ${isComingSoon ? 'animate-breathing-border' : ''}
      transition-all duration-300 hover:shadow-accent/30 hover:shadow-lg
      transform-style-preserve-3d
      `}
    >
       {isComingSoon && <div className="absolute inset-0 bg-shimmer opacity-70" />}
      <div className="relative z-10 text-center flex flex-col items-center">
        <motion.div
          className="text-accent mb-4 w-fit p-4 rounded-full bg-accent/10 border border-accent/20"
          style={{ transform: "translateZ(40px)" }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-bold text-foreground mb-3" style={{ transform: "translateZ(30px)" }}>{name}</h3>
      </div>

      <div className="relative z-10 w-full" style={{ transform: "translateZ(20px)" }}>
          {isComingSoon ? (
              <div className="h-12 flex items-center justify-center">
                <Badge variant="secondary" className="w-full justify-center bg-accent/10 text-accent border-accent/20">
                    Coming Soon
                </Badge>
              </div>
          ) : (
              <>
                  <p className="text-sm font-medium text-accent text-center mb-2">{level}% Mastery</p>
                  <Progress value={level} className="h-2 [&>div]:bg-accent" />
                   <Button variant="link" className="text-muted-foreground group-hover:text-accent w-full mt-4 transition-all">
                      View Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
              </>
          )}
      </div>
    </div>
  );

  return (
    <motion.div
      variants={cardVariants}
      className="w-full h-full perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-d",
        rotateX,
        rotateY,
        scale
      }}
    >
      <Link href={href} className="block h-full group">
        <CardContent />
      </Link>
    </motion.div>
  );
}
