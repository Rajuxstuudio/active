import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Smartphone, Monitor } from "lucide-react";
import {
  SiFigma,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiFirebase,
  SiFlutter,
  SiAdobexd,
  SiWordpress,
  SiFramer
} from "react-icons/si";
import WorkHeader from "@/components/WorkHeader";
import { useState } from "react";
import ProjectBentoCard from "@/components/ProjectBentoCard";

// Import mockup images----------------------------------------------------------------
import mobileMockup1 from "@/assets/mockup-mobile-1.png";
import desktopMockup1 from "@/assets/mockup-desktop-1.png";
import mobileMockup2 from "@/assets/mockup-mobile-2.png";
import desktopMockup2 from "@/assets/mockup-desktop-2.png";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  color: string;
  link: string;
  tools: React.ReactNode[];
  hasMobile: boolean;
  hasWeb: boolean;
}

const googleColors = [
  "linear-gradient(135deg, #4285F4 0%, #2B5CBC 100%)",
  "linear-gradient(135deg, #EA4335 0%, #C5221F 100%)",
  "linear-gradient(135deg, #FBBC04 0%, #E8A400 100%)",
  "linear-gradient(135deg, #34A853 0%, #1E8E3E 100%)",
  "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
  "linear-gradient(135deg, #EA4335 0%, #FBBC04 100%)",
];

// Sample project data with category
const projectsData = [
  {
    logo: "",
    name: "Utility Plus",
    colors: ["#7C3AED", "#EC4899", "#F472B6", "#1E1E2E"],
    font: "Inter",
    isLive: true,
    description:
      "Help agencies manage billing, track records, and streamline user data efficiently. Improved the existing UX for better usability.",
    stack: ["Figma", "React", "TypeScript", "Tailwind CSS"],
    duration: "—",
    mobileMockup: mobileMockup1,
    webMockup: desktopMockup1,
    category: "ux-ui",
  },
  {
    logo: "",
    name: "CloudGavel",
    colors: [googleColors[1]],
    font: "Inter",
    isLive: false,
    description:
      "An innovative eWarrant solution that streamlines the warrant approval process, enabling faster approvals and improved law enforcement efficiency.",
    stack: ["Figma", "React", "Node.js", "Firebase"],
    duration: "—",
    mobileMockup: mobileMockup2,
    webMockup: desktopMockup2,
    category: "ux-ui",
  },
  {
    logo: "",
    name: "Echelon Constructors",
    colors: [googleColors[2]],
    font: "Inter",
    isLive: false,
    description:
      "Construction project management software designed to handle planning, scheduling, and resource management in a centralized web platform.",
    stack: ["Figma", "React", "TypeScript", "Tailwind CSS"],
    duration: "—",
    mobileMockup: null,
    webMockup: desktopMockup2,
    category: "ux-ui",
  },
  {
    logo: "",
    name: "Captable",
    colors: [googleColors[3]],
    font: "Inter",
    isLive: false,
    description:
      "Fintech web application that helps agencies manage billing, track records, and streamline financial data with an improved user experience.",
    stack: ["Adobe XD", "React", "TypeScript"],
    duration: "—",
    mobileMockup: null,
    webMockup: desktopMockup2,
    category: "ux-ui",
  },
  {
    logo: "",
    name: "Bumper Mandi",
    colors: [googleColors[4]],
    font: "Inter",
    isLive: false,
    description:
      "A digital mandi platform that helps farmers sell grain securely and transparently. Ensures fair pricing, verified buyers, real-time updates, and direct transactions.",
    stack: ["Figma", "Flutter", "Firebase"],
    duration: "2 months",
    mobileMockup: mobileMockup2,
    webMockup: desktopMockup2,
    category: "development",
  },
  {
    logo: "",
    name: "React Portfolio Website",
    colors: [googleColors[5]],
    font: "Inter",
    isLive: true,
    description:
      "A modern, responsive portfolio website built with React featuring smooth navigation, reusable components, and a clean UI. Maintained on GitHub with structured commits.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    duration: "—",
    mobileMockup: mobileMockup2,
    webMockup: desktopMockup2,
    category: "development",
  }
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("ux-ui");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = project.category === activeTab;
    const matchesSearch = !searchQuery.trim() ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.stack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Back Link------------------------------------------------------------------------------------------ */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          {/* header Section---------------------------------------------------------------------------------------------------------*/}
          <WorkHeader
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSearch={setSearchQuery}
            projectCount={projectsData.length}
            avgTime="4.5 mo"
            successRate="98%"
          />
          {/* Grid Section----------------------------------------------------------------------------------------------------*/}
          <div className="space-y-8 mt-10">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectBentoCard key={project.name} project={project} index={index} />
              ))
            ) : (
              <div className="bento-card p-12 text-center rounded-3xl">
                <p className="text-muted-foreground text-lg">No projects found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
