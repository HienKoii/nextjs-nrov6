"use client";

import { IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, VStack, useColorMode } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Navigation from "../nav/Navigation";
import Footer from "@/layouts/Footer";
import Logo from "../logo";

export function MenuMobile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      <IconButton
        display={{ base: "flex", md: "none" }} //
        onClick={onOpen}
        variant="ghost"
        icon={<HamburgerIcon />}
        aria-label="Open menu"
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={colorMode === "dark" ? "gray.800" : "white"}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Logo />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Navigation isMobile />
            </VStack>
          </DrawerBody>
          <Footer />
        </DrawerContent>
      </Drawer>
    </>
  );
}
