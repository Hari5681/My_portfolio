
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function CertificatesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <AnimatedSection yPadding="pt-12 lg:pt-16">
          <div className="container mx-auto px-4 md:px-6">
            
            <Card className="bg-card/60 backdrop-blur-md border-accent/30 shadow-lg shadow-accent/10 mt-8">
              <CardHeader className="items-center text-center">
                <Award className="w-16 h-16 text-accent mb-4" />
                <CardTitle className="text-3xl font-bold text-accent">Certificates & Achievements</CardTitle>
                <CardDescription>This section is currently under construction.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  I&apos;m currently gathering all my certificates and achievements to showcase here. Please check back soon!
                </p>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
