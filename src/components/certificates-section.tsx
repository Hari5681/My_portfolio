
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';

export function CertificatesSection() {
  return (
    <section id="certificates" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-card/60 backdrop-blur-md border-accent/30 shadow-lg shadow-accent/10">
            <CardHeader className="items-center text-center">
              <Award className="w-16 h-16 text-accent mb-4" />
              <CardTitle className="text-3xl font-bold text-accent text-shadow-glow-accent">Certificates & Achievements</CardTitle>
              <CardDescription>This section is currently under construction.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                I'm currently gathering all my certificates and achievements to showcase here. Please check back soon!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
