import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Layout,
  Code2,
  Sparkles,
  Layers,
  Brush,
  Terminal,
  Database,
  Cloud,
} from "lucide-react";
import { useState } from "react";

import WorkHeader from "@/components/WorkHeader";
import ProjectBentoCard from "@/components/ProjectBentoCard";
import TemplateCard from "@/components/TemplateCard";

import { developmentDB } from "@/database/development.db";
import { uxuiDB } from "@/database/uxui.db";
import { templatesDB } from "@/database/templates.db";

/* -------------------------------- DECOR CONFIG -------------------------------- */

const tabDecorations = {
  "ux-ui": {
    gradient: "from-violet-500/20 via-pink-500/20 to-orange-500/20",
    accentColor: "text-violet-400",
    icons: [Palette, Brush, Layers, Sparkles],
  },
  templates: {
    gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
    accentColor: "text-cyan-400",
    icons: [Layout, Layers],
  },
  development: {
    gradient: "from-emerald-500/20 via-teal-500/20 to-green-500/20",
    accentColor: "text-emerald-400",
    icons: [Code2, Terminal, Database, Cloud],
  },
};

/* -------------------------------- PAGE -------------------------------- */

const projectsData = [...uxuiDB, ...developmentDB];
const templatesData = templatesDB;

const Projects = () => {
  const [activeTab, setActiveTab] = useState("ux-ui");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = project.category === activeTab;
    const matchesSearch =
      !searchQuery.trim() ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.stack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      project.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const filteredTemplates = templatesData.filter((template) =>
    !searchQuery.trim()
      ? true
      : template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentDecoration =
    tabDecorations[activeTab as keyof typeof tabDecorations] ||
    tabDecorations["ux-ui"];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ---------------- BACKGROUND ---------------- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${activeTab}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 pointer-events-none overflow-hidden"
        >
          <div
            className={`absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br ${currentDecoration.gradient} blur-3xl opacity-50`}
          />
          <div
            className={`absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr ${currentDecoration.gradient} blur-3xl opacity-40`}
          />
        </motion.div>
      </AnimatePresence>

      {/* ---------------- CONTENT ---------------- */}
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">

          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header */}
          <WorkHeader
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSearch={setSearchQuery}
            projectCount={
              activeTab === "templates"
                ? templatesData.length
                : filteredProjects.length
            }
            avgTime="3–4 weeks"
            successRate="98%"
          />

          {/* ---------------- PROJECT LIST ---------------- */}
          <div className="mt-10">

            {activeTab === "templates" ? (
              /* Templates grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map((template, index) => (
                  <TemplateCard
                    key={template.name}
                    template={template}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              /* Projects (NORMAL SCROLL – NO STACK) */
              <div className="space-y-8">
                {filteredProjects.map((project, index) => (
                  <ProjectBentoCard
                    key={project.name}
                    project={project}
                    index={index}
                  />
                ))}
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
