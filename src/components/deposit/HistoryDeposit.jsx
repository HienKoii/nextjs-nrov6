import { VStack, HStack, Text, Badge, Card, CardBody, useColorMode, Center, Spinner, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { formatDate } from "@/utils";

const MotionBox = motion.create(Box);

export default function HistoryDeposit() {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [transactions, setTransactions] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Fake API call to get transaction history
  const fetchTransactionHistory = async () => {
    setLoadingHistory(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`/api/payment/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải lịch sử giao dịch",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  const fetchAutoDeposit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await axios.post("/api/payment/atm");
      if (response.status === 200) {
        fetchTransactionHistory();
      }
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

  if (loadingHistory) {
    return (
      <Center py={8}>
        <Spinner size="xl" color="pink.500" />
      </Center>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      {transactions.map((transaction, index) => (
        <MotionBox
          key={transaction.id} //
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card bg={colorMode === "light" ? "white" : "gray.800"} boxShadow="md" borderRadius="lg">
            <CardBody>
              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold">Chuyển khoản ngân hàng</Text>
                  <Text color="gray.500" fontSize="sm">
                    {formatDate(transaction.created_at)}
                  </Text>
                </VStack>
                <VStack align="end" spacing={1}>
                  <Badge
                    colorScheme={"green"}
                    fontSize="md" //
                    px={3}
                    py={1}
                  >
                    Thành công
                  </Badge>
                  <Text
                    fontWeight="bold" //
                    color={transaction.status === "success" ? "green.500" : "yellow.500"}
                  >
                    +{transaction.amount.toLocaleString()}đ
                  </Text>
                </VStack>
              </HStack>
            </CardBody>
          </Card>
        </MotionBox>
      ))}
    </VStack>
  );
}
