"use client";
import { useState } from "react";
import { Box, Heading, Flex, useColorMode } from "@chakra-ui/react";
import { FaGift, FaDice, FaStar } from "react-icons/fa";
import LuckyWheel from "@/components/luckywheel/LuckyWheel";
import GiftCode from "@/components/giftcode/giftcode";
import Error from "@/components/error";
import SidebarFeatureMenu from "@/components/sidebar/SidebarFeatureMenu";

const features = [
  {
    key: "luckywheel",
    icon: FaDice,
    title: "Vòng quay may mắn",
    desc: "Tham gia vòng quay nhận phần thưởng hấp dẫn mỗi ngày.",
    color: "orange.400",
    component: LuckyWheel,
  },
  {
    key: "giftcode",
    icon: FaGift,
    title: "Giftcode",
    desc: "Nhận và nhập giftcode để nhận quà tặng đặc biệt.",
    color: "pink.400",
    component: GiftCode,
  },
  {
    key: "other",
    icon: FaStar,
    title: "Tính năng khác",
    desc: "Khám phá thêm nhiều tính năng thú vị khác trong tương lai.",
    color: "purple.400",
    component: () => <Error text="Các chức năng mới sẽ được update trong tương lai. Vui lòng quay lại sau !" />,
  },
];

export default function FeaturesPage() {
  const { colorMode } = useColorMode();
  const [selected, setSelected] = useState(features[0].key);
  const SelectedComponent = features.find((f) => f.key === selected)?.component;

  return (
    <>
      <Heading
        size="2xl"
        bgGradient="linear(to-r, orange.400, pink.500)" //
        bgClip="text"
        textAlign="center"
        mb={8}
        py={2}
      >
        Các Tính Năng Nổi Bật
      </Heading>
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        {/* Sidebar */}
        <SidebarFeatureMenu features={features} selected={selected} setSelected={setSelected} />
        {/* Main content */}
        <Box
          flex={1}
          bg={colorMode === "light" ? "white" : "gray.800"} //
          borderRadius="xl"
          boxShadow="lg"
          minH="400px"
        >
          {SelectedComponent && <SelectedComponent />}
        </Box>
      </Flex>
    </>
  );
}
