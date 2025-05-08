"use client";

import { Menu, MenuButton, MenuList, MenuItem, Button, Avatar, Text, Flex, Box, Badge, useColorMode } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function AuthLogin() {
  const { colorMode } = useColorMode();

  return (
    <Flex alignItems="center" gap={4}>
      <Menu>
        <MenuButton as={Button} variant="ghost" size={{ base: "sm", md: "md" }} p={0} position="relative">
          <Box>
            <Avatar size="sm" name="User Name" src="https://bit.ly/broken-link" />
            <Badge
              position="absolute"
              bottom={{ base: "0", md: "1" }}
              left={{ base: "65%", md: "61%" }}
              transform="translateX(-50%)" //
              bg={colorMode === "light" ? "gray.200" : "gray.700"}
              borderRadius="full"
              p="1px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ChevronDownIcon
                boxSize={3} //
                color={colorMode === "light" ? "gray.600" : "gray.300"}
              />
            </Badge>
          </Box>
        </MenuButton>
        <MenuList>
          <MenuItem>Thông tin tài khoản</MenuItem>
          <MenuItem>Đổi mật khẩu</MenuItem>
          <MenuItem>Lịch sử giao dịch</MenuItem>
          <MenuItem color="red.500">Đăng xuất</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
