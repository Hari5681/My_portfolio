
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

function RedirectComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [destination, setDestination] = useState('');

  useEffect(() => {
    const url = searchParams.get('url');
    if (url) {
      try {
        const decodedUrl = decodeURIComponent(url);
        const urlObject = new URL(decodedUrl);
        setDestination(urlObject.hostname);
      } catch (error) {
        setDestination('an external site');
      }

      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 2, 100));
      }, 50);

      const redirectTimeout = setTimeout(() => {
        window.location.href = url;
      }, 3000);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(redirectTimeout);
      };
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 opacity-50">
            <motion.div 
                className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,hsl(var(--accent)_/_0.3),transparent_80%)]"
                animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md text-center"
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8">
            <motion.div
                className="absolute inset-0 border-2 border-accent/20 rounded-full"
                animate={{ rotate: 360, scale: [1, 0.9, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
                className="absolute inset-4 border-t-2 border-t-primary rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
             <motion.div
                className="absolute inset-8 border-2 border-dashed border-accent/50 rounded-full"
                animate={{ rotate: 360, scale: [0.9, 1, 0.9] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                 <motion.div
                    className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                 >
                    <Zap className="w-8 h-8 text-accent animate-pulse" />
                </motion.div>
            </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent animate-text-glow">
          Teleporting...
        </h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Hold tight! We're redirecting you to <br className="sm:hidden" />
          <span className="font-semibold text-accent">{destination}</span>.
        </p>

        <div className="w-full bg-muted rounded-full h-2.5 mt-8 overflow-hidden border border-accent/20 relative">
          <motion.div
            className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
          <motion.div 
            className="absolute top-0 h-full w-2 bg-white/50 blur-sm"
            style={{ left: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function RedirectPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-background"><p>Loading...</p></div>}>
            <RedirectComponent />
        </Suspense>
    )
}
