
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/theme-provider";
import { ConditionalThemeCustomizer } from "@/components/conditional-theme-customizer";
import "./globals.css";
import { WallpaperRenderer } from "@/components/wallpaper-renderer";
import { VisitorGate } from "@/components/visitor-gate";

export const metadata: Metadata = {
  metadataBase: new URL("https://hariportfolio.xyz"),
  title: "Hari Krishna's Portfolio",
  description: "Welcome to my personal portfolio. Explore my projects, skills, and experiences in web development and AI.",
  icons: {
    icon: "/images/fovcon.png",
  },
  openGraph: {
    title: "Hari Krishna's Portfolio",
    description: "A showcase of my journey in technology, from web development to AI.",
    url: "https://hariportfolio.xyz",
    siteName: "Hari Krishna's Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/dasii2ow3/image/upload/v1756463412/banner_x9x5vs.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
            <WallpaperRenderer />
            <VisitorGate>
              <div className="relative z-10">
                {children}
              </div>
            </VisitorGate>
            <Toaster />
            <ConditionalThemeCustomizer />
        </ThemeProvider>
      </body>
    </html>
  );
}
