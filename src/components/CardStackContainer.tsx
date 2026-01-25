import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface CardStackContainerProps {
  children: React.ReactNode;
  index: number;
  totalCards: number;
}

const CardStackContainer = ({ children, index, totalCards }: CardStackContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring physics
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  // Card overlay effect - cards slide up from bottom and overlay previous cards
  // As you scroll, the card rises up and pins at the top
  const y = useTransform(scrollYProgress, [0, .5, 1], [100, 1, 1]);
  const scale = useTransform(scrollYProgress, [1, 0.3, 1], [.6, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0.5, 1, 1]);
  
  // Spring animations for smoother effect
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springOpacity = useSpring(opacity, springConfig);

  // Higher index = higher z-index (newer cards stack on top)
  const zIndex = index + 1;

  return (
    <motion.div
      ref={containerRef}
      style={{
        y: springY,
        scale: springScale,
        opacity: springOpacity,
        zIndex,
      }}
      className="sticky top-24"
    >
      {/* Card shadow for depth */}
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0], [0, 0]),
        }}
        className="absolute inset-0 -z-10 rounded-3xl "
      />
      
      {children}
    </motion.div>
  );
};

export default CardStackContainer;
