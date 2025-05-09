import { Menu, MenuButton, Button, Flex, Box, Badge, Skeleton, useColorModeValue } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "@/contexts/AuthContext";
import MenuUser from "../menu/MenuUser";
import AvatarImage from "../images/AvatarImage";

export default function AuthLogin() {
  const { user, loading } = useAuth();
  console.log("user", user);
  const badgeBg = useColorModeValue("gray.200", "gray.700");
  const badgeColor = useColorModeValue("gray.600", "gray.300");

  if (loading) {
    return (
      <Flex alignItems="center" gap={4}>
        <Skeleton
          startColor={useColorModeValue("gray.200", "gray.600")}
          endColor={useColorModeValue("gray.300", "gray.500")} //
          borderRadius="full"
          boxSize={{ base: "8", md: "10" }}
        />
      </Flex>
    );
  }

  return (
    <Flex alignItems="center" gap={4}>
      <Menu>
        <MenuButton as={Button} variant="ghost" size={{ base: "sm", md: "md" }} p={0} position="relative" _hover={{}} _active={{}}>
          <Box>
            <AvatarImage id={user?.avatar} />
            <Badge
              position="absolute"
              bottom={{ base: "-1", md: "0" }}
              left={{ base: "73%", md: "70%" }}
              transform="translateX(-50%)"
              bg={badgeBg}
              borderRadius="full"
              p="1px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ChevronDownIcon boxSize={3} color={badgeColor} />
            </Badge>
          </Box>
        </MenuButton>
        <MenuUser />
      </Menu>
    </Flex>
  );
}
