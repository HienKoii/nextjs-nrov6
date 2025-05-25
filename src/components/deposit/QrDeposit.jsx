import { useAuth } from "@/contexts/AuthContext";
import { Box, Divider, Grid, HStack, Image, Text, useColorMode, VStack, Button, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaCopy, FaCheckCircle } from "react-icons/fa";

export default function QrDeposit({ amount, userId, setShowQR }) {
  const { fetchUser } = useAuth();
  const router = useRouter();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchAutoDeposit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await axios.post("/api/payment/atm");
      if (response.status == 200) {
        fetchUser();
        onOpen();
      }
      console.log("response.data lấy kiểm tra giao dịch: ", response);
    } catch (error) {
      console.error("Lỗi auto deposit:", error);
    }
  };
  useEffect(() => {
    // Gọi API ngay khi component mount
    fetchAutoDeposit();

    // Đặt interval gọi API mỗi 15 giây
    const interval = setInterval(() => {
      fetchAutoDeposit();
    }, 5000 * 2);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, []);

  const bankInfo = {
    bankCode: "VCB",
    bankName: "Vietcombank",
    accountNumber: "1052147418",
    accountName: "Nguyen Kim Hien",
    noiDung: "pony",
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Đã sao chép",
          description: `${label} đã được sao chép vào clipboard`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      },
      () => {
        toast({
          title: "Lỗi",
          description: "Không thể sao chép",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    );
  };

  const getQrCodeUrl = () => {
    const encodedAmount = encodeURIComponent(amount);
    const encodedInfo = encodeURIComponent(`${bankInfo.noiDung} ${userId}`);
    return `https://img.vietqr.io/image/${bankInfo.bankCode}-${bankInfo.accountNumber}-compact.png?amount=${encodedAmount}&addInfo=${encodedInfo}`;
  };

  return (
    <>
      <Box w="full" p={4} bg={colorMode === "light" ? "gray.50" : "gray.700"} borderRadius="lg" textAlign="center">
        <Text mb={3} fontSize="lg" fontWeight="bold" color="pink.500" textShadow="0 1px 2px rgba(0,0,0,0.1)">
          Vui lòng quét mã để thanh toán nhanh
        </Text>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} alignItems="center">
          <Image
            src={getQrCodeUrl()}
            alt="QR Code" //
            w="full"
            mx="auto"
            borderRadius="md"
            boxShadow="0 4px 12px rgba(0,0,0,0.1)"
          />
          <VStack
            align="start"
            spacing={3} //
            bg={colorMode === "light" ? "white" : "gray.800"}
            p={4}
            borderRadius="lg"
            h={"full"}
            boxShadow="0 2px 8px rgba(0,0,0,0.05)"
          >
            <Text
              fontWeight="bold"
              w="full" //
              textAlign={"center"}
              fontSize="lg"
              color="pink.500"
            >
              Thông tin chuyển khoản
            </Text>
            <HStack w="full" justify="space-between">
              <Text color="gray.500">Số tiền:</Text>
              <Text fontWeight="bold" color="green.500">
                {Number(amount).toLocaleString()}đ
              </Text>
            </HStack>
            <Divider />
            <HStack w="full" justify="space-between">
              <Text color="gray.500">Ngân hàng:</Text>
              <Text fontWeight="medium">{bankInfo.bankName}</Text>
            </HStack>
            <Divider />

            <HStack w="full" justify="space-between">
              <Text color="gray.500">Số tài khoản:</Text>
              <HStack>
                <Text fontWeight="medium">{bankInfo.accountNumber}</Text>
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="pink" //
                  onClick={() => handleCopy(bankInfo.accountNumber, "Số tài khoản")}
                  leftIcon={<FaCopy />}
                ></Button>
              </HStack>
            </HStack>
            <Divider />

            <HStack w="full" justify="space-between">
              <Text color="gray.500">Tên tài khoản:</Text>
              <Text fontWeight="medium">{bankInfo.accountName}</Text>
            </HStack>
            <Divider />

            <HStack w="full" justify="space-between">
              <Text color="gray.500">Nội dung:</Text>
              <HStack>
                <Text fontWeight="medium">
                  {bankInfo.noiDung} {userId}
                </Text>
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="pink" //
                  onClick={() => handleCopy(`${bankInfo.noiDung} ${userId}`, "Nội dung chuyển khoản")}
                  leftIcon={<FaCopy />}
                ></Button>
              </HStack>
            </HStack>
          </VStack>
        </Grid>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader textAlign="center" color="green.500">
            <HStack justify="center" spacing={2}>
              <FaCheckCircle size="24px" />
              <Text>Giao dịch thành công</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Text fontSize="lg" fontWeight="medium">
                Bạn vừa được cộng {Number(amount).toLocaleString()}đ vào tài khoản
              </Text>
              <Button
                colorScheme="green"
                onClick={() => {
                  onClose(), setShowQR(false);
                }}
                w="full"
              >
                Đóng
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
