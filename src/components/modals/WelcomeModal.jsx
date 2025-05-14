"use client";

import { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, VStack, Text, Image, useColorMode, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const MotionModalContent = motion.create(ModalContent);

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode } = useColorMode();
  const pathname = usePathname();

  useEffect(() => {
    // Chỉ hiển thị modal khi reload (mount lần đầu) và ở trang chủ
    if (pathname === "/") {
      setIsOpen(true);
    }
    // eslint-disable-next-line
  }, []); // chỉ chạy 1 lần khi mount

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="xl">
      <ModalOverlay backdropFilter="blur(4px)" />
      <MotionModalContent initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} bg={colorMode === "light" ? "white" : "gray.800"} borderRadius="xl" overflow="hidden">
        <ModalHeader bgGradient="linear(to-r, red.700, purple.800)" bgClip="text" textAlign="center" fontSize="2xl" fontWeight="bold">
          Chào mừng đến với Ngọc Rồng Out Side
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack spacing={6}>
            <Image src="/images/banner/3.png" alt="Welcome Banner" borderRadius="lg" maxH="200px" objectFit="cover" />
            <Text textAlign="center" fontSize="lg">
              Chào mừng bạn đến với thế giới Dragon Ball đầy thú vời! Hãy khám phá và trải nghiệm những điều tuyệt vời cùng chúng tôi.
            </Text>
            <HStack spacing={4} width="full" justify="flex-end">
              <Button
                variant="outline"
                colorScheme="purple"
                size="lg"
                onClick={handleClose}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
              >
                Đóng
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </MotionModalContent>
    </Modal>
  );
}
