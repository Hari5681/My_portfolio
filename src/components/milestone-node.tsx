
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Milestone, BookOpen, ExternalLink } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import Link from 'next/link';

const NodeCodeBlock = ({ code }: { code: string }) => {
    return (
        <div className="relative rounded-lg font-mono text-sm my-4 bg-background/50 border border-accent/20">
            <pre className="p-4 overflow-x-auto">
                 <code className="whitespace-pre-wrap break-all text-foreground/80">
                    {code}
                </code>
            </pre>
        </div>
    );
};

export function RoadmapMilestone({ milestone, isLast }: { milestone: any, isLast: boolean }) {
  return (
    <div className="relative pl-12 md:pl-0 pb-16 md:pb-24 group">
       <div className="absolute left-0 top-2 -translate-x-1/2 w-5 h-5 rounded-full bg-background border-2 border-accent ring-4 ring-accent/30 z-10 md:hidden" />
      
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Card className="bg-card/60 backdrop-blur-xl border-accent/20 shadow-lg shadow-accent/10">
          <CardHeader>
            <div className="flex items-center gap-4 mb-2">
                <Milestone className="w-8 h-8 text-accent" />
                <CardTitle className="text-2xl text-accent">{milestone.label}</CardTitle>
            </div>
            <CardDescription>{milestone.description}</CardDescription>
          </CardHeader>
          <CardContent>
             <Accordion type="single" collapsible className="w-full">
              {milestone.nodes.map((node: any, index: number) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>
                     <div className='flex items-center gap-2 text-left'>
                        {node.type === 'main' && <span className="font-semibold text-primary">{node.label}</span>}
                        {node.type === 'sub' && <span className="text-muted-foreground">{node.label}</span>}
                        {node.type === 'option' && <span className="italic text-accent/80">{node.label}</span>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                     <p className="text-foreground/80 mb-4">{node.description}</p>
                     {node.code && <NodeCodeBlock code={node.code} />}
                     {node.resources && node.resources.length > 0 && (
                        <div className="mt-4">
                            <h4 className="font-semibold mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4 text-accent"/> Resources</h4>
                            <ul className="space-y-2">
                                {node.resources.map((resource: any) => (
                                    <li key={resource.url}>
                                        <Button asChild variant="link" className="p-0 h-auto text-muted-foreground hover:text-accent">
                                            <Link href={`/redirect?url=${encodeURIComponent(resource.url)}`} target="_blank">
                                                {resource.label}
                                                <ExternalLink className="w-3 h-3 ml-1.5"/>
                                            </Link>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                     )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
