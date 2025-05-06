"use client";

import React from "react";
import { motion, MotionProps, Variants } from "framer-motion";

interface AnimatedWrapperProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  type?: 
    | "fadeIn" 
    | "slideUp" 
    | "scale" 
    | "bounce" 
    | "subtle" 
    | "slideLeft" 
    | "slideRight"
    | "hover";
  className?: string;
  hoverEffect?: "lift" | "scale" | "highlight" | "none";
}

// Predefined animation variants
const animations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 15 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  bounce: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  },
  subtle: {
    hidden: { opacity: 0.8, y: 5 },
    visible: { opacity: 1, y: 0 },
  },
  hover: {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    hover: { y: -4, transition: { duration: 0.2 } },
  },
};

// Hover effect for cards and items
const hoverEffects = {
  lift: {
    hover: { y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" },
    tap: { y: -2 },
  },
  scale: {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  },
  highlight: {
    hover: { backgroundColor: "var(--accent)", color: "var(--accent-foreground)" },
    tap: { backgroundColor: "var(--accent)", color: "var(--accent-foreground)" },
  },
  none: {},
};

export function AnimatedWrapper({
  children,
  delay = 0,
  duration = 0.3,
  type = "fadeIn",
  className = "",
  hoverEffect = "none",
  ...props
}: AnimatedWrapperProps) {
  const variant = animations[type];
  const hoverVariant = hoverEffects[hoverEffect];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover={hoverEffect !== "none" ? "hover" : undefined}
      whileTap={hoverEffect !== "none" ? "tap" : undefined}
      variants={variant}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
      {...hoverVariant}
      {...props}
    >
      {children}
    </motion.div>
  );
}
