import { useState, useEffect, useCallback } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  color: string;
  link: string;
  isViewAll?: boolean;
}

/* Google Prime Colors */
const googleColors = [
  "linear-gradient(135deg, #4285F4 0%, #2B5CBC 100%)",
  "linear-gradient(135deg, #EA4335 0%, #C5221F 100%)",
  "linear-gradient(135deg, #FBBC04 0%, #E8A400 100%)",
  "linear-gradient(135deg, #34A853 0%, #1E8E3E 100%)",
  "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
  "linear-gradient(135deg, #EA4335 0%, #FBBC04 100%)",
  "linear-gradient(135deg, #34A853 0%, #4285F4 100%)",
];

const projects: Project[] = [
  {
    id: 1,
    title: "Utility Plus",
    category: "SaaS (Mobile/Tablet/Web)",
    description:
      "Help agencies manage billing, track records, and streamline user data efficiently.",
    color: googleColors[0],
    link: "#",
  },
  {
    id: 2,
    title: "CloudGavel",
    category: "SaaS (Mobile/Web)",
    description:
      "An innovative eWarrant solution streamlining the warrant approval process.",
    color: googleColors[1],
    link: "#",
  },
  {
    id: 3,
    title: "Echelon Constructors",
    category: "ERP (Web App)",
    description:
      "Construction project management software for planning and execution.",
    color: googleColors[2],
    link: "#",
  },
  {
    id: 4,
    title: "Captable",
    category: "Fintech",
    description:
      "Cap table management with improved UX for finance teams.",
    color: googleColors[3],
    link: "#",
  },
  {
    id: 5,
    title: "Bumper Mandi",
    category: "AgriTech",
    description:
      "Digital mandi app enabling transparent grain trading for farmers.",
    color: googleColors[4],
    link: "#",
  },
  {
    id: 6,
    title: "React Portfolio Website",
    category: "Web Development",
    description:
      "Modern React portfolio with clean UI and reusable components.",
    color: googleColors[5],
    link: "#",
  },
  {
    id: 7,
    title: "View All Projects",
    category: "Projects",
    description:
      "Explore my complete collection of design and development work.",
    color: googleColors[6],
    link: "/projects",
    isViewAll: true,
  },
];

export const Carousel3D = () => {
  const navigate = useNavigate();

  const [rotation, setRotation] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragRotation, setDragRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* Responsive detection */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const itemCount = projects.length;
  const anglePerItem = 360 / itemCount;

  /* Responsive geometry */
  const radius = isMobile ? 220 : 380;
  const cardWidth = isMobile ? 220 : 260;
  const cardHeight = isMobile ? 300 : 340;

  const nextSlide = useCallback(() => {
    setRotation((prev) => prev - anglePerItem);
  }, [anglePerItem]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setDragRotation(rotation);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = (clientX - startX) * (isMobile ? 0.15 : 0.3);
    setRotation(dragRotation + diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const snapped =
      Math.round(rotation / anglePerItem) * anglePerItem;
    setRotation(snapped);
    setTimeout(() => setIsAutoPlaying(true), 2500);
  };

  const getActiveIndex = () => {
    const normalized = (((-rotation % 360) + 360) % 360);
    return Math.round(normalized / anglePerItem) % itemCount;
  };

  const activeIndex = getActiveIndex();
  const isAnyHovered = hoveredIndex !== null;

  return (
    /* 🔒 ROOT CLAMP – THIS KILLS HORIZONTAL SCROLL */
    <section className="relative w-full max-w-[100vw] overflow-x-hidden">
      <div className="relative w-full py-12 overflow-hidden">
        <div
          className={cn(
            "relative mx-auto flex items-center justify-center select-none",
            isMobile ? "h-[360px]" : "h-[500px]"
          )}
          style={{ perspective: isMobile ? "900px" : "1400px" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => {
            handleDragEnd();
            setIsAutoPlaying(true);
            setHoveredIndex(null);
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${isMobile ? -2 : -5}deg)`,
            }}
          >
            <div
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotation}deg)`,
                transition: isDragging
                  ? "none"
                  : "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
            >
              {projects.map((project, index) => {
                const angle = index * anglePerItem;
                const isActive = index === activeIndex;
                const isHovered = hoveredIndex === index;

                return (
                  <div
                    key={project.id}
                    className="absolute"
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardHeight}px`,
                      left: `-${cardWidth / 2}px`,
                      top: `-${cardHeight / 2}px`,
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                      opacity:
                        isAnyHovered && !isHovered ? 0.3 : 1,
                      filter:
                        isAnyHovered && !isHovered
                          ? "blur(6px)"
                          : "none",
                      transition:
                        "opacity 0.3s, filter 0.3s, transform 0.8s",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                      if (!isActive) {
                        setRotation(-index * anglePerItem);
                        return;
                      }
                      project.isViewAll
                        ? navigate(project.link)
                        : window.open(project.link, "_blank");
                    }}
                  >
                    <div
                      className={cn(
                        "w-full h-full rounded-3xl overflow-hidden bg-card border transition-all",
                        isActive && "border-primary"
                      )}
                    >
                      {project.isViewAll ? (
                        <div className="h-44 flex items-center justify-center bg-muted">
                          <ExternalLink className="w-10 h-10 text-muted-foreground" />
                        </div>
                      ) : (
                        <div
                          className="h-44 flex items-center justify-center text-white/30 text-6xl font-bold"
                          style={{ background: project.color }}
                        >
                          {project.category.charAt(0)}
                        </div>
                      )}

                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold text-sm">
                          {project.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
