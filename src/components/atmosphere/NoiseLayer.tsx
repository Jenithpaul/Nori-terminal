import { useEffect, useRef } from "react";

export function NoiseLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = 128);
    let height = (canvas.height = 128);
    let frameId: number;

    const generateNoise = () => {
      const imgData = ctx.createImageData(width, height);
      const data = imgData.data;
      const len = data.length;

      for (let i = 0; i < len; i += 4) {
        const val = Math.floor(Math.random() * 255);
        data[i] = val;     // R
        data[i + 1] = val; // G
        data[i + 2] = val; // B
        data[i + 3] = 16;  // Alpha (approx 6% opacity)
      }

      ctx.putImageData(imgData, 0, 0);
    };

    const loop = () => {
      generateNoise();
      frameId = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 size-full opacity-[0.02] mix-blend-overlay repeat bg-[size:128px_128px]"
    />
  );
}
