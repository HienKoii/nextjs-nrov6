"use client";

import { Box, Container, Heading, Text, Image, VStack, useColorMode, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Spinner, Button } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { getFirstImage } from "@/utils";

export default function NewsDetail() {
  const { colorMode } = useColorMode();
  const params = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/api/${process.env.NEXT_PUBLIC_API_PREFIX}/news/${params.id}`);
        console.log("API Response:", response.data);

        if (response.data) {
          setNews(response.data);
        }
      } catch (err) {
        console.error("Error details:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Không thể tải chi tiết tin tức");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [params.id]);

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={4} align="center" justify="center" minH="50vh">
          <Spinner size="xl" color="blue.500" />
          <Text>Đang tải tin tức...</Text>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={4} align="center" justify="center" minH="50vh">
          <Text color="red.500">{error}</Text>
          <Button onClick={() => window.location.reload()}>Thử lại</Button>
        </VStack>
      </Container>
    );
  }

  if (!news) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Không tìm thấy bài viết</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Breadcrumb */}
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/">
              Trang chủ
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/news">
              Tin tức
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{news.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Tiêu đề và ngày đăng */}
        <VStack align="stretch" spacing={4}>
          <Heading size="xl">
            <span>{news.title}</span>
            {news.isHot && <Image src="/images/hot.gif" alt="Hot" objectFit="contain" display="inline-block" verticalAlign="middle" height="28px" width="28px" ml={2} />}
            {news.isNew && <Image src="/images/new.gif" alt="New" objectFit="contain" display="inline-block" verticalAlign="middle" height="28px" width="28px" ml={2} />}
          </Heading>
          <Text color={colorMode === "light" ? "gray.600" : "gray.400"}>Ngày đăng: {new Date(news.created_at).toLocaleDateString("vi-VN")}</Text>
        </VStack>

        {/* Hình ảnh */}
        <Box borderRadius="lg" overflow="hidden">
          <Image src={getFirstImage(news.images)} alt={news.title} width="100%" height="400px" objectFit="cover" />
        </Box>

        {/* Nội dung */}
        <Box bg={colorMode === "light" ? "white" : "gray.700"} p={6} borderRadius="lg" boxShadow="sm">
          <Text whiteSpace="pre-line" lineHeight="1.8">
            {news.content}
          </Text>
        </Box>

        {/* Thông tin tác giả */}
        <Box bg={colorMode === "light" ? "gray.50" : "gray.800"} p={4} borderRadius="lg">
          <Text fontSize="sm" color={colorMode === "light" ? "gray.600" : "gray.400"}>
            Tác giả: {news.author}
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
