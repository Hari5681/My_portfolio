
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Milestone, Construction } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export function RoadmapMilestone({ milestone, isLast }) {
  return (
    <motion.div 
        className="relative pl-12 pb-16"
        variants={itemVariants}
    >
      <div className="absolute left-4 top-2 -translate-x-1/2 w-5 h-5 rounded-full bg-background border-2 border-accent ring-4 ring-accent/30 z-10" />
      
      <motion.div
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Card className="bg-card/60 backdrop-blur-xl border-accent/20 shadow-lg shadow-accent/10">
          <CardHeader>
            <div className="flex items-center gap-4 mb-2">
                <Milestone className="w-8 h-8 text-accent" />
                <CardTitle className="text-2xl text-accent">{milestone.label}</CardTitle>
            </div>
            <CardDescription>{milestone.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <div className="flex items-center justify-center gap-4 text-muted-foreground p-4 bg-muted/50 rounded-lg">
                    <Construction className="w-6 h-6" />
                    <p className="font-semibold text-lg">Content Coming Soon!</p>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                    Detailed learning nodes, code examples, and resources for this milestone are being developed.
                </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
