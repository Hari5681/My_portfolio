
'use client';

import { motion, animate } from 'framer-motion';
import { Code, BrainCircuit, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';

const AnimatedCounter = ({ to }: { to: number }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {
        if (inView && nodeRef.current) {
            const node = nodeRef.current;
            const controls = animate(0, to, {
                duration: 2,
                ease: 'easeOut',
                onUpdate(value) {
                    node.textContent = Math.round(value).toString();
                }
            });
            return () => controls.stop();
        }
    }, [inView, to]);

    return <span ref={(node) => {
        nodeRef.current = node;
        (ref as React.RefCallback<HTMLSpanElement>)(node);
    }}>0</span>;
};

const stats = [
    {
        icon: BrainCircuit,
        label: 'Concepts to Learn',
        value: 128,
    },
    {
        icon: Code,
        label: 'Examples Generated',
        value: 2048,
    },
    {
        icon: BarChart3,
        label: 'Roadmap Progress',
        value: 15,
        suffix: '%',
    }
]

export function AnimatedStats() {
    return (
        <Card className="bg-card/30 backdrop-blur-xl border border-accent/20 shadow-xl shadow-accent/10">
            <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center">
                            <stat.icon className="w-10 h-10 text-accent mb-4" />
                            <p className="text-4xl font-bold text-foreground">
                                <AnimatedCounter to={stat.value} />
                                {stat.suffix}
                            </p>
                            <p className="text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
