"use client";
import { Box, Heading, VStack } from "@chakra-ui/react";
import HistoryDeposit from "@/components/deposit/HistoryDeposit";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function DepositHistoryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loading && !user && !token) {
      router.push("/");
    }
  }, [loading, user, router]);

  return (
    <VStack spacing={8} align="stretch">
      <Heading
        textAlign="center" //
        bgGradient="linear(to-r, pink.500, orange.500)"
        bgClip="text"
        fontSize="4xl"
        fontWeight="extrabold"
      >
        Lịch sử nạp tiền
      </Heading>
      <Box>
        <HistoryDeposit />
      </Box>
    </VStack>
  );
}
