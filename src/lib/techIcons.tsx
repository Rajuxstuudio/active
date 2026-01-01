import {
  Atom,
  Boxes,
  Cloud,
  Code2,
  Database,
  FileCode,
  Flame,
  Globe,
  Layers,
  Palette,
  Server,
  Smartphone,
  Sparkles,
  Zap,
  Lock,
  LayoutGrid,
  Container,
  Cpu,
  Wifi,
  HardDrive,
  Braces,
} from "lucide-react";

// Map tech names to icons and colors
export const techIconMap: Record<string, { icon: React.ElementType; color: string }> = {
  // Frontend
  "React": { icon: Atom, color: "#61DAFB" },
  "React Native": { icon: Smartphone, color: "#61DAFB" },
  "Vue.js": { icon: Sparkles, color: "#4FC08D" },
  "Next.js": { icon: Globe, color: "#000000" },
  "TypeScript": { icon: FileCode, color: "#3178C6" },
  "JavaScript": { icon: Braces, color: "#F7DF1E" },
  "TailwindCSS": { icon: Palette, color: "#06B6D4" },
  "Chart.js": { icon: LayoutGrid, color: "#FF6384" },
  
  // Backend
  "Node.js": { icon: Server, color: "#339933" },
  "Python": { icon: Code2, color: "#3776AB" },
  "FastAPI": { icon: Zap, color: "#009688" },
  "Express": { icon: Server, color: "#000000" },
  
  // Databases
  "Firebase": { icon: Flame, color: "#FFCA28" },
  "MongoDB": { icon: Database, color: "#47A248" },
  "PostgreSQL": { icon: Database, color: "#4169E1" },
  "Prisma": { icon: Layers, color: "#2D3748" },
  "Redis": { icon: HardDrive, color: "#DC382D" },
  
  // Cloud & DevOps
  "AWS": { icon: Cloud, color: "#FF9900" },
  "Vercel": { icon: Globe, color: "#000000" },
  "Docker": { icon: Container, color: "#2496ED" },
  
  // Payments & Services
  "Stripe": { icon: Lock, color: "#635BFF" },
  "Socket.io": { icon: Wifi, color: "#010101" },
  
  // Default
  "default": { icon: Cpu, color: "#6366F1" },
};

export const getTechIcon = (tech: string) => {
  return techIconMap[tech] || techIconMap["default"];
};
