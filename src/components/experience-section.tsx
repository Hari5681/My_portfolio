
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Code, Brush } from 'lucide-react';
import Link from 'next/link';
import { 
    Carousel, 
    CarouselContent, 
    CarouselItem, 
    CarouselNext, 
    CarouselPrevious 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useIsMobile } from '@/hooks/use-mobile';

const experiences = [
  {
    title: "My Portfolio Website",
    summary: "I built my first portfolio site using AI tools and Firebase Studio. It was a 30-day journey where I learned hosting, debugging, and web design basics by tackling real-world errors.",
    detailsPage: "/experiences/my-portfolio-website",
    icon: Code,
  },
  {
    title: "Freelance YouTube Thumbnail Creator",
    summary: "Started as a hobby, I designed 50+ thumbnails for gamers and vloggers using mobile tools. This taught me visual storytelling, client communication, and turning a creative skill into freelance income.",
    detailsPage: "/experiences/youtube-thumbnail-creator",
    icon: Brush,
  }
];

const ExperienceCard = ({ exp }) => (
    <Card className="bg-card/60 backdrop-blur-xl shadow-2xl shadow-accent/10 h-full flex flex-col group overflow-hidden border-0">
        <CardHeader className="text-center p-6">
            <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/20 animate-pulse rounded-full"/>
                <exp.icon className="w-8 h-8 text-accent z-10 relative" />
            </div>
            <CardTitle className="text-xl md:text-2xl font-bold text-accent animate-text-glow">
                {exp.title}
            </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-4 text-center flex-grow flex flex-col justify-between">
            <p className="text-muted-foreground text-sm leading-relaxed">{exp.summary}</p>
            <div className="pt-4 mt-auto">
                <Button asChild className="group btn-glow">
                <Link href={exp.detailsPage}>
                    View The Full Journey
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                </Button>
            </div>
        </CardContent>
    </Card>
);

export function ExperienceSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );
    const isMobile = useIsMobile();

  return (
    <section id="experience" className="py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-20 text-accent text-shadow-glow-accent"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          My Experience
        </motion.h2>
        
        <motion.div 
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {isMobile === undefined ? (
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="h-96 bg-card/50 animate-pulse rounded-lg"></div>
                    <div className="h-96 bg-card/50 animate-pulse rounded-lg"></div>
                 </div>
            ) : isMobile ? (
                 <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{ loop: true }}
                >
                    <CarouselContent>
                        {experiences.map((exp, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <ExperienceCard exp={exp} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8" />
                </Carousel>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={index} exp={exp} />
                    ))}
                </div>
            )}
        </motion.div>
      </div>
    </section>
  );
}
