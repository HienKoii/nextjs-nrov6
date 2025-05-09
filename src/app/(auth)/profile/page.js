"use client";

import { Box, VStack, HStack, Text, Heading, Button, Grid, GridItem, Badge, useColorModeValue, Card, CardBody, Icon, Flex } from "@chakra-ui/react";
import { FaUser, FaGamepad, FaHistory, FaSignOutAlt, FaLock, FaUnlock, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import AvatarImage from "@/components/images/AvatarImage";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingProfile from "@/components/loading/LoadingProfile";
import MenuProfile from "@/components/menu/MenuProfile";
import { formatDate } from "@/utils";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProfilePage() {
  const { user: userData, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
  console.log('userData', userData)

    if (!loading && !userData) {
      router.push("/");
    }
  }, [loading, userData, router]);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("blue.500", "blue.300");

  if (loading) {
    return (
      <LoadingProfile //
        staggerContainer={staggerContainer}
        fadeInUp={fadeInUp}
      />
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <>
      <MotionBox initial="hidden" animate="visible" variants={staggerContainer}>
        {/* Profile Header */}
        <MotionCard variants={fadeInUp} bg={cardBg} borderRadius="xl" boxShadow="lg" mb={8} overflow="hidden" border="1px solid" borderColor={borderColor}>
          <Box
            h="200px"
            position="relative"
            backgroundImage="url('/images/banner/3.png')"
            backgroundSize="cover"
            backgroundPosition="center"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bg: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(2px)",
            }}
          />
          <CardBody position="relative" mt="-60px">
            <VStack spacing={4} align="center">
              <Box p={1} borderRadius="full" bg={cardBg} border="2px solid" borderColor={borderColor}>
                <AvatarImage id={userData?.avatar} sizeAvatar={"2xl"} />
              </Box>
              <VStack spacing={1}>
                <Heading size="lg" color={headingColor}>
                  {userData?.username}
                </Heading>
                <HStack spacing={2}>
                  <Badge colorScheme="purple" fontSize="sm">
                    Level {userData?.level}
                  </Badge>
                  {userData?.isAdmin === 1 ? (
                    <Badge colorScheme="red" fontSize="sm">
                      Admin
                    </Badge>
                  ) : (
                    <Badge colorScheme="blue" fontSize="sm">
                      Member
                    </Badge>
                  )}
                  {userData?.isLock === 1 ? (
                    <Badge colorScheme="red" fontSize="sm">
                      <Icon as={FaLock} mr={1} /> Khóa
                    </Badge>
                  ) : (
                    <Badge colorScheme="green" fontSize="sm">
                      <Icon as={FaUnlock} mr={1} /> Hoạt động
                    </Badge>
                  )}
                </HStack>
              </VStack>
            </VStack>
          </CardBody>
        </MotionCard>

        {/* Stats Grid */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} //
          gap={6}
          mb={8}
        >
          <GridItem>
            <MotionCard
              variants={fadeInUp}
              bg={cardBg}
              borderRadius="xl" //
              border="1px solid"
              borderColor={borderColor}
              _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
              transition="all 0.2s"
            >
              <CardBody>
                <VStack spacing={2}>
                  <Text color={textColor} fontSize="sm" textTransform="uppercase">
                    Money
                  </Text>
                  <Heading size="lg" color={headingColor}>
                    {userData?.money?.toLocaleString()}đ
                  </Heading>
                </VStack>
              </CardBody>
            </MotionCard>
          </GridItem>
          <GridItem>
            <MotionCard
              variants={fadeInUp}
              bg={cardBg} //
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
              transition="all 0.2s"
            >
              <CardBody>
                <VStack spacing={2}>
                  <Text color={textColor} fontSize="sm" textTransform="uppercase">
                    Tổng nạp
                  </Text>
                  <Heading size="lg" color={headingColor}>
                    {userData?.tongnap?.toLocaleString()}đ
                  </Heading>
                </VStack>
              </CardBody>
            </MotionCard>
          </GridItem>
          <GridItem>
            <MotionCard
              variants={fadeInUp}
              bg={cardBg} //
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
              transition="all 0.2s"
            >
              <CardBody>
                <VStack spacing={2}>
                  <Text color={textColor} fontSize="sm" textTransform="uppercase">
                    Nạp tuần
                  </Text>
                  <Heading size="lg" color={headingColor}>
                    {userData?.naptuan?.toLocaleString()}đ
                  </Heading>
                </VStack>
              </CardBody>
            </MotionCard>
          </GridItem>
        </Grid>

        {/* Info Table */}
        <MotionCard variants={fadeInUp} bg={cardBg} borderRadius="xl" border="1px solid" borderColor={borderColor} mb={8}>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading size="md" color={headingColor}>
                Thông tin chi tiết
              </Heading>
              <Grid //
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
              >
                <GridItem>
                  <HStack spacing={4}>
                    <Icon as={FaUser} color={iconColor} />
                    <VStack align="start" spacing={1}>
                      <Text color={textColor} fontSize="sm">
                        Tên nhân vật
                      </Text>
                      <Text color={headingColor} fontWeight="medium">
                        {userData?.cName || "Chưa tạo nhân vật"}
                      </Text>
                    </VStack>
                  </HStack>
                </GridItem>
                <GridItem>
                  <HStack spacing={4}>
                    <Icon as={FaUser} color={iconColor} />
                    <VStack align="start" spacing={1}>
                      <Text color={textColor} fontSize="sm">
                        Email
                      </Text>
                      <Text color={headingColor} fontWeight="medium">
                        {userData?.gmail}
                      </Text>
                    </VStack>
                  </HStack>
                </GridItem>
                <GridItem>
                  <HStack spacing={4}>
                    <Icon as={FaHistory} color={iconColor} />
                    <VStack align="start" spacing={1}>
                      <Text color={textColor} fontSize="sm">
                        Ngày tham gia
                      </Text>
                      <Text color={headingColor} fontWeight="medium">
                        {formatDate(userData?.time)}
                      </Text>
                    </VStack>
                  </HStack>
                </GridItem>
                <GridItem>
                  <HStack spacing={4}>
                    <Icon as={FaShieldAlt} color={iconColor} />
                    <VStack align="start" spacing={1}>
                      <Text color={textColor} fontSize="sm">
                        Trạng thái tài khoản
                      </Text>
                      <Text color={headingColor} fontWeight="medium">
                        {userData?.isLock === 1 ? "Đã khóa" : "Hoạt động"}
                      </Text>
                    </VStack>
                  </HStack>
                </GridItem>
                <GridItem>
                  <HStack spacing={4}>
                    <Icon as={FaGamepad} color={iconColor} />
                    <VStack align="start" spacing={1}>
                      <Text color={textColor} fontSize="sm">
                        Cấp độ
                      </Text>
                      <Text color={headingColor} fontWeight="medium">
                        Level {userData?.level}
                      </Text>
                    </VStack>
                  </HStack>
                </GridItem>
                <GridItem>
                  <HStack spacing={4}>
                    <Icon as={FaUser} color={iconColor} />
                    <VStack align="start" spacing={1}>
                      <Text color={textColor} fontSize="sm">
                        Vai trò
                      </Text>
                      <Text color={headingColor} fontWeight="medium">
                        {userData?.isAdmin === 1 ? "Admin" : "Member"}
                      </Text>
                    </VStack>
                  </HStack>
                </GridItem>
              </Grid>
            </VStack>
          </CardBody>
        </MotionCard>

        {/* Action Buttons */}
        <Flex
          justify="center"
          alignItems={"center"} ///
          flexDirection={"column"}
          mt={8}
          gap={4}
        >
          <MenuProfile />
          <Button
            leftIcon={<FaSignOutAlt />}
            colorScheme="red"
            variant="outline"
            size="lg"
            border="2px solid"
            _hover={{
              bg: "red.500",
              color: "white",
              borderColor: "red.500",
            }}
            onClick={() => logout()}
          >
            Đăng xuất
          </Button>
        </Flex>
      </MotionBox>
    </>
  );
}
