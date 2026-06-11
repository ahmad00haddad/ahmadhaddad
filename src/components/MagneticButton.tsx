import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

/**
 * Ultra-subtle magnetic pull — moves the child element only a few pixels
 * when the cursor is nearby. Very gentle, cinematic interaction.
 */
export function Magnetic({
  children,
  className,
  strength = 0.12,
  radius = 90,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 14, mass: 0.08 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (dist > radius) {
      x.set(0);
      y.set(0);
      return;
    }

    const intensity = 1 - dist / radius;
    const moveX = (e.clientX - centerX) * strength * intensity;
    const moveY = (e.clientY - centerY) * strength * intensity;
    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
