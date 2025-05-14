"use client";

import { Box, Heading, Text, SimpleGrid, Image, VStack, useColorMode, Button, HStack, Spinner } from "@chakra-ui/react";
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

export default function NewsPage() {
  const { colorMode } = useColorMode();
  const [currentPage, setCurrentPage] = useState(1);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/api/${process.env.NEXT_PUBLIC_API_PREFIX}/news?page=${currentPage}&limit=10`);
        console.log("API Response:", response.data);

        if (response.data) {
          setNews(response.data.news);
          setPagination(response.data.pagination);
        }
      } catch (err) {
        console.error("Error details:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Không thể tải tin tức");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <VStack spacing={4} align="center" justify="center" minH="50vh">
        <Spinner size="xl" color="blue.500" />
        <Text>Đang tải tin tức...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack spacing={4} align="center" justify="center" minH="50vh">
        <Text color="red.500">{error}</Text>
        <Button onClick={() => window.location.reload()}>Thử lại</Button>
      </VStack>
    );
  }

  return (
    <>
      <MotionHeading size="xl" mb={8} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        Tin tức
      </MotionHeading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
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
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} style={{ width: "100%" }}>
                  <Box w="100%" h="200px" overflow="hidden" borderRadius="md">
                    <Image src={getFirstImage(item.images)} alt={item.title} width="100%" height="100%" objectFit="cover" borderRadius="md" />
                  </Box>
                </motion.div>
                <Heading size="md" minH={"48px"}>
                  {item.title}
                </Heading>
                <Text color={colorMode === "light" ? "gray.600" : "gray.300"}>{item.content?.substring(0, 200)}...</Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(item.created_at).toLocaleDateString("vi-VN")}
                </Text>
              </VStack>
            </MotionBox>
          </Link>
        ))}
      </SimpleGrid>

      {pagination.totalPages > 1 && (
        <HStack spacing={2} justify="center" mt={8}>
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
    </>
  );
}
