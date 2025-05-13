"use client";

import { Box, Heading, Text, Image, Button, Flex, useColorMode, Spinner } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { getFirstImage } from "@/utils";

export default function SliderSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/api/${process.env.NEXT_PUBLIC_API_PREFIX}/news?page=1&limit=5`);

        if (response.data && response.data.news) {
          setSlides(response.data.news);
        }
      } catch (err) {
        console.error("Error details:", err.response?.data || err.message);
        setError("Không thể tải dữ liệu slides");
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [slides]);

  if (loading) {
    return (
      <Box mb={12} position="relative" overflow="hidden">
        <Heading size="lg" mb={6} textAlign="center">
          Bài viết nổi bật
        </Heading>
        <Box height="400px" display="flex" alignItems="center" justifyContent="center">
          <Spinner size="xl" color="blue.500" />
        </Box>
      </Box>
    );
  }

  if (error || slides.length === 0) {
    return (
      <Box mb={12} position="relative" overflow="hidden">
        <Heading size="lg" mb={6} textAlign="center">
          Bài viết nổi bật
        </Heading>
        <Box height="400px" display="flex" alignItems="center" justifyContent="center">
          <Text color="red.500">{error || "Không có bài viết nào"}</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box mb={12} position="relative" overflow="hidden">
      <Heading size="lg" mb={6} textAlign="center">
        Bài viết nổi bật
      </Heading>

      <Box position="relative" height="400px">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide} //
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            style={{ position: "absolute", width: "100%" }}
          >
            <Box position="relative" height="400px" borderRadius="lg" overflow="hidden" cursor="pointer" onClick={nextSlide}>
              <Image
                src={getFirstImage(slides[currentSlide].images)} //
                alt={slides[currentSlide].title}
                width="100%"
                height="100%"
                objectFit="cover"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.05)" }}
              />
              <Box position="absolute" bottom={0} left={0} right={0} p={6} bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)" color="white">
                <Heading size="lg" mb={2}>
                  {slides[currentSlide].title}
                </Heading>
                <Text fontSize="lg">{slides[currentSlide].content?.substring(0, 100)}...</Text>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <Flex position="absolute" top="50%" left={0} right={0} justify="space-between" transform="translateY(-50%)" px={4} zIndex={1}>
          <Button onClick={prevSlide} colorScheme="whiteAlpha" borderRadius="full" size="lg" _hover={{ bg: "whiteAlpha.800" }} opacity={0.8}>
            ←
          </Button>
          <Button onClick={nextSlide} colorScheme="whiteAlpha" borderRadius="full" size="lg" _hover={{ bg: "whiteAlpha.800" }} opacity={0.8}>
            →
          </Button>
        </Flex>

        {/* Dots Indicator */}
        <Flex position="absolute" bottom={4} left="50%" transform="translateX(-50%)" gap={2} zIndex={1}>
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
