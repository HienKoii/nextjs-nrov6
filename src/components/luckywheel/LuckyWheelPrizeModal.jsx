import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, VStack, Box, Text, Button, Image as ChakraImage } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Simple Firework/Confetti burst using framer-motion
function FireworkBurst({ show }) {
  const particles = Array.from({ length: 12 });
  return (
    <AnimatePresence>
      {show && (
        <Box position="absolute" top={0} left={0} w="100%" h="100%" pointerEvents="none" zIndex={10}>
          {particles.map((_, i) => {
            const angle = (360 / particles.length) * i;
            const color = ["#FFD700", "#FF69B4", "#00E1FF", "#FF6347", "#7CFC00"][i % 5];
            return (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                animate={{
                  opacity: [1, 1, 0],
                  x: [0, 60 * Math.cos((angle * Math.PI) / 180)],
                  y: [0, 60 * Math.sin((angle * Math.PI) / 180)],
                  scale: [1, 1.2, 0.8],
                }}
                transition={{ duration: 1.2, delay: 0.1 * (i % 3) }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: color,
                  boxShadow: `0 0 12px 2px ${color}`,
                }}
              />
            );
          })}
        </Box>
      )}
    </AnimatePresence>
  );
}

export default function LuckyWheelPrizeModal({ isOpen, onClose, prize }) {
  const [showFirework, setShowFirework] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setShowFirework(true);
      const t = setTimeout(() => setShowFirework(false), 1800);
      return () => clearTimeout(t);
    } else {
      setShowFirework(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <ModalContent
        borderRadius="2xl"
        p={2} //
        bgGradient="linear(to-br, orange.100, yellow.50, pink.100)"
        boxShadow="0 0 32px 8px #FFD700, 0 0 0 4px #FF69B4"
        position="relative"
        overflow="visible"
      >
        <FireworkBurst show={showFirework} />
        <ModalHeader
          textAlign="center" //
          color="orange.400"
          fontWeight="extrabold"
          fontSize="2xl"
          letterSpacing={1}
          textShadow="0 2px 8px #fff, 0 0 4px #FFD700"
        >
          🎉 Chúc mừng bạn!
        </ModalHeader>
        <ModalCloseButton color="gray.500" _hover={{ color: "orange.400" }} />
        <ModalBody>
          {prize && (
            <VStack spacing={5}>
              <motion.div
                initial={{ scale: 0.7, rotate: -10 }} //
                animate={{ scale: 1.1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <ChakraImage
                  src={prize.image}
                  alt={prize.itemName} //
                  boxSize={90}
                  objectFit="contain"
                  mx="auto"
                  borderRadius="full"
                  boxShadow="0 0 24px 4px #FFD700, 0 0 0 4px #FF69B4"
                  bg="whiteAlpha.900"
                  p={2}
                />
              </motion.div>
              <Text
                fontSize="2xl"
                fontWeight="extrabold" //
                color="orange.500"
                textShadow="0 2px 8px #fff, 0 0 4px #FFD700"
                letterSpacing={1}
              >
                x{prize.quantity} {prize.itemName}
              </Text>
              <Button
                colorScheme="yellow"
                size="lg" //
                onClick={onClose}
                borderRadius="xl"
                fontWeight="bold"
                fontSize="lg"
                boxShadow="0 0 8px 2px #FFD700"
                _hover={{ bg: "orange.300", color: "white" }}
              >
                Đóng
              </Button>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
