"use client";

import { Box, FormControl, FormLabel, Input, Button, VStack, Text, Link, useColorMode, Heading, useToast } from "@chakra-ui/react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const MotionVStack = motion.create(VStack);
const MotionFormControl = motion.create(FormControl);
const MotionButton = motion.create(Button);
const MotionLink = motion.create(Link);

export default function LoginPage() {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();
  const { user, setUser, login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  // Chuyển hướng nếu đã đăng nhập
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user || token) {
      router.push("/");
    }
  }, [user, router]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      const response = await login(formData);

      if (response.data) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        setUser(user);

        toast({
          title: "Đăng nhập thành công",
          description: `Xin chào: ${formData.username}`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        router.push("/");
      }
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Lỗi đăng nhập",
        description: error.response?.data?.message || "Đăng nhập thất bại",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MotionVStack
      spacing={8}
      align="stretch" //
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box textAlign="center">
        <Heading size="lg" mb={2}>
          Đăng nhập
        </Heading>
        <Text color={colorMode === "light" ? "gray.600" : "gray.400"}>Vui lòng đăng nhập để tiếp tục</Text>
      </Box>

      <MotionVStack
        spacing={4}
        as="form"
        onSubmit={handleSubmit} //
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MotionFormControl
          isRequired
          initial={{ x: -20, opacity: 0 }} //
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FormLabel>Tài khoản</FormLabel>
          <Input
            type="text"
            name="username" //
            value={formData.username} //
            onChange={handleChange}
            placeholder="Nhập tài khoản của bạn"
            size="lg"
            autoComplete="username"
          />
        </MotionFormControl>

        <MotionFormControl
          isRequired
          initial={{ x: -20, opacity: 0 }} //
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FormLabel>Mật khẩu</FormLabel>
          <Input
            type="password"
            name="password" //
            value={formData.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu của bạn"
            size="lg"
            autoComplete="current-password"
          />
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
          Đăng nhập
        </MotionButton>

        <MotionLink
          as={NextLink}
          href="/forgot-password" //
          color="blue.500"
          fontSize="sm"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Quên mật khẩu?
        </MotionLink>

        <Text fontSize="sm" textAlign="center">
          Bạn chưa có tài khoản?
          <MotionLink
            as={NextLink}
            href="/register"
            color="blue.500"
            fontWeight="bold"
            whileHover={{ scale: 1.05 }} //
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Đăng ký ngay
          </MotionLink>
        </Text>
      </MotionVStack>
    </MotionVStack>
  );
}
