
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
           >
              <Card className="bg-card/60 backdrop-blur-xl border-0 shadow-2xl shadow-accent/10 animate-breathing-border">
                <CardHeader>
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/30"
                  >
                    <AlertTriangle className="h-10 w-10 text-accent" />
                  </motion.div>
                  <CardTitle className="text-4xl font-bold text-accent animate-text-glow">404 - Lost in Space</CardTitle>
                  <CardDescription className="text-muted-foreground pt-2">
                    Oops! The page you're looking for seems to have drifted off into another galaxy.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Button asChild className="btn-glow animate-pulse-glow-accent">
                      <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Return to Home Base
                      </Link>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
           </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
