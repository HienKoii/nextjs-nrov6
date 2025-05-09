"use client";

import { Box, Heading, Text, SimpleGrid, Image, VStack, useColorMode, Button, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const news = [
  {
    image: "/images/baiviet/1.jpg",
    title: "Sự kiện mùa hè",
    description: "Khám phá những tính năng mới trong phiên bản cập nhật lần này",
  },
  {
    image: "/images/baiviet/1.jpg",
    title: "Sự kiện mùa hè 2",
    description: "Tham gia sự kiện đặc biệt và nhận quà miễn phí",
  },
  {
    image: "/images/baiviet/1.jpg",
    title: "Sự kiện mùa hè 2",
    description: "Tham gia sự kiện đặc biệt và nhận quà miễn phí",
  },
  {
    image: "/images/baiviet/1.jpg",
    title: "Sự kiện mùa hè 2",
    description: "Tham gia sự kiện đặc biệt và nhận quà miễn phí",
  },
  {
    image: "/images/baiviet/1.jpg",
    title: "Sự kiện mùa hè 2",
    description: "Tham gia sự kiện đặc biệt và nhận quà miễn phí",
  },
];

export default function NewsSection() {
  const { colorMode } = useColorMode();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = news.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box mb={12}>
      <MotionHeading size="lg" mb={6} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        Tin tức mới nhất
      </MotionHeading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {currentNews.map((item, index) => (
          <MotionBox
            key={index}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg={colorMode === "light" ? "white" : "gray.700"}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <VStack align="start" spacing={3}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} style={{ width: "100%" }}>
                <Box w="100%" h="200px" overflow="hidden" borderRadius="md">
                  <Image src={item.image} alt={item.title} width="100%" height="100%" objectFit="cover" borderRadius="md" />
                </Box>
              </motion.div>
              <Heading size="md">{item.title}</Heading>
              <Text color={colorMode === "light" ? "gray.600" : "gray.300"}>{item.description}</Text>
            </VStack>
          </MotionBox>
        ))}
      </SimpleGrid>

      {totalPages > 1 && (
        <HStack spacing={2} justify="center" mt={8}>
          <Button onClick={() => handlePageChange(currentPage - 1)} isDisabled={currentPage === 1} colorScheme="blue" variant="outline">
            Trước
          </Button>
          {[...Array(totalPages)].map((_, index) => (
            <Button key={index} onClick={() => handlePageChange(index + 1)} colorScheme={currentPage === index + 1 ? "blue" : "gray"} variant={currentPage === index + 1 ? "solid" : "outline"}>
              {index + 1}
            </Button>
          ))}
          <Button onClick={() => handlePageChange(currentPage + 1)} isDisabled={currentPage === totalPages} colorScheme="blue" variant="outline">
            Sau
          </Button>
        </HStack>
      )}
    </Box>
  );
}
