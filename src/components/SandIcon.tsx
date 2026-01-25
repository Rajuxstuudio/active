import { useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface SandIconProps {
  Icon: React.ComponentType<{ className?: string }>;
  size?: number;
}

export const SandIcon = ({ Icon, size = 160 }: SandIconProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = size;
    canvas.height = size;

    // 1️⃣ Convert the EXACT icon into SVG markup
    const svgMarkup = renderToStaticMarkup(
      <Icon className="w-full h-full" />
    );

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${size}" height="${size}"
           viewBox="0 0 24 24"
           fill="white">
        ${svgMarkup}
      </svg>
    `;

    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(svg);

    img.onload = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);

      const imageData = ctx.getImageData(0, 0, size, size);
      ctx.clearRect(0, 0, size, size);

      particles.current = [];

      for (let y = 0; y < size; y += 3) {
        for (let x = 0; x < size; x += 3) {
          const i = (y * size + x) * 4;
          if (imageData.data[i + 3] > 150) {
            particles.current.push({
              x,
              y,
              ox: x,
              oy: y,
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }

      const animate = () => {
        ctx.clearRect(0, 0, size, size);
        ctx.fillStyle = "#fff";

        particles.current.forEach((p) => {
          if (hovered) {
            p.phase += 0.15;
            p.x = p.ox + Math.sin(p.phase) * 2;
            p.y = p.oy + Math.cos(p.phase) * 2;
          } else {
            p.x += (p.ox - p.x) * 0.1;
            p.y += (p.oy - p.y) * 0.1;
          }

          ctx.fillRect(p.x, p.y, 1.4, 1.4);
        });

        requestAnimationFrame(animate);
      };

      animate();
    };
  }, [Icon, hovered, size]);

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-48 h-48 lg:w-48 lg:h-48"
    />
  );
};
