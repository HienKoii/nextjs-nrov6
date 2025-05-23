"use client";

import { useRouter } from "next/navigation";
import { useToast, Box, VStack, Heading, FormControl, FormLabel, Input, Button, Text, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ChangePasswordPage() {
  const router = useRouter();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Lỗi",
          description: "Vui lòng đăng nhập để thực hiện chức năng này",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        router.push("/login");
        return;
      }

      const response = await axios.post(`/api/${process.env.NEXT_PUBLIC_API_PREFIX}/auth/change-password`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Thành công",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      router.push("/profile");
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error.response?.data?.message || "Có lỗi xảy ra khi đổi mật khẩu",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionBox initial="hidden" animate="visible" variants={fadeInUp} bg={colorMode === "light" ? "white" : "gray.800"} p={8} borderRadius="xl" boxShadow="xl">
      <VStack spacing={8}>
        <Heading
          size="xl" //
          bgGradient="linear(to-r, red.700, purple.800)"
          bgClip="text"
          textAlign="center"
        >
          Đổi mật khẩu
        </Heading>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Mật khẩu hiện tại</FormLabel>
              <Input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} size="lg" placeholder="Nhập mật khẩu hiện tại" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Mật khẩu mới</FormLabel>
              <Input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} size="lg" placeholder="Nhập mật khẩu mới" />
              <Text fontSize="sm" color="gray.500" mt={1}>
                Mật khẩu chỉ được chứa chữ cái, số và dấu gạch dưới (_), tối đa 20 ký tự
              </Text>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Xác nhận mật khẩu mới</FormLabel>
              <Input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} size="lg" placeholder="Nhập lại mật khẩu mới" />
              <Text fontSize="sm" color="gray.500" mt={1}>
                Mật khẩu chỉ được chứa chữ cái, số và dấu gạch dưới (_), tối đa 20 ký tự
              </Text>
            </FormControl>

            <Button
              type="submit"
              colorScheme="purple"
              size="lg"
              width="full"
              isLoading={loading}
              loadingText="Đang xử lý..."
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
            >
              Đổi mật khẩu
            </Button>
          </VStack>
        </form>
      </VStack>
    </MotionBox>
  );
}
