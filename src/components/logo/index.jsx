"use client";

import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionText = motion.create(Text);

export default function Logo() {
  return (
    <Flex alignItems={"center"} justifyContent={"center"}>
      <Link href="/" passHref>
        <MotionText
          fontSize="xl"
          fontWeight="bold"
          cursor="pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            scale: 1.1,
            color: "#3182CE",
            transition: { duration: 0.2 },
          }}
          
        >
          NRO Ponny
        </MotionText>
      </Link>
    </Flex>
  );
}
