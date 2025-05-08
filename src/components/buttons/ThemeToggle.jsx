"use client";

import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionIconButton = motion(IconButton);

export function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <MotionIconButton
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      whileHover={{
        scale: 1.1,
        rotate: 15,
        boxShadow: "0 0 8px rgba(0,0,0,0.2)",
      }}
      whileTap={{
        scale: 0.9,
        rotate: -15,
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: [0, 10, -10, 0],
        transition: {
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
          rotate: {
            duration: 0.3,
            repeat: 0,
          },
        },
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    />
  );
}
