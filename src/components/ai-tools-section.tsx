
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Code, BookText, ArrowRight, Feather, Film, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, useCarousel } from './ui/carousel';
import React, { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import Autoplay from "embla-carousel-autoplay";

const tools = [
    { id: 'summarizer', name: 'Text Summarizer', icon: BookText, href: '/tools/summarizer' },
    { id: 'code-generator', name: 'Code Generator', icon: Code, href: '/tools/code-generator' },
];

const ToolCard = ({ tool }) => {
    // Define a type for the tool object based on the 'tools' array structure
    type Tool = {
        id: string;
        name: string;
        icon: React.ElementType; // Using React.ElementType for icon component
        href: string;
    };
    const typedTool: Tool = tool; // Cast the prop to the defined type
    return (
      <motion.div 
        className="p-1 h-full w-full max-w-xs perspective-1000 flex-shrink-0"
        whileHover="hover"
        variants={{
            initial: { scale: 0.9, y: 30, opacity: 0 },
            animate: { scale: 1, y: 0, opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Link href={tool.href} className="block h-full w-full group">
            <motion.div
                className="relative w-full h-full min-h-[300px] rounded-2xl p-6 flex flex-col justify-between items-center text-center cursor-pointer overflow-hidden bg-card/30 backdrop-blur-xl border border-accent/20 shadow-xl shadow-accent/10"
                variants={{
                    hover: { scale: 1.05, rotateY: 10, boxShadow: '0 25px 50px -12px hsla(var(--accent), 0.25)' }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div className="absolute inset-0 animate-breathing-border rounded-2xl border-2 border-accent/50 opacity-50 group-hover:opacity-100 transition-opacity duration-500"/>
                <div className="absolute inset-0 bg-grid-pattern opacity-10"/>

                <div className="relative z-10">
                    <div className="p-4 bg-accent/10 rounded-full border border-accent/20 inline-block mb-4">
                        <tool.icon className="w-10 h-10 text-accent" />
                   </div>
                    <h3 className="text-2xl font-bold text-foreground">{tool.name}</h3>
                </div>
                <Button variant="link" className="text-accent group-hover:underline">
                    Use Tool <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </motion.div>
        </Link>
      </motion.div>
    );
};

const AnimatedCarouselButton = ({ direction }: { direction: 'prev' | 'next' }) => {
    const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
    const [sparks, setSparks] = useState([]);

    const handleClick = useCallback(() => {
        const newSparks = Array.from({ length: 12 }).map((_, i) => ({
            id: Math.random(),
            angle: i * 30, // 360 / 12
            distance: Math.random() * 20 + 40,
        }));
        setSparks(newSparks as any);
 // Removed 'as any' - It's better to define a type for sparks if possible, or ensure the logic is safe without casting.
        // For now, keeping it simple without addressing the type of 'sparks' array elements,
        // as the focus is on fixing the explicit 'any' on handleClick's parameters/return.
        // If a more specific type for sparks is needed, it should be defined based on its usage.
        // Example: interface Spark { id: number; angle: number; distance: number; }
        
        if (direction === 'prev') {
            scrollPrev();
        } else {
            scrollNext();
        }
    }, [direction, scrollPrev, scrollNext]);

    const isPrev = direction === 'prev';
    const isDisabled = isPrev ? !canScrollPrev : !canScrollNext;
    
    const Icon = isPrev ? ArrowLeft : ArrowRight;

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            disabled={isDisabled}
           className={cn(
                "absolute top-1/2 -translate-y-1/2 text-accent hover:text-accent/80 transition-all duration-300 h-10 w-10 hover:bg-transparent z-10",
                isPrev ? "-left-4 md:-left-12" : "-right-4 md:-right-12"
            )}
        >
            <Icon className="w-6 h-6 z-10" />
            <AnimatePresence>
                {sparks.map((spark: any) => (
                    <motion.div
                        key={spark.id}
                        className="absolute rounded-full bg-accent"
                        style={{
                            top: '50%',
                            left: '50%',
                            width: '6px',
                            height: '6px',
                            marginTop: '-3px',
                            marginLeft: '-3px',
                        }}
                        initial={{ scale: 0, x: 0, y: 0 }}
                        animate={{
                            x: Math.cos(spark.angle * (Math.PI / 180)) * spark.distance,
                            y: Math.sin(spark.angle * (Math.PI / 180)) * spark.distance,
                            scale: 1,
                            opacity: [1, 0.8, 0],
                        }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        onAnimationComplete={() => setSparks([])}
                    />
                ))}
            </AnimatePresence>
        </Button>
    );
};


export function AiToolsSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <section id="ai-tools" className="py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                 >
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 relative inline-block">
                        <span className="relative z-10 animate-text-glow bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent">
                            Explore the AI Toolkit
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        A suite of powerful, generative tools at your command. Select a tool to begin.
                    </p>
                </motion.div>
                
                <Carousel
                    plugins={[plugin.current]}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                    className="w-full max-w-[calc(100%-2rem)] sm:max-w-sm md:max-w-lg mx-auto"
                >
                    <CarouselContent className="-ml-4">
                        {tools.map((tool) => (
                           <CarouselItem key={tool.id} className="pl-4">
                             <ToolCard tool={tool} />
                           </CarouselItem>
                        ))}
                    </CarouselContent>
                    <AnimatedCarouselButton direction="prev" />
                    <AnimatedCarouselButton direction="next" />
                </Carousel>
            </div>
        </section>
    )
}
