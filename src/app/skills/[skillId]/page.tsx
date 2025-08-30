
import { skillsContent, SkillContent } from '@/lib/skills-data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SkillDetailClient } from '@/components/skill-detail-client';

export async function generateStaticParams() {
  return Object.keys(skillsContent).map((skillId) => ({
    skillId,
  }));
}

export default function SkillDetailPage({ params }: { params: { skillId: string } }) {
  const { skillId } = params;
  
  const skill: SkillContent | undefined = skillsContent[skillId];

  if (!skill) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center container mx-auto px-4 md:px-6">
                 <Card className="text-center bg-card/50 backdrop-blur-xl border-destructive/50 shadow-lg shadow-destructive/10">
                    <CardHeader>
                        <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                        <CardTitle className="text-3xl text-destructive">Skill Not Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">
                            The skill you are looking for does not have a detail page yet.
                        </p>
                        <Button asChild>
                           <Link href="/skills">
                            <ArrowLeft className="mr-2 h-4 w-4"/>
                             Back to Skills
                           </Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <SkillDetailClient skill={skill} />
      </main>
      <Footer />
    </div>
  );
}
