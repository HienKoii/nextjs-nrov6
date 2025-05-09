import { useAuth } from "@/contexts/AuthContext";
import { MenuItem, MenuList, Box, Divider, Text, useColorMode } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiLock, FiClock, FiLogOut } from "react-icons/fi";

export default function MenuUser() {
  const { colorMode } = useColorMode();

  const { user, logout } = useAuth();

  const UserProfileMenu = motion(MenuList);
  const MotionMenuItem = motion(MenuItem);

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      <UserProfileMenu py={2} shadow="lg" borderColor={colorMode === "light" ? "gray.200" : "gray.600"} variants={menuVariants} initial="hidden" animate="visible" exit="hidden">
        <Box px={3} py={2} borderBottom="1px" borderColor={colorMode === "light" ? "gray.200" : "gray.500"}>
          <Text fontWeight="bold" fontSize="sm">
            Xin chào, {user?.username || "username"}
          </Text>
        </Box>
        <MotionMenuItem
          icon={<FiUser />}
          _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.600" }}
          _focus={{ bg: colorMode === "light" ? "gray.100" : "gray.600" }}
          variants={itemVariants}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          Thông tin tài khoản
        </MotionMenuItem>
        <MotionMenuItem
          icon={<FiLock />}
          _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.600" }}
          _focus={{ bg: colorMode === "light" ? "gray.100" : "gray.600" }}
          variants={itemVariants}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          Đổi mật khẩu
        </MotionMenuItem>
        <MotionMenuItem
          icon={<FiClock />}
          _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.600" }}
          _focus={{ bg: colorMode === "light" ? "gray.100" : "gray.600" }}
          variants={itemVariants}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          Lịch sử giao dịch
        </MotionMenuItem>
        <Divider borderColor={colorMode === "light" ? "gray.200" : "gray.500"} my={2} />
        <MotionMenuItem
          icon={<FiLogOut />}
          color="red.500"
          _hover={{ bg: colorMode === "light" ? "red.50" : "red.800" }}
          _focus={{ bg: colorMode === "light" ? "red.50" : "red.800" }}
          variants={itemVariants}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => logout()}
        >
          Đăng xuất
        </MotionMenuItem>
      </UserProfileMenu>
    </AnimatePresence>
  );
}
