
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

const educationData = [
    {
        degree: "B.Tech, Electronics & Communication Engineering",
        institution: "Chaitanya Engineering College, Visakhapatnam",
        date: "2023 - Present",
        description: [
            "3rd-year student diving deep into electronics and communication systems.",
            "Hands-on workshops on circuit design and signal processing.",
            "Exploring app development & UI/UX design alongside core studies."
        ],
    },
    {
        degree: "Intermediate (Class 12th), MPC Stream",
        institution: "BVK Junior College, Visakhapatnam",
        date: "2021 - 2023",
        description: [
            "Math, Physics & Chemistry sparked curiosity about electronics and coding.",
            "Started experimenting with app development & UI/UX as a hobby."
        ],
        grade: "Grade: B"
    },
    {
        degree: "High School (Class 10th)",
        institution: "N M C High School, Visakhapatnam",
        date: "2019 - 2021",
        description: [
            "Learned during online schooling; used time to explore tech beyond textbooks.",
            "Active in cricket & yoga, balancing learning with hobbies."
        ],
        grade: "Grade: A+"
    }
];

const cardVariants = (isLeft: boolean) => ({
    hidden: { opacity: 0, x: isLeft ? -100 : 100, rotateY: isLeft ? -30 : 30 },
    visible: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] // A nice ease-out curve
        }
    }
});

export function EducationSection() {
    return (
        <section id="education" className="py-20 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.h2 
                    className="text-4xl md:text-5xl font-bold text-center mb-20 text-accent text-shadow-glow-accent"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    My Academic Journey
                </motion.h2>

                <div className="relative max-w-5xl mx-auto">
                    {/* The timeline line */}
                    <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-accent/20 -translate-x-1/2">
                         <motion.div 
                            className="h-full w-full bg-accent"
                            style={{ scaleY: 0, transformOrigin: 'top' }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, amount: 0.2, margin: "-100px" }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                         />
                    </div>

                    <div className="space-y-16 md:space-y-24">
                        {educationData.map((edu, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    className="relative flex items-center group"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.4 }}
                                    variants={cardVariants(isLeft)}
                                >
                                     <div className={cn(
                                        "w-full flex",
                                        isLeft ? "md:justify-start" : "md:justify-end"
                                    )}>
                                        <div className={cn(
                                            "absolute left-4 md:left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-accent ring-4 ring-accent/30 transition-all duration-300 group-hover:ring-accent group-hover:scale-125 z-10"
                                        )} />
                                        
                                        <motion.div
                                            whileHover={{ scale: 1.05, y: -8, rotate: isLeft ? -1 : 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                            className={cn(
                                                "w-full md:w-1/2 ml-10 md:ml-0 perspective-1000",
                                                isLeft ? "md:mr-12" : "md:ml-12"
                                            )}
                                        >
                                            <Card className="bg-card/60 backdrop-blur-xl border-accent/20 shadow-2xl shadow-accent/10 h-full flex flex-col p-6">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-3">
                                                    <div className="p-3 bg-accent/10 rounded-full border border-accent/20 w-fit mb-3 sm:mb-0">
                                                        <GraduationCap className="w-6 h-6 text-accent" />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <p className="font-bold text-lg text-accent leading-tight">{edu.degree}</p>
                                                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                                                    </div>
                                                </div>
                                                 <p className="text-sm text-primary font-semibold mb-3">{edu.date}</p>
                                                <CardContent className="p-0 flex-grow">
                                                    <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80">
                                                        {edu.description.map((item, i) => <li key={i}>{item}</li>)}
                                                    </ul>
                                                </CardContent>
                                                {edu.grade && (
                                                    <div className="mt-4 pt-4 border-t border-accent/20 text-right">
                                                        <p className="text-sm font-semibold text-primary">{edu.grade}</p>
                                                    </div>
                                                )}
                                            </Card>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
