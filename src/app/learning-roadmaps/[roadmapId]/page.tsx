
import { roadmaps, roadmapDetails } from '@/lib/roadmaps-data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RoadmapDetailClient } from '@/components/roadmap-detail-client';


export async function generateStaticParams() {
  return Object.keys(roadmaps).map((roadmapId) => ({
    roadmapId,
  }));
}

export default function RoadmapDetailPage({ params }: { params: { roadmapId: string } }) {
  const { roadmapId } = params;

  const roadmap = roadmaps[roadmapId];
  const details = roadmapDetails[roadmapId];

  if (!roadmap || !details) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center container mx-auto px-4 md:px-6">
                 <Card className="text-center bg-card/50 backdrop-blur-xl border-destructive/50 shadow-lg shadow-destructive/10">
                    <CardHeader>
                        <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                        <CardTitle className="text-3xl text-destructive">Roadmap Not Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">
                            The learning roadmap you are looking for does not exist or is under construction.
                        </p>
                        <Button asChild>
                           <Link href="/learning-roadmaps">
                            <ArrowLeft className="mr-2 h-4 w-4"/>
                             Back to Roadmaps
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
      <main className="flex-grow pt-28 pb-16 overflow-hidden">
        <RoadmapDetailClient roadmap={roadmap} details={details} />
      </main>
      <Footer />
    </div>
  );
}
