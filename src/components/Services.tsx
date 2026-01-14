import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  CheckCircle2,
  Lightbulb,
  Layout,
  Brush
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ServiceRequestForm from "@/components/ServiceRequestForm";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const services = [
  {
    id: "ux-ui",
    title: "UX/UI Design",
    description: "I design intuitive, user-first interfaces grounded in usability, structure, and visual clarity — ensuring every interaction feels purposeful and easy to use.",
    icon: Layout,
    color: "from-primary to-accent",
    focusAreas: [
      "User research & journeys",
      "Wireframes → high-fidelity UI",
      "Design systems & accessibility"
    ],
    isHero: true,
    stat: "12",
    statLabel: "Live Projects",
    statDescription: "Actively designed, built, and maintained — from concept to deployment."
  },
  {
    id: "product",
    title: "Product Design",
    description: "From early concepts to production-ready designs, I create research-driven digital products that solve real user and business problems.",
    icon: Lightbulb,
    color: "from-success to-primary",
    focusAreas: [
      "Product strategy & thinking",
      "UX problem-solving",
      "Scalable, system-based design"
    ]
  },
  {
    id: "web",
    title: "Web Development",
    description: "I build responsive, high-performance websites that translate design into clean, maintainable code — without compromising speed, usability, or scalability.",
    icon: Code2,
    color: "from-warning to-destructive",
    focusAreas: [
      "Modern JavaScript frameworks",
      "Component-driven architecture",
      "Performance & responsiveness"
    ]
  },
  {
    id: "identity",
    title: "Identity Design",
    description: "I craft cohesive brand identities — from logos to visual systems — that communicate clarity, trust, and personality across digital touchpoints.",
    icon: Brush,
    color: "from-accent to-primary",
    focusAreas: [
      "Logo & visual identity",
      "Brand systems",
      "Digital-first storytelling"
    ]
  }
];

const Services = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 px-4">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-16"
          >
            
            <motion.div variants={itemVariants}>
              <Badge variant="secondary" className="mb-4 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Services
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              What I <span className="gradient-text">Do</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground/80 italic mb-4 max-w-2xl mx-auto"
            >
              I'm a designer who understands code, and a developer who respects design — focused on building products that actually work.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              I design, build, and ship digital products — combining thoughtful UX, clean UI, and reliable development to turn ideas into real, usable experiences.
            </motion.p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6"
          >
            {/* Hero Card - UX/UI Design */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-7 lg:row-span-2"
            >
              <Link 
                to="/services/ux-ui"
                className="service-card-hero group block h-full"
              >
                <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-bento-hover">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                        <Layout className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-foreground">UX/UI Design</h2>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {services[0].description}
                    </p>
                    
                    {/* Stat Highlight */}
                    <div className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl font-bold gradient-text">{services[0].stat}</span>
                        <span className="text-xl font-semibold text-foreground">{services[0].statLabel}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{services[0].statDescription}</p>
                    </div>
                    
                    {/* Focus Areas */}
                    <div className="space-y-2">
                      {services[0].focusAreas.map((area, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Product Design */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5"
            >
              <Link 
                to="/services/product"
                className="service-card group block h-full"
              >
                <div className="relative h-full p-6 rounded-3xl bg-card border border-border/50 overflow-hidden transition-all duration-500 hover:border-success/30 hover:shadow-bento-hover">
                  <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-primary flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-success group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-foreground">Product Design</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {services[1].description}
                    </p>
                    
                    <div className="space-y-1.5">
                      {services[1].focusAreas.map((area, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-success" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Web Development */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5"
            >
              <Link 
                to="/services/web"
                className="service-card group block h-full"
              >
                <div className="relative h-full p-6 rounded-3xl bg-card border border-border/50 overflow-hidden transition-all duration-500 hover:border-warning/30 hover:shadow-bento-hover">
                  <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-destructive/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning to-destructive flex items-center justify-center">
                        <Code2 className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-warning group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-foreground">Web Development</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {services[2].description}
                    </p>
                    
                    <div className="space-y-1.5">
                      {services[2].focusAreas.map((area, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-success" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Identity Design */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-6"
            >
              <Link 
                to="/services/identity"
                className="service-card group block h-full"
              >
                <div className="relative h-full p-6 rounded-3xl bg-card border border-border/50 overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-bento-hover">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                          <Brush className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all lg:hidden" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-foreground">Identity Design</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {services[3].description}
                      </p>
                      
                      <div className="space-y-1.5">
                        {services[3].focusAreas.map((area, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="w-3 h-3 text-success" />
                            <span>{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="hidden lg:flex items-center">
                      <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-6"
            >
              <div className="h-full p-6 rounded-3xl bg-gradient-to-br from-foreground to-foreground/90 text-background flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-3">Ready to create something meaningful?</h3>
                <p className="text-background/80 mb-6">
                  Let's collaborate on your next project and bring your vision to life.
                </p>
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-semibold hover:bg-background/90 transition-colors"
                >
                  Let's Build Something Meaningful
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Service Request Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Request a Service</DialogTitle>
          </DialogHeader>
          <ServiceRequestForm />
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-muted-foreground text-sm">
            © 2025 Portfolio. Designed with passion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Services;
