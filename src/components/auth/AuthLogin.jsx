"use client";

import { Menu, MenuButton, Button, Avatar, Flex, Box, Badge, useColorMode } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "@/contexts/AuthContext";
import MenuUser from "../menu/MenuUser";

export default function AuthLogin() {
  const { colorMode } = useColorMode();
  const { user } = useAuth();

  return (
    <Flex alignItems="center" gap={4}>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          size={{ base: "sm", md: "md" }}
          p={0}
          position="relative"
          _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
          _active={{ bg: colorMode === "light" ? "gray.200" : "gray.600" }}
        >
          <Box>
            <Avatar size="sm" name={user?.username || "User Name"} src={user?.avatar || "https://bit.ly/broken-link"} border="2px solid" borderColor={colorMode === "light" ? "gray.200" : "gray.600"} />
            <Badge
              position="absolute"
              bottom={{ base: "0", md: "1" }}
              left={{ base: "65%", md: "61%" }}
              transform="translateX(-50%)"
              bg={colorMode === "light" ? "gray.200" : "gray.700"}
              borderRadius="full"
              p="1px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ChevronDownIcon boxSize={3} color={colorMode === "light" ? "gray.600" : "gray.300"} />
            </Badge>
          </Box>
        </MenuButton>
        <MenuUser />
      </Menu>
    </Flex>
  );
}
