"use client";

import { Box, Heading, Text, SimpleGrid, VStack, useColorMode, Link, Icon, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";

const MotionBox = motion.create(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ZaloIcon = () => (
  <Box w="48px" h="48px" borderRadius="full" bg="#0068FF" display="flex" alignItems="center" justifyContent="center" boxShadow="0 0 10px rgba(0, 104, 255, 0.3)">
    <Image src="/images/zalo.png" alt="Zalo" w="32px" h="32px" objectFit="contain" />
  </Box>
);

const FacebookIcon = () => (
  <Box w="48px" h="48px" borderRadius="full" bg="#1877F2" display="flex" alignItems="center" justifyContent="center" boxShadow="0 0 10px rgba(24, 119, 242, 0.3)">
    <Icon as={FaFacebook} w="32px" h="32px" color="white" />
  </Box>
);

const socialLinks = [
  // {
  //   icon: FacebookIcon,
  //   title: "Facebook",
  //   description: "Tham gia cộng đồng Facebook của chúng tôi để cập nhật tin tức mới nhất!",
  //   link: "https://facebook.com/ngocrongonline",
  //   color: "#1877F2",
  // },
  {
    icon: ZaloIcon,
    title: "Zalo",
    description: "Kết nối qua Zalo để nhận thông báo và hỗ trợ nhanh chóng!",
    link: "https://zalo.me/ngocrongonline",
    color: "#0068FF",
  },
];

export default function SocialLinksSection() {
  const { colorMode } = useColorMode();

  return (
    <Box py={12} px={4}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Heading textAlign="center" mb={8} fontSize={{ base: "2xl", md: "3xl" }}>
          Cộng đồng
        </Heading>
      </motion.div>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="800px" mx="auto">
        {socialLinks.map((social, index) => (
          <Link key={index} href={social.link} isExternal _hover={{ textDecoration: "none" }}>
            <MotionBox
              p={6}
              borderWidth="1px"
              borderRadius="xl"
              bg={colorMode === "light" ? "white" : "gray.700"}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              whileHover={{
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              _hover={{
                shadow: "xl",
                borderColor: social.color,
              }}
              minH="280px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              overflow="hidden"
            >
              <VStack spacing={6} w="full" position="relative" zIndex={1}>
                <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
                  {typeof social.icon === "function" ? <social.icon /> : <Icon as={social.icon} w={12} h={12} color={social.color} />}
                </motion.div>
                <Heading size="md" color={social.color}>
                  {social.title}
                </Heading>
                <Text textAlign="center" color={colorMode === "light" ? "gray.600" : "gray.300"} fontSize="sm" lineHeight="tall">
                  {social.description}
                </Text>
              </VStack>
              <Box position="absolute" top={0} left={0} right={0} bottom={0} bg={social.color} opacity={0} transition="opacity 0.3s" _groupHover={{ opacity: 0.05 }} />
            </MotionBox>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}
