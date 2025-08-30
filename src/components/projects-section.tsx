
"use client";

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MoveRight, Sparkles, Code, BookText, Film, Construction } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: "Project: Portfolio Website – hariportfolio.xyz",
    description: "My first live website, built as a beginner in ~30 days. It gave me confidence, patience, and a strong start in web development.",
    imageUrl: "https://res.cloudinary.com/dasii2ow3/image/upload/v1756463412/banner_x9x5vs.jpg",
    imageHint: "futuristic landscape",
    tags: ["Firebase Studio", "Namecheap", "HTML/CSS", "GitHub", "Responsive Design"],
    detailsPage: "/projects/my-portfolio-website",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const ProjectCard = ({ project, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            key={index}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
            }}
            className="perspective-1000"
        >
            <Link href={project.detailsPage} className="block group">
                <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ scale: 1.02 }}
                    style={{ rotateX, rotateY, transformStyle: "preserve-d" }}
                    className="relative w-full h-full min-h-[450px] overflow-hidden rounded-xl shadow-lg shadow-accent/10 border-2 border-accent/20 bg-card/50 backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-accent/20"
                >
                    <div className="absolute inset-0" style={{ transform: "translateZ(20px)" }}>
                         <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                            data-ai-hint={project.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                    </div>
                    
                    <div className="absolute bottom-0 left-0 p-6 w-full text-white flex flex-col justify-end h-full" style={{ transform: "translateZ(50px)" }}>
                        <div className="mt-auto">
                            <h3 className="text-2xl font-bold mb-2 text-shadow-glow-accent">{project.title}</h3>
                            <p className="text-gray-300 text-sm mb-4 h-10 overflow-hidden">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4 h-12">
                                {project.tags.map(tag => (
                                   <Badge key={tag} variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm text-xs px-2.5 py-1">{tag}</Badge>
                                ))}
                            </div>
                             <motion.div
                                className="flex items-center text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                              >
                               View Details <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
};

const ComingSoonCard = () => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
            }}
            className="perspective-1000"
        >
            <div
                className="relative w-full h-full min-h-[450px] overflow-hidden rounded-xl bg-transparent flex flex-col items-center justify-center text-center p-6"
            >
                <div className="absolute inset-0 bg-grid-pattern opacity-10"/>
                <Construction className="w-16 h-16 text-accent mb-6 animate-pulse-glow-accent" />
                <h3 className="text-2xl font-bold mb-2 text-accent">Coming Soon...</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                    Building something big. Stay tuned for updates on my next major project!
                </p>
            </div>
        </motion.div>
    );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-accent text-shadow-glow-accent"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h2>
         <motion.p 
              className="text-lg text-muted-foreground text-center mb-20 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
             A showcase of my recent work, where design meets functionality. Each project is a story of learning and creating.
            </motion.p>
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
           <ComingSoonCard />
        </motion.div>
      </div>
    </section>
  );
}
