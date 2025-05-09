"use client";

import { Box, FormControl, FormLabel, Input, Button, VStack, Text, Link, useColorMode, Heading, FormErrorMessage, useToast } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

const MotionVStack = motion(VStack);
const MotionFormControl = motion(FormControl);
const MotionButton = motion(Button);
const MotionLink = motion(Link);

export default function RegisterPage() {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();
  const { user, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Chuyển hướng nếu đã đăng nhập
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/register", formData);

      if (response.status === 200) {
        toast({
          title: "Đăng ký thành công",
          description: response.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        router.push("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Đăng ký thất bại";
      toast({
        title: "Lỗi",
        description: errorMessage,
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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

      <MotionVStack spacing={4} as="form" onSubmit={handleSubmit} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <MotionFormControl isRequired initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <FormLabel>Tài khoản</FormLabel>
          <Input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Nhập tên tài khoản" size="lg" maxLength={20} />
        </MotionFormControl>

        <MotionFormControl isRequired initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Nhập email của bạn" size="lg" />
        </MotionFormControl>

        <MotionFormControl isRequired initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <FormLabel>Mật khẩu</FormLabel>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Nhập mật khẩu" size="lg" maxLength={20} />
        </MotionFormControl>

        <MotionFormControl isRequired initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <FormLabel>Nhập lại mật khẩu</FormLabel>
          <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Nhập lại mật khẩu" size="lg" maxLength={20} />
        </MotionFormControl>

        <MotionButton
          type="submit"
          colorScheme="blue"
          size="lg"
          width="full"
          mt={4}
          isLoading={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
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
