import { motion } from "framer-motion";
import { Box, VStack, HStack, Grid, GridItem, Card, CardBody, Flex, Skeleton, SkeletonCircle, useColorModeValue } from "@chakra-ui/react";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function LoadingProfile({ staggerContainer, fadeInUp }) {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <MotionBox
      initial="hidden"
      animate="visible" //
      variants={staggerContainer}
    >
      {/* Profile Header Skeleton */}
      <MotionCard
        variants={fadeInUp}
        bg={cardBg} //
        borderRadius="xl"
        boxShadow="lg"
        mb={8}
        overflow="hidden"
        border="1px solid"
        borderColor={borderColor}
      >
        <Box h="200px" bg="gray.200" />
        <CardBody position="relative" mt="-60px">
          <VStack spacing={4} align="center">
            <SkeletonCircle size="32" />
            <VStack spacing={1}>
              <Skeleton height="30px" width="200px" />
              <HStack spacing={2}>
                <Skeleton height="20px" width="100px" />
                <Skeleton height="20px" width="80px" />
              </HStack>
            </VStack>
            <HStack spacing={4}>
              <Skeleton height="20px" width="150px" />
              <Skeleton height="20px" width="200px" />
            </HStack>
          </VStack>
        </CardBody>
      </MotionCard>

      {/* Stats Grid Skeleton */}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} //
        gap={6}
        mb={8}
      >
        {[...Array(4)].map((_, index) => (
          <GridItem key={index}>
            <MotionCard
              variants={fadeInUp} //
              bg={cardBg}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
            >
              <CardBody>
                <VStack spacing={2}>
                  <Skeleton height="20px" width="100px" />
                  <Skeleton height="30px" width="120px" />
                </VStack>
              </CardBody>
            </MotionCard>
          </GridItem>
        ))}
      </Grid>

      {/* Menu Grid Skeleton */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        {[...Array(4)].map((_, index) => (
          <GridItem key={index}>
            <MotionCard
              variants={fadeInUp} //
              bg={cardBg}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
            >
              <CardBody>
                <HStack spacing={4}>
                  <SkeletonCircle size="6" />
                  <Skeleton height="24px" width="150px" />
                </HStack>
              </CardBody>
            </MotionCard>
          </GridItem>
        ))}
      </Grid>

      {/* Action Buttons Skeleton */}
      <Flex justify="center" mt={8} gap={4}>
        <Skeleton height="48px" width="200px" />
        <Skeleton height="48px" width="200px" />
      </Flex>
    </MotionBox>
  );
}
