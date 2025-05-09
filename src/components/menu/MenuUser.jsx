import { useAuth } from "@/contexts/AuthContext";
import { MenuItem, MenuList, Box, Divider, Text, useColorMode, Flex, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiUser, FiLock, FiClock, FiLogOut, FiDollarSign } from "react-icons/fi";

export default function MenuUser() {
  const { user, logout } = useAuth();
  const hoverBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const dividerColor = useColorModeValue("gray.200", "gray.500");
  const usernameColor = useColorModeValue("blue.500", "blue.300");

  const UserProfileMenu = motion.create(MenuList);
  const MotionMenuItem = motion.create(MenuItem);

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

  const menuItems = [
    {
      icon: FiUser,
      label: "Thông tin tài khoản",
      href: "/profile",
      color: "inherit",
    },
    {
      icon: FiDollarSign,
      label: "Nạp tiền",
      href: "/deposit",
      color: "inherit",
    },
    {
      icon: FiLock,
      label: "Đổi mật khẩu",
      href: "/change-password",
      color: "inherit",
    },
    {
      icon: FiClock,
      label: "Lịch sử giao dịch",
      href: "/transaction-history",
      color: "inherit",
    },
  ];

  return (
    <AnimatePresence>
      <UserProfileMenu
        py={2}
        shadow="lg"
        borderColor={borderColor} //
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <Box px={3} py={2} borderBottom="1px" borderColor={dividerColor}>
          <Flex gap={1}>
            <Text fontWeight="bold" fontSize="sm">
              Xin chào,
            </Text>
            <Text fontWeight="bold" fontSize="sm" color={usernameColor}>
              {user?.username || "username"}
            </Text>
          </Flex>
        </Box>

        {menuItems.map((item) => (
          <MotionMenuItem
            key={item.label}
            icon={<item.icon />}
            _hover={{ bg: hoverBg }}
            _focus={{ bg: hoverBg }}
            variants={itemVariants}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            as={Link}
            href={item.href}
            color={item.color}
          >
            {item.label}
          </MotionMenuItem>
        ))}

        <Divider borderColor={dividerColor} my={2} />

        <MotionMenuItem
          icon={<FiLogOut />}
          color="red.500"
          _hover={{ bg: useColorModeValue("red.50", "red.800") }}
          _focus={{ bg: useColorModeValue("red.50", "red.800") }}
          variants={itemVariants}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
        >
          Đăng xuất
        </MotionMenuItem>
      </UserProfileMenu>
    </AnimatePresence>
  );
}
