"use client";

import { VStack, Heading, Text, Button, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionVStack = motion.create(VStack);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionButton = motion.create(Button);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function HeroSection() {
  const { colorMode } = useColorMode();

  return (
    <MotionVStack
      spacing={6}
      mb={8}
      py={4}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      backgroundImage="url('/images/banner/3.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      borderRadius={"16px"}
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backdropFilter: "blur(2px)",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        zIndex: 0,
      }}
    >
      <MotionHeading
        size="2xl"
        textAlign="center" //
        bgGradient="linear(to-r, red.700, purple.800)"
        bgClip="text"
        variants={fadeInUp}
        py={4}
        position="relative"
        zIndex={1}
      >
        Chào mừng đến với Ngọc Rồng Out Side
      </MotionHeading>
      <MotionText
        fontSize="xl" //
        textAlign="center"
        color={colorMode === "light" ? "white" : "gray.100"}
        variants={fadeInUp}
        position="relative"
        zIndex={1}
        maxW={"250px"}
      >
        Khám phá thế giới Dragon Ball đầy thú vị
      </MotionText>
      <Link href="/download" passHref>
        <MotionButton
          size="lg" //
          colorScheme="purple"
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          position="relative"
          zIndex={1}
        >
          Tải game ngay
        </MotionButton>
      </Link>
    </MotionVStack>
  );
}
