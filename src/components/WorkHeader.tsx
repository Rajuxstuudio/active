import { useState } from "react";
import { Search, Sparkles, Palette, Brush, Layers, Layout, Monitor, Smartphone, Code2, Terminal, Database, Cloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: "ux-ui", label: "UX/UI", icon: "🎨" },
  { id: "templates", label: "Templates", icon: "📐" },
  { id: "development", label: "Development", icon: "💻" },
];

// Tab-specific icon configurations
const tabIcons = {
  "ux-ui": {
    icons: [Palette, Brush, Layers, Sparkles],
    colors: ["#7C3AED", "#EC4899", "#F97316", "#A855F7"],
  },
  "templates": {
    icons: [Layout, Monitor, Smartphone, Layers],
    colors: ["#06B6D4", "#3B82F6", "#6366F1", "#0EA5E9"],
  },
  "development": {
    icons: [Code2, Terminal, Database, Cloud],
    colors: ["#10B981", "#14B8A6", "#22C55E", "#059669"],
  },
};

// Floating icon component for header
const FloatingHeaderIcon = ({ 
  icon: Icon, 
  delay, 
  x, 
  y, 
  color 
}: { 
  icon: any; 
  delay: number; 
  x: string; 
  y: string; 
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, y: 20 }}
    animate={{ 
      opacity: [0, 0.7, 0.7, 0],
      scale: [0.5, 1.2, 1, 0.5],
      y: [20, -10, -20, -40],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
  >
    <Icon className="w-5 h-5 md:w-7 md:h-7" style={{ color }} />
  </motion.div>
);

interface WorkHeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onSearch: (query: string) => void;
  projectCount: number;
  avgTime: string;
  successRate: string;
}

const WorkHeader = ({
  activeTab,
  onTabChange,
  onSearch,
  projectCount,
  avgTime,
  successRate,
}: WorkHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const currentIcons = tabIcons[activeTab as keyof typeof tabIcons] || tabIcons["ux-ui"];

  return (
    <div className="space-y-8">
      {/* My Work Heading with Floating Icons */}
      <div className="text-center animate-fade-in relative">
        {/* Floating Icons Container - Only above heading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`icons-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 overflow-visible pointer-events-none"
            style={{ height: '120px', top: '-40px' }}
          >
            {currentIcons.icons.map((Icon, index) => (
              <FloatingHeaderIcon
                key={index}
                icon={Icon}
                delay={index * 0.6}
                x={`${10 + index * 25}%`}
                y={`${15 + (index % 2) * 30}%`}
                color={currentIcons.colors[index]}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 relative z-10">
          My Work
        </h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground relative z-10">
          <Sparkles className="w-5 h-5 text-accent" />
          <span>Crafted with passion and precision</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-secondary/50 backdrop-blur-sm border border-border/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-md scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center">
            <Search className="absolute left-5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects, technologies, or descriptions..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Content Row with Description and Stats */}
      <div 
        className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-gradient-to-r from-card via-card to-secondary/30 border border-border/30 animate-fade-in"
        style={{ animationDelay: "300ms" }}
      >
        {/* Left - Description */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            {activeTab === "ux-ui" && "Project Showcase"}
            {activeTab === "templates" && "Template Collection"}
            {activeTab === "development" && "Development Portfolio"}
          </h2>
          <p className="text-muted-foreground max-w-xl">
            {activeTab === "ux-ui" && "Explore my latest work and creative endeavors in user experience and interface design."}
            {activeTab === "templates" && "Browse my collection of ready-to-use templates and design systems."}
            {activeTab === "development" && "Discover full-stack applications and technical implementations."}
          </p>
        </div>

        {/* Right - Stats */}
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="stat-card">
            <span className="stat-value">{projectCount}</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="h-10 w-px bg-border/50" />
          <div className="stat-card">
            <span className="stat-value">{avgTime}</span>
            <span className="stat-label">Avg Time</span>
          </div>
          <div className="h-10 w-px bg-border/50" />
          <div className="stat-card">
            <span className="stat-value">{successRate}</span>
            <span className="stat-label">Success</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHeader;
