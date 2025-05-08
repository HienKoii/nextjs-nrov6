import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

export function LoginButton() {
  return (
    <MotionButton colorScheme="blue" size={{ base: "sm", md: "md" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
      <Link href={"/login"}>Đăng nhập</Link>
    </MotionButton>
  );
}
