import { Avatar, Box, useColorMode } from "@chakra-ui/react";

export default function AvatarImage({ id, sizeAvatar }) {
  const { colorMode } = useColorMode();
  return (
    <Box
      p="2px" // khoảng trống giữa border và avatar
      borderRadius="full"
      bgGradient={colorMode === "light" ? "linear(to-r, teal.300, blue.400)" : "linear(to-r, teal.200, purple.300)"}
      boxShadow="0 0 0 2px white" // viền trắng quanh viền màu
      display="inline-block"
    >
      <Avatar
        size={sizeAvatar ? sizeAvatar : "sm"}
        name={"username"} //
        src={id ? `images/avatar/${id}.png` : "images/avatar/user.png"}
        bg="white"
      />
    </Box>
  );
}
