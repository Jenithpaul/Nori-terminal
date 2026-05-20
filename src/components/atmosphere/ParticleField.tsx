import { useEffect, useRef } from "react";

interface ParticleFieldProps {
  density?: number;
  interactive?: boolean;
}

export function ParticleField({ density = 70, interactive = true }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let mouse = { x: W / 2, y: H / 2 };
    let raf = 0;

    const onResize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", onResize);
    if (interactive) {
      window.addEventListener("mousemove", onMouse);
    }

    type P = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; hue: number };
    const particles: P[] = Array.from({ length: density }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.45 + 0.1,
      hue: Math.random() > 0.75 ? 165 : 0, // Jade or white
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        if (interactive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            p.vx += (dx / dist) * 0.008;
            p.vy += (dy / dist) * 0.008;
          }
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (p.hue === 165) {
          ctx.fillStyle = `hsla(165, 70%, 65%, ${p.alpha * 0.8})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.35})`;
        }
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - d / 90) * 0.05;
            ctx.strokeStyle = `rgba(110, 231, 183, ${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      if (interactive) {
        window.removeEventListener("mousemove", onMouse);
      }
    };
  }, [density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full opacity-60 z-[2]"
    />
  );
}
