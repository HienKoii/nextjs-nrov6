"use client";

import { Box, Heading, Text, SimpleGrid, Image, VStack, useColorMode, Button, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { getFirstImage } from "@/utils";

const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function NewsSection() {
  const { colorMode } = useColorMode();
  const [currentPage, setCurrentPage] = useState(1);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/api/news?page=${currentPage}&limit=4`);

        if (response.data) {
          setNews(response.data.news);
          setPagination({
            total: response.data.pagination.total,
            totalPages: response.data.pagination.totalPages,
          });
        }
      } catch (err) {
        console.error("Error details:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Không thể tải tin tức");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]); // Thêm currentPage vào dependency array

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Box mb={12} textAlign="center">
        <Text>Đang tải tin tức...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box mb={12} textAlign="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box mb={12}>
      <MotionHeading size="lg" mb={6} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        Tin tức mới nhất
      </MotionHeading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {news.map((item) => (
          <Link href={`/news/${item.id}`} key={item.id} style={{ textDecoration: "none" }}>
            <MotionBox
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
              cursor="pointer"
            >
              <VStack align="start" spacing={3}>
                <motion.div
                  whileHover={{ scale: 1.05 }} //
                  transition={{ duration: 0.2 }}
                  style={{ width: "100%" }}
                >
                  <Box w="100%" h="200px" overflow="hidden" borderRadius="md">
                    <Image
                      src={getFirstImage(item.images)} //
                      alt={item.title}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Box>
                </motion.div>
                <Heading size="md">
                  <HStack as="span" spacing={1} align="center" minH={"48px"}>
                    <span>{item.title}</span>
                    {item.isHot && <Image src="/images/hot.gif" alt="Hot" objectFit="contain" display="inline-block" verticalAlign="middle" boxSize="28px" />}
                    {item.isNew && <Image src="/images/new.gif" alt="New" objectFit="contain" display="inline-block" verticalAlign="middle" boxSize="28px" />}
                  </HStack>
                </Heading>
                <Text color={colorMode === "light" ? "gray.600" : "gray.300"}>{item.content?.substring(0, 100)}...</Text>
              </VStack>
            </MotionBox>
          </Link>
        ))}
      </SimpleGrid>

      <VStack spacing={4} mt={8}>
        <Link href="/news">Xem tất cả tin tức</Link>

        {pagination.totalPages > 1 && (
          <HStack spacing={2} justify="center" w="full">
            <Button onClick={() => handlePageChange(currentPage - 1)} isDisabled={currentPage === 1} colorScheme="blue" variant="outline">
              Trước
            </Button>
            {[...Array(pagination.totalPages)].map((_, index) => (
              <Button key={index} onClick={() => handlePageChange(index + 1)} colorScheme={currentPage === index + 1 ? "blue" : "gray"} variant={currentPage === index + 1 ? "solid" : "outline"}>
                {index + 1}
              </Button>
            ))}
            <Button onClick={() => handlePageChange(currentPage + 1)} isDisabled={currentPage === pagination.totalPages} colorScheme="blue" variant="outline">
              Sau
            </Button>
          </HStack>
        )}
      </VStack>
    </Box>
  );
}
