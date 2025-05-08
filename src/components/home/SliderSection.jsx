"use client";

import { Box, Heading, Text, Image, Button, Flex, useColorMode } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
  {
    image: "/images/baiviet/1.jpg",
    title: "Sự kiện mùa hè",
    description: "Tham gia ngay để nhận quà miễn phí",
  },
  {
    image: "/images/baiviet/1.jpg",
    title: "Cập nhật mới",
    description: "Khám phá những tính năng mới",
  },
  {
    image: "/images/baiviet/1.jpg",
    title: "Giải đấu tháng",
    description: "Tham gia giải đấu và nhận giải thưởng",
  },
];

export default function SliderSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box mb={12} position="relative" overflow="hidden">
      <Heading size="lg" mb={6} textAlign="center">
        Bài viết nổi bật
      </Heading>

      <Box position="relative" height="400px">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide} ///
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            style={{ position: "absolute", width: "100%" }}
          >
            <Box
              position="relative" //
              height="400px"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              onClick={nextSlide}
            >
              <Image
                src={slides[currentSlide].image} //
                alt={slides[currentSlide].title}
                width="100%"
                height="100%"
                objectFit="cover"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.05)" }}
              />
              <Box
                position="absolute" //
                bottom={0}
                left={0}
                right={0}
                p={6}
                bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                color="white"
              >
                <Heading size="lg" mb={2}>
                  {slides[currentSlide].title}
                </Heading>
                <Text fontSize="lg">{slides[currentSlide].description}</Text>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <Flex
          position="absolute" //
          top="50%"
          left={0}
          right={0}
          justify="space-between"
          transform="translateY(-50%)"
          px={4}
          zIndex={1}
        >
          <Button
            onClick={prevSlide} //
            colorScheme="whiteAlpha"
            borderRadius="full"
            size="lg"
            _hover={{ bg: "whiteAlpha.800" }}
            opacity={0.8}
          >
            ←
          </Button>
          <Button
            onClick={nextSlide} //
            colorScheme="whiteAlpha"
            borderRadius="full"
            size="lg"
            _hover={{ bg: "whiteAlpha.800" }}
            opacity={0.8}
          >
            →
          </Button>
        </Flex>

        {/* Dots Indicator */}
        <Flex
          position="absolute" //
          bottom={4}
          left="50%"
          transform="translateX(-50%)"
          gap={2}
          zIndex={1}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              w={2}
              h={2}
              borderRadius="full"
              bg={currentSlide === index ? "white" : "whiteAlpha.500"}
              cursor="pointer"
              onClick={() => setCurrentSlide(index)}
              transition="all 0.2s"
              _hover={{ bg: "white" }}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
