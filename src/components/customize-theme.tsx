
"use client";

import { useTheme } from "@/context/theme-provider";
import { Button } from "./ui/button";
import { Check, Palette, Wallpaper } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { accents } from "@/lib/accents";
import { wallpapers } from "@/components/animated-wallpapers";
import { useState } from "react";
import { Separator } from "./ui/separator";

export function CustomizeTheme() {
  const { accent, setAccent, wallpaper, setWallpaper } = useTheme();
  const [ripples, setRipples] = useState<{ id: number, x: number, y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples([...ripples, newRipple]);
  };

  return (
    <Popover>
        <PopoverTrigger asChild>
            <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9, rotate: -10 }}
                className="relative"
            >
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-12 w-12 rounded-full border-2 border-accent/50 bg-background/50 backdrop-blur-sm shadow-lg shadow-accent/20 relative overflow-hidden"
                    onClick={handleClick}
                >
                    <Palette className="w-6 h-6 text-accent z-10" />
                    <AnimatePresence>
                        {ripples.map((ripple) => (
                          <motion.div
                            key={ripple.id}
                            className="absolute rounded-full bg-accent/30"
                            style={{
                              left: ripple.x,
                              top: ripple.y,
                              transform: 'translate(-50%, -50%)',
                            }}
                            initial={{ width: 0, height: 0, opacity: 1 }}
                            animate={{ width: 100, height: 100, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            onAnimationComplete={() => {
                              setRipples((prevRipples) => prevRipples.filter((r) => r.id !== ripple.id));
                            }}
                          />
                        ))}
                    </AnimatePresence>
                </Button>
                <div className="absolute inset-0 rounded-full animate-pulse-glow-accent opacity-50 -z-10" />
            </motion.div>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-semibold mb-2">Accent Color</h4>
                    <div className="grid grid-cols-5 gap-2">
                        {accents.map((acc) => {
                            const isActive = accent === acc.id;
                            return (
                                <motion.div key={acc.id} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-1.5">
                                    <button
                                        onClick={() => setAccent(acc.id)}
                                        className={cn(
                                            "w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                                            isActive ? "border-foreground" : "border-transparent hover:border-foreground/50"
                                        )}
                                        style={{ backgroundColor: `hsl(${acc.cssVars.dark.accent})` }}
                                        aria-label={`Select ${acc.name} accent`}
                                    >
                                        {isActive && <Check className="w-4 h-4" style={{ color: `hsl(${acc.cssVars.dark.accentForeground})` }}/>}
                                    </button>
                                    <span className="text-xs text-muted-foreground">{acc.name}</span>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
                <Separator />
                 <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                        <Wallpaper className="w-4 h-4 mr-2" />
                        Wallpaper
                    </h4>
                    <div className="space-y-2">
                        {wallpapers.map((w) => {
                            const isActive = wallpaper === w.id;
                            return (
                                <motion.div key={w.id} whileTap={{ scale: 0.95 }}>
                                    <button
                                        onClick={() => setWallpaper(w.id)}
                                        className={cn(
                                            "w-full px-3 py-2 rounded-md border text-sm transition-all duration-200 flex items-center justify-between",
                                            isActive 
                                                ? "border-accent bg-accent/10 text-accent" 
                                                : "border-border bg-transparent hover:bg-accent/10"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            {w.name}
                                        </div>
                                        {isActive && <Check className="w-4 h-4" />}
                                    </button>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </PopoverContent>
    </Popover>
  );
}
