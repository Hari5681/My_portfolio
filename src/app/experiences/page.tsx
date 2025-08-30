
import { ExperienceSection } from '@/components/experience-section';
import { Footer } from '@/components/footer';
import { AnimatedSection } from '@/components/animated-section';
import { Header } from '@/components/header';

export default function ExperiencesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <AnimatedSection yPadding="py-0">
          <ExperienceSection />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
