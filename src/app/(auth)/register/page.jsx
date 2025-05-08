"use client";

import { Box, Container, FormControl, FormLabel, Input, Button, VStack, Text, Link, useColorMode, Heading, FormErrorMessage } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const MotionVStack = motion(VStack);
const MotionFormControl = motion(FormControl);
const MotionButton = motion(Button);
const MotionLink = motion(Link);

export default function RegisterPage() {
  const { colorMode } = useColorMode();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("Mật khẩu không khớp");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordError("Mật khẩu không khớp");
    } else {
      setPasswordError("");
    }
  };

  return (
    <MotionVStack spacing={8} align="stretch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box textAlign="center">
        <Heading size="lg" mb={2}>
          Đăng ký tài khoản
        </Heading>
        <Text color={colorMode === "light" ? "gray.600" : "gray.400"}>Vui lòng điền thông tin để tạo tài khoản mới</Text>
      </Box>

      <MotionVStack spacing={4} as="form" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <MotionFormControl isRequired initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <FormLabel>Tài khoản</FormLabel>
          <Input type="text" placeholder="Nhập tên tài khoản" size="lg" />
        </MotionFormControl>

        <MotionFormControl isRequired initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Nhập email của bạn" size="lg" />
        </MotionFormControl>

        <MotionFormControl isRequired isInvalid={!!passwordError} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <FormLabel>Mật khẩu</FormLabel>
          <Input type="password" placeholder="Nhập mật khẩu" size="lg" value={password} onChange={handlePasswordChange} />
        </MotionFormControl>

        <MotionFormControl isRequired isInvalid={!!passwordError} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <FormLabel>Nhập lại mật khẩu</FormLabel>
          <Input type="password" placeholder="Nhập lại mật khẩu" size="lg" value={confirmPassword} onChange={handleConfirmPasswordChange} />
          {passwordError && <FormErrorMessage>{passwordError}</FormErrorMessage>}
        </MotionFormControl>

        <MotionButton colorScheme="blue" size="lg" width="full" mt={4} isDisabled={!!passwordError} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          Đăng ký
        </MotionButton>

        <Text fontSize="sm" textAlign="center">
          Đã có tài khoản?{" "}
          <MotionLink as={NextLink} href="/login" color="blue.500" fontWeight="bold" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            Đăng nhập ngay
          </MotionLink>
        </Text>
      </MotionVStack>
    </MotionVStack>
  );
}
