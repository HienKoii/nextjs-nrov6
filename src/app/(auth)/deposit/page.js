"use client";
import { useEffect, useState } from "react";
import { Box, Heading, VStack, HStack, Text, Button, Input, useColorMode, Card, CardBody, Badge, useToast, Icon, Link } from "@chakra-ui/react";
import { FaHistory } from "react-icons/fa";
import QrDeposit from "@/components/deposit/QrDeposit";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const quickAmounts = [10000, 50000, 100000, 200000, 500000, 1000000];

export default function DepositPage() {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loading && !user && !token) {
      router.push("/");
    }
  }, [loading, user, router]);

  const handleDeposit = () => {
    if (!amount || amount < 10000) {
      toast({
        title: "Số tiền không hợp lệ",
        description: "Số tiền tối thiểu là 10,000đ",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowQR(true);
      toast({
        title: "Thành công",
        description: "Vui lòng quét mã QR để thanh toán",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 1000);
  };

  return (
    <>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between" align="center">
          <Heading
            bgGradient="linear(to-r, pink.500, orange.500)" //
            bgClip="text"
            fontSize="4xl"
            fontWeight="extrabold"
          >
            Nạp tiền
          </Heading>
          <Link
            as={NextLink}
            href="/deposit/history" //
            color="pink.500"
            _hover={{ textDecoration: "none", color: "pink.600" }}
          >
            <HStack>
              <Icon as={FaHistory} />
              <Text>Xem lịch sử</Text>
            </HStack>
          </Link>
        </HStack>

        <VStack spacing={6} align="stretch">
          <Card bg={colorMode === "light" ? "white" : "gray.800"} boxShadow="xl" borderRadius="xl">
            <CardBody>
              <VStack spacing={6}>
                <Box w="full">
                  <Text mb={2} fontWeight="medium">
                    Số tiền nạp
                  </Text>
                  <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Nhập số tiền" size="lg" variant="filled" />
                  <HStack mt={2} spacing={2} wrap="wrap">
                    {quickAmounts.map((quickAmount) => (
                      <Button key={quickAmount} size="sm" onClick={() => setAmount(quickAmount)} colorScheme="pink" variant="outline">
                        {quickAmount.toLocaleString()}đ
                      </Button>
                    ))}
                  </HStack>
                </Box>

                {showQR && <QrDeposit amount={amount} userId={user?.id} setShowQR={setShowQR} />}

                <Button w="full" size="lg" colorScheme="pink" onClick={handleDeposit} isLoading={isLoading} loadingText="Đang xử lý...">
                  Nạp tiền ngay
                </Button>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={colorMode === "light" ? "white" : "gray.800"} boxShadow="xl" borderRadius="xl">
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Hướng dẫn nạp tiền</Heading>
                <VStack align="stretch" spacing={3}>
                  <HStack>
                    <Badge colorScheme="pink">1</Badge>
                    <Text>Nhập số tiền cần nạp</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="pink">2</Badge>
                    <Text>Nhấn nút "Nạp tiền ngay" và quét mã QR</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="pink">3</Badge>
                    <Text>Hoàn tất giao dịch theo hướng dẫn</Text>
                  </HStack>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </VStack>
    </>
  );
}
