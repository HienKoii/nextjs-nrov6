import { useState } from "react";
import { Flex, useToast, Badge, HStack, Button, useDisclosure } from "@chakra-ui/react";
import LuckyWheelSpin from "./LuckyWheelSpin";
import LuckyWheelHistory from "./LuckyWheelHistory";
import { useAuth } from "@/contexts/AuthContext";
import { FaGift, FaCoins } from "react-icons/fa";
import axios from "axios";
import LuckyWheelGifts from "./LuckyWheelGifts";
import LuckyWheelPrizeModal from "./LuckyWheelPrizeModal";
import { baseItem } from "@/utils";
import { useLucky } from "@/contexts/LuckyContext";

const SPIN_MONEY_COST = 1000;

export default function LuckyWheel() {
  const { user, fetchUser } = useAuth();
  const { prizes, updateUserLuckyMoney, saveWinner, updateArrItemMore } = useLucky();

  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [angle, setAngle] = useState(0);
  const [modalPrize, setModalPrize] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const spinFree = async () => {
    // Kiểm tra user và token
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!user || !token) {
      toast({
        title: "Bạn cần đăng nhập!",
        description: "Vui lòng đăng nhập để quay vòng quay may mắn.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (!user.playerId) {
      toast({
        title: "Chưa tạo nhân vật!",
        description: "Bạn cần tạo nhân vật trước khi quay vòng quay may mắn.",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    // Kiểm tra đủ lượt quay miễn phí chưa
    if ((user.lucky ?? 0) < 1) {
      toast({
        title: "Hết lượt quay miễn phí!",
        description: "Bạn không còn lượt quay miễn phí nào.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (spinning) return;
    await updateUserLuckyMoney(user, user.lucky - 1, user.money);
    setSpinning(true);
    setResult(null);
    await fetchUser();
    const prizeCount = prizes.length;
    const randomIndex = Math.floor(Math.random() * prizeCount);
    const newAngle = 360 * 3 + (360 / prizeCount) * randomIndex + 360 / (2 * prizeCount);
    setAngle((prev) => prev + newAngle);
    setTimeout(async () => {
      const prize = prizes[randomIndex];
      setResult(prize.itemName);
      setSpinning(false);
      setModalPrize(prize);
      onOpen();
      if (user.playerId && prize.itemId && prize.quantity > 0) {
        await updateArrItemMore(user, prize.itemId, prize.quantity, prize.listOptions);
        await saveWinner(user.id, user.playerId, baseItem(prize.itemId, prize.quantity, prize.listOptions));
        await fetchUser();
      }
    }, 3500);
  };

  const spinPaid = async () => {
    // Kiểm tra user và token
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!user || !token) {
      toast({
        title: "Bạn cần đăng nhập!",
        description: "Vui lòng đăng nhập để quay vòng quay may mắn.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (!user.playerId) {
      toast({
        title: "Chưa tạo nhân vật!",
        description: "Bạn cần tạo nhân vật trước khi quay vòng quay may mắn.",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if ((user.money ?? 0) < SPIN_MONEY_COST) {
      toast({
        title: "Không đủ tiền!",
        description: `Bạn cần ít nhất ${SPIN_MONEY_COST} money để quay.`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (spinning) return;
    await updateUserLuckyMoney(user, user.lucky, user.money - SPIN_MONEY_COST);
    setSpinning(true);
    setResult(null);
    await fetchUser();
    const prizeCount = prizes.length;
    const randomIndex = Math.floor(Math.random() * prizeCount);
    const newAngle = 360 * 3 + (360 / prizeCount) * randomIndex + 360 / (2 * prizeCount);
    setAngle((prev) => prev + newAngle);
    setTimeout(async () => {
      const prize = prizes[randomIndex];
      setResult(prize.itemName);
      setSpinning(false);
      setModalPrize(prize);
      onOpen();
      if (user.playerId && prize.itemId && prize.quantity > 0) {
        await updateArrItemMore(user, prize.itemId, prize.quantity, prize.listOptions);
        await saveWinner(user.id, user.playerId, baseItem(prize.itemId, prize.quantity, prize.listOptions));
        await fetchUser();
      }
    }, 3500);
  };

  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }} //
        justifyContent={"space-between"}
        w="100%"
        maxW={900}
        gap={4}
      >
        <Flex direction="column" align="center" gap={4}>
          <LuckyWheelSpin
            prizes={prizes} //
            spinning={spinning}
            onSpin={spinPaid}
            angle={angle}
          />
          <HStack spacing={4} justify="center" mb={2}>
            <Badge
              colorScheme="green"
              px={3} //
              py={2}
              fontSize="md"
              borderRadius="md"
              display="flex"
              alignItems="center"
              gap={1}
              boxShadow="md"
            >
              <FaGift style={{ marginRight: 6 }} />
              <span style={{ fontWeight: 700 }}>{user?.lucky ?? 0}</span> lượt miễn phí
            </Badge>
            <Badge
              colorScheme="yellow"
              px={3} //
              py={2}
              fontSize="md"
              borderRadius="md"
              display="flex"
              alignItems="center"
              gap={1}
              boxShadow="md"
            >
              <FaCoins style={{ marginRight: 6 }} />
              <span style={{ fontWeight: 700 }}>{user?.money ?? 0}</span> Money
            </Badge>
          </HStack>
          <Flex gap={2} align="center">
            <Button
              onClick={spinFree}
              disabled={spinning} //
              style={{ padding: 8, borderRadius: 6, background: "#38a169", color: "white", border: "none", fontWeight: 600, cursor: spinning ? "not-allowed" : "pointer" }}
            >
              Quay miễn phí
            </Button>
            <Button
              onClick={spinPaid}
              disabled={spinning} //
              style={{ padding: 8, borderRadius: 6, background: "#3182ce", color: "white", border: "none", fontWeight: 600, cursor: spinning ? "not-allowed" : "pointer" }}
            >
              Quay {SPIN_MONEY_COST} money
            </Button>
          </Flex>
        </Flex>
        <LuckyWheelHistory />
      </Flex>
      <LuckyWheelGifts prizes={prizes} />
      <LuckyWheelPrizeModal isOpen={isOpen} onClose={onClose} prize={modalPrize} />
    </>
  );
}
