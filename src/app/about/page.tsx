
import { AboutSection } from '@/components/about-section';
import { Footer } from '@/components/footer';
import { AnimatedSection } from '@/components/animated-section';
import { Header } from '@/components/header';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <AnimatedSection yPadding="pt-12 lg:pt-16">
            <AboutSection />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
