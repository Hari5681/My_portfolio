
'use client';

import React, { useRef, useEffect } from 'react';
import { useTheme } from '@/context/theme-provider';
import { cn } from '@/lib/utils';
import { useMousePosition } from '@/hooks/use-mouse-position';

// --- Helper Functions ---
function getHSLValues(hslString: string): [number, number, number] {
    if (!hslString) return [0, 0, 0];
    const [h, s, l] = hslString.split(' ').map(parseFloat);
    return [h || 0, s || 0, l || 0];
}

// --- Wallpaper Components ---

// 1. Neural Network
const NeuralNetworkWallpaper: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { selectedAccent } = useTheme();
    const mousePos = useMousePosition();
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
  
      let animationFrameId: number;
      const nodes: any[] = [];
      const spacing = 40;
  
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        nodes.length = 0;
        const cols = Math.floor(canvas.width / spacing);
        const rows = Math.floor(canvas.height / spacing);
        for (let i = 0; i <= cols; i++) {
          for (let j = 0; j <= rows; j++) {
            nodes.push({
              x: i * spacing,
              y: j * spacing,
              baseAlpha: 0.1,
              pulseAlpha: 0,
            });
          }
        }
      };
  
      const animate = () => {
        const accent = selectedAccent?.cssVars.dark.accent || '30 50% 65%';
        const [h, s, l] = getHSLValues(accent);
  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        // Random synapse firing
        const randNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (randNode) randNode.pulseAlpha = 1;
  
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          node.pulseAlpha *= 0.95; // Fade out pulse
  
          let distanceToMouse = Infinity;
          if (mousePos.x !== null && mousePos.y !== null) {
            distanceToMouse = Math.sqrt((node.x - mousePos.x) ** 2 + (node.y - mousePos.y) ** 2);
          }
  
          const mouseEffect = Math.max(0, 1 - distanceToMouse / 200);
          const finalAlpha = Math.min(1, node.baseAlpha + node.pulseAlpha + mouseEffect * 0.5);
  
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${finalAlpha})`;
          ctx.fill();
  
          // Connect to nearby nodes
          if(i > 0 && i % Math.floor(canvas.height / spacing) !== 0) { // Avoid connecting across rows
            const prevNode = nodes[i - 1];
            const lineAlpha = (node.pulseAlpha + prevNode.pulseAlpha) / 2;
            if (lineAlpha > 0.1) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(prevNode.x, prevNode.y);
                ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${lineAlpha * 0.5})`;
                ctx.stroke();
            }
          }
        }
  
        animationFrameId = requestAnimationFrame(animate);
      };
  
      resizeCanvas();
      animate();
  
      window.addEventListener('resize', resizeCanvas);
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }, [selectedAccent, mousePos]);
  
    return <canvas ref={canvasRef} className={cn('fixed inset-0 -z-10 bg-background w-full h-full')} />;
};

// 2. Constellation
const ConstellationWallpaper: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { selectedAccent } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: any[] = [];
        const dpr = window.devicePixelRatio || 1;
        let activeConstellations: any[] = [];
        let frameCount = 0;


        const resizeCanvas = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            const particleCount = Math.floor(canvas.width * canvas.height / 18000);
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: Math.random() * 0.2 - 0.1,
                    vy: Math.random() * 0.2 - 0.1,
                    radius: Math.random() * 1.5 * dpr + 1,
                });
            }
        };

        const createConstellation = () => {
            const numPoints = Math.floor(Math.random() * 4) + 3; // 3 to 6 points
            const center = { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
            const radius = Math.random() * 100 + 50;
            const points = [];
            for (let i = 0; i < numPoints; i++) {
                points.push({
                    x: center.x + (Math.random() - 0.5) * radius * 2,
                    y: center.y + (Math.random() - 0.5) * radius * 2,
                });
            }
            return { points, alpha: 0, life: 240, maxLife: 240 }; // life in frames
        };

        const animate = () => {
            const accent = selectedAccent?.cssVars.dark.accent || '30 50% 65%';
            const [h, s, l] = getHSLValues(accent);
            
            frameCount++;
            if (frameCount % 60 === 0 && activeConstellations.length < 10) { // Increased frequency and max constellations
                activeConstellations.push(createConstellation());
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Animate constellations
            activeConstellations = activeConstellations.filter(c => c.life > 0);
            activeConstellations.forEach(c => {
                c.life--;
                if (c.life < c.maxLife / 4) {
                    c.alpha = Math.max(0, c.alpha - 1 / (c.maxLife / 4));
                } else if (c.alpha < 1) {
                    c.alpha = Math.min(1, c.alpha + 0.02);
                }

                ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${c.alpha * 0.7})`;
                ctx.lineWidth = dpr * 0.5;
                ctx.beginPath();
                ctx.moveTo(c.points[0].x, c.points[0].y);
                for (let i = 1; i < c.points.length; i++) {
                    ctx.lineTo(c.points[i].x, c.points[i].y);
                }
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        animate();

        window.addEventListener('resize', resizeCanvas);
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [selectedAccent]);

    return <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full bg-background" />;
};


// 3. Subtle Stars
const SubtleStarsWallpaper: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { selectedAccent } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: any[] = [];
        const dpr = window.devicePixelRatio || 1;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            const starCount = Math.floor(canvas.width * canvas.height / 8000);
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.1 * dpr,
                    vy: (Math.random() - 0.5) * 0.1 * dpr,
                    radius: Math.random() * 1.2 * dpr + 0.5,
                    alpha: Math.random() * 0.5 + 0.5,
                    twinkleSpeed: Math.random() * 0.015,
                });
            }
        };

        const animate = () => {
            const accent = selectedAccent?.cssVars.dark.accent || '30 50% 65%';
            const [h, s, l] = getHSLValues(accent);
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.x += star.vx;
                star.y += star.vy;

                // Wrap particles around the screen
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;

                star.alpha += star.twinkleSpeed;
                if (star.alpha > 1 || star.alpha < 0.3) {
                    star.twinkleSpeed *= -1;
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${star.alpha})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        animate();

        window.addEventListener('resize', resizeCanvas);
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [selectedAccent]);

    return <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full bg-background" />;
};


// --- Wallpaper Definitions ---

export type Wallpaper = {
  id: string;
  name: string;
  component: React.FC;
};

export const wallpapers: Wallpaper[] = [
  { id: 'none', name: 'None', component: () => null },
  { id: 'constellation', name: 'Default', component: ConstellationWallpaper },
  { id: 'neural-network', name: 'Neural Network', component: NeuralNetworkWallpaper },
  { id: 'subtle-stars', name: 'Subtle Stars', component: SubtleStarsWallpaper },
];
