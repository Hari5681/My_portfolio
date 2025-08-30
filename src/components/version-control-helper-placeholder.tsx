
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, Construction } from 'lucide-react';
import { motion } from 'framer-motion';

export function VersionControlHelperPlaceholder() {
    return (
        <Card className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center bg-card/50 backdrop-blur-xl border-accent/20 shadow-2xl shadow-accent/10 animate-breathing-border">
            <CardHeader>
                <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <GitBranch className="w-24 h-24 text-accent mx-auto mb-4" />
                </motion.div>
                <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent animate-text-glow">
                    Version Control Helper
                </CardTitle>
                <CardDescription>
                    This tool is currently under construction.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-center gap-4 text-muted-foreground">
                    <Construction className="w-6 h-6" />
                    <p className="font-semibold text-lg">Coming Soon!</p>
                </div>
                <p className="max-w-md mx-auto">
                   Struggling with Git commands? I'm developing an AI-powered assistant that will help you with everything from branching strategies to resolving merge conflicts. Stay tuned!
                </p>
            </CardContent>
        </Card>
    );
}
