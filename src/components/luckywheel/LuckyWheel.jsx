import { useState } from "react";
import { Center, Flex, useToast } from "@chakra-ui/react";
import LuckyWheelSpin from "./LuckyWheelSpin";
import LuckyWheelHistory from "./LuckyWheelHistory";

const prizes = [
  {
    itemId: 1,
    label: "100 Xu",
    itemName: "Xu",
    quantity: 100,
    image: "/images/wheel/4028.png",
  },
  {
    itemId: 2,
    label: "200 Xu",
    itemName: "Xu",
    quantity: 200,
    image: "/images/wheel/4028.png",
  },
  {
    itemId: 3,
    label: "500 Xu",
    itemName: "Xu",
    quantity: 500,
    image: "/images/wheel/4028.png",
  },
  {
    itemId: 4,
    label: "1.000 Xu",
    itemName: "Xu",
    quantity: 1000,
    image: "/images/wheel/4028.png",
  },
  {
    itemId: 5,
    label: "Chúc bạn may mắn lần sau",
    itemName: "Không có phần thưởng",
    quantity: 0,
    image: "/images/wheel/4028.png",
  },
  {
    itemId: 6,
    label: "Giftcode VIP",
    itemName: "Giftcode VIP",
    quantity: 1,
    image: "/images/wheel/4028.png",
  },
  {
    itemId: 7,
    label: "50 Xu",
    itemName: "Xu",
    quantity: 50,
    image: "/images/wheel/4028.png",
  },
  {
    itemId: 8,
    label: "Quay lại",
    itemName: "Lượt quay lại",
    quantity: 1,
    image: "/images/wheel/4028.png",
  },
];

const mockNames = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D", "Bạn", "Ngô Văn E", "Vũ Thị F", "Hoàng Văn G", "Phan Thị H", "Đỗ Văn I"];

export default function LuckyWheel() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [angle, setAngle] = useState(0);
  const [winners, setWinners] = useState([
    { name: "Nguyễn Văn A", prize: "Giftcode VIP" },
    { name: "Trần Thị B", prize: "500 Xu" },
    { name: "Bạn", prize: "100 Xu" },
  ]);
  const toast = useToast();

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const prizeCount = prizes.length;
    const randomIndex = Math.floor(Math.random() * prizeCount);
    const newAngle = 360 * 3 + (360 / prizeCount) * randomIndex + 360 / (2 * prizeCount);
    setAngle((prev) => prev + newAngle);
    setTimeout(() => {
      const prize = prizes[randomIndex];
      setResult(prize.label);
      setSpinning(false);
      // Thêm người trúng mới vào danh sách
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
      setWinners((prev) => [{ name: randomName, prize: prize.label }, ...prev.slice(0, 9)]);
      // Hiển thị toast
      toast({
        title: "🎉 Chúc mừng!",
        description: `Bạn nhận được: ${prize.itemName}${prize.quantity > 1 ? ` x${prize.quantity}` : ""}`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }, 3500);
  };

  return (
    <Center>
      <Flex direction={{ base: "column", md: "row" }} gap={8} w="100%" maxW={900}>
        <LuckyWheelSpin prizes={prizes} spinning={spinning} onSpin={spin} angle={angle} />
        <LuckyWheelHistory winners={winners} />
      </Flex>
    </Center>
  );
}
