"use client";

import { Box, Button, Divider, Grid, GridItem, Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { PhoneIcon, DownloadIcon, StarIcon, InfoIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const downloadOptions = [
  {
    title: "Android",
    desc: "Dành cho điện thoại Android (APK hoặc Play Store)",
    btn: { label: "Tải APK", href: "/files/nrolaunew.apk" },
    color: "green.400",
    icon: PhoneIcon,
  },
  {
    title: "iOS (iPhone/iPad)",
    desc: "Dành cho iPhone, iPad (file ipa)",
    btn: { label: "Tải file IPA", href: "/files/ngocronglau.ipa" },
    color: "gray.700",
    icon: StarIcon,
  },
  {
    title: "PC (Windows)",
    desc: "Dành cho máy tính Windows (XP, 7, 10, 11)",
    btn: { label: "Tải bản PC", href: "/files/ngocronglau.rar" },
    color: "blue.500",
    icon: DownloadIcon,
  },
  {
    title: "Java (Nokia cũ)",
    desc: "Dành cho điện thoại Nokia bàn phím, Java ME",
    btn: { label: "Tải bản Java", href: "/files/DragonBoy230Prev1.7.jar" },
    color: "orange.400",
    icon: InfoIcon,
  },
];

export default function DownloadPage() {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("md", "dark-lg");

  return (
    <VStack spacing={8} align="stretch">
      {/* Heading & Description */}
      <motion.div
        initial="hidden" //
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Box textAlign="center">
          <Heading
            size="xl"
            mb={2} //
            bgGradient="linear(to-r, red.700, purple.800)"
            bgClip="text"
          >
            Tải Xuống
          </Heading>
          <Text fontSize="lg" color="gray.500">
            Chọn phiên bản phù hợp với thiết bị của bạn để trải nghiệm game mượt mà nhất!
          </Text>
        </Box>
      </motion.div>

      {/* Download Options Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible" //
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Grid
          templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} //
          gap={6}
        >
          {downloadOptions.map((opt, idx) => {
            const Icon = opt.icon;
            return (
              <GridItem key={opt.title}>
                <motion.div
                  initial="hidden"
                  whileInView="visible" //
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Box
                    bg={cardBg}
                    boxShadow={cardShadow}
                    borderRadius="xl"
                    p={6}
                    textAlign="center"
                    minH="260px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
                    transition="all 0.2s"
                  >
                    <Box fontSize="4xl" color={opt.color} mb={2}>
                      <Icon w={8} h={8} />
                    </Box>
                    <Heading size="md" mb={1} color={opt.color}>
                      {opt.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.500" mb={4}>
                      {opt.desc}
                    </Text>
                    <Button
                      as="a"
                      href={opt.btn.href} //
                      colorScheme={opt.color.split(".")[0]}
                      mb={opt.btn2 ? 2 : 0}
                      w="100%"
                      target="_blank"
                    >
                      {opt.btn.label}
                    </Button>
                    {opt.btn2 && (
                      <Button
                        as="a"
                        href={opt.btn2.href} //
                        colorScheme={opt.color.split(".")[0]}
                        variant="outline"
                        w="100%"
                        target="_blank"
                      >
                        {opt.btn2.label}
                      </Button>
                    )}
                  </Box>
                </motion.div>
              </GridItem>
            );
          })}
        </Grid>
      </motion.div>

      {/* Hướng dẫn chọn phiên bản phù hợp */}
      <motion.div
        initial="hidden"
        whileInView="visible" //
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Box mt={8}>
          <Heading size="lg" textAlign="center" mb={2}>
            Hướng dẫn chọn phiên bản phù hợp
          </Heading>
          <Divider orientation="horizontal" mb={4} />
          <Box fontSize="md" color="gray.600" maxW="700px" mx="auto">
            <Text mb={2}>
              - Nếu bạn dùng điện thoại Nokia cũ, có bàn phím như Nokia 6300, Nokia E72, Nokia X2, Nokia C2, hãy tải bản <b>JAVA</b>.
            </Text>
            <Text mb={2}>
              - Nếu bạn dùng máy cảm ứng sử dụng Android như Samsung, HTC, LG, hãy tải bản <b>Android APK</b> hoặc <b>Google Play</b>.
            </Text>
            <Text mb={2}>
              - Nếu bạn dùng điện thoại cảm ứng của NOKIA Lumia, hoặc các máy HTC chạy Windows Phone, hãy tải bản <b>Windows Phone</b>.
            </Text>
            <Text mb={2}>
              - Nếu bạn dùng máy vi tính cá nhân, laptop chạy Windows XP - Windows 11, hãy tải bản <b>PC</b>.
            </Text>
            <Text mb={2}>
              - Nếu bạn dùng iPhone, iPad, hãy tải bản <b>App Store</b> hoặc <b>Jailbreak</b> nếu máy đã jailbreak.
            </Text>
          </Box>
        </Box>
      </motion.div>
    </VStack>
  );
}
