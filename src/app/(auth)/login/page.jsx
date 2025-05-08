"use client";

import { Box, Container, FormControl, FormLabel, Input, Button, VStack, Text, Link, useColorMode, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { motion } from "framer-motion";

const MotionVStack = motion(VStack);
const MotionFormControl = motion(FormControl);
const MotionButton = motion(Button);
const MotionLink = motion(Link);

export default function LoginPage() {
  const { colorMode } = useColorMode();

  return (
    <MotionVStack spacing={8} align="stretch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box textAlign="center">
        <Heading size="lg" mb={2}>
          Đăng nhập
        </Heading>
        <Text color={colorMode === "light" ? "gray.600" : "gray.400"}>Vui lòng đăng nhập để tiếp tục</Text>
      </Box>

      <MotionVStack spacing={4} as="form" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <MotionFormControl //
          isRequired
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FormLabel>Tài khoản</FormLabel>
          <Input type="text" placeholder="Nhập tài khoản của bạn" size="lg" />
        </MotionFormControl>

        <MotionFormControl isRequired initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <FormLabel>Mật khẩu</FormLabel>
          <Input type="password" placeholder="Nhập mật khẩu của bạn" size="lg" />
        </MotionFormControl>

        <MotionButton colorScheme="blue" size="lg" width="full" mt={4} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          Đăng nhập
        </MotionButton>

        <MotionLink as={NextLink} href="/forgot-password" color="blue.500" fontSize="sm" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          Quên mật khẩu?
        </MotionLink>

        <Text fontSize="sm" textAlign="center">
          Bạn chưa có tài khoản?{" "}
          <MotionLink as={NextLink} href="/register" color="blue.500" fontWeight="bold" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            Đăng ký ngay
          </MotionLink>
        </Text>
      </MotionVStack>
    </MotionVStack>
  );
}
