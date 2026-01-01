import { Search, FolderKanban, Timer, TrendingUp } from "lucide-react";
import { useState } from "react";

interface StatsSectionProps {
  projectCount: number;
  avgCompletionTime: string;
  onSearch: (query: string) => void;
}

const StatsSection = ({ projectCount, avgCompletionTime, onSearch }: StatsSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {/* Projects Count */}
      <div className="bento-card p-5 flex items-center gap-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <FolderKanban className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <p className="text-3xl font-bold text-foreground">{projectCount}</p>
          <p className="text-sm text-muted-foreground">Projects Completed</p>
        </div>
      </div>

      {/* Average Time */}
      <div className="bento-card p-5 flex items-center gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-primary flex items-center justify-center">
          <Timer className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <p className="text-3xl font-bold text-foreground">{avgCompletionTime}</p>
          <p className="text-sm text-muted-foreground">Avg. Completion</p>
        </div>
      </div>

      {/* Success Rate */}
      <div className="bento-card p-5 flex items-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning to-destructive flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <p className="text-3xl font-bold text-foreground">98%</p>
          <p className="text-sm text-muted-foreground">Success Rate</p>
        </div>
      </div>

      {/* Search */}
      <div className="bento-card p-5 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
