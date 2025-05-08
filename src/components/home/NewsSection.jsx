"use client";

import { Box, Heading, Text, SimpleGrid, Image, VStack, useColorMode, Divider } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

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
];

export default function NewsSection() {
  const { colorMode } = useColorMode();

  return (
    <Box mb={12}>
      <MotionHeading
        size="lg"
        mb={6}
        initial="hidden" //
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        Tin tức mới nhất
      </MotionHeading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {news.map((item, index) => (
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
    </Box>
  );
}
