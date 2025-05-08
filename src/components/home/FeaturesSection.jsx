"use client";

import { Box, Heading, Text, SimpleGrid, VStack, useColorMode, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaFacebook, FaTelegram, FaDiscord, FaYoutube, FaCommentDots } from "react-icons/fa";

const MotionBox = motion(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const socialLinks = [
  {
    image: "/images/zalo.png",
    title: "Zalo",
    description: "Tham gia công động zalo. Hỗ trợ nhanh chóng !",
    link: "https://zalo.me/ngocrongonline",
    color: "blue.400",
  },
  {
    image: "/images/zalo.png",
    title: "Zalo",
    description: "Tham gia công động zalo. Hỗ trợ nhanh chóng !",
    link: "https://zalo.me/ngocrongonline",
    color: "blue.400",
  },
  {
    image: "/images/zalo.png",
    title: "Zalo",
    description: "Tham gia công động zalo. Hỗ trợ nhanh chóng !",
    link: "https://zalo.me/ngocrongonline",
    color: "blue.400",
  },
  {
    image: "/images/zalo.png",
    title: "Zalo",
    description: "Tham gia công động zalo. Hỗ trợ nhanh chóng !",
    link: "https://zalo.me/ngocrongonline",
    color: "blue.400",
  },
];

export default function SocialLinksSection() {
  const { colorMode } = useColorMode();

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mb={12}>
      {socialLinks.map((social, index) => (
        <Link key={index} href={social.link} isExternal>
          <MotionBox
            p={2}
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
            _hover={{
              shadow: "lg",
              borderColor: social.color,
            }}
            minH="250px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing={4} w="full">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <img src={social.image} alt={social.title} style={{ width: "50px", height: "50px", borderRadius: "8px" }} />
              </motion.div>
              <Heading size="md" color={social.color}>
                {social.title}
              </Heading>
              <Text
                textAlign="center" //
                color={colorMode === "light" ? "gray.600" : "gray.300"}
                minH="73px"
              >
                {social.description}
              </Text>
            </VStack>
          </MotionBox>
        </Link>
      ))}
    </SimpleGrid>
  );
}
