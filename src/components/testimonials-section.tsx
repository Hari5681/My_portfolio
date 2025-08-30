
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'AI Innovator Weekly',
    title: 'Editor',
    quote: "Hari's portfolio is a stunning showcase of what's possible with modern AI. The interactive elements are not just visually impressive—they're functional and fast.",
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'logo abstract',
  },
  {
    name: 'TechLead Connect',
    title: 'Lead Developer',
    quote: 'The AI chat is incredibly responsive and understands context surprisingly well. It feels like you are talking to a real assistant. A truly next-level implementation.',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'person portrait',
  },
  {
    name: 'Creative Code Mag',
    title: 'Design Critic',
    quote: 'An absolute masterclass in UI/UX design for AI applications. The blend of glassmorphism and smooth animations creates an unforgettable user experience.',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'logo geometric',
  }
];

const cardVariants = (fromLeft: boolean) => ({
  offscreen: {
    x: fromLeft ? -100 : 100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
});

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 overflow-hidden">
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
              Words From the Wise
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            See what industry leaders and creative professionals are saying about my work.
          </p>
        </motion.div>

        <div className="space-y-12 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants(index % 2 === 0)}
            >
              <Card className="bg-card/30 backdrop-blur-xl border border-accent/20 shadow-xl shadow-accent/10 overflow-hidden">
                <CardContent className="p-8 grid md:grid-cols-3 gap-8 items-center">
                  <div className="flex flex-col items-center text-center md:border-r border-accent/20 md:pr-8">
                    <div className="relative w-24 h-24 mb-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={100}
                        height={100}
                        data-ai-hint={testimonial.avatarHint}
                        className="rounded-full object-cover border-2 border-accent/50"
                      />
                       <div className="absolute inset-0 rounded-full animate-pulse-glow-accent opacity-50"/>
                    </div>
                    <h4 className="font-bold text-lg text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg italic text-foreground/90 leading-relaxed">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
