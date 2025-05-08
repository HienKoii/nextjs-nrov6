"use client";

import { Stack } from "@chakra-ui/react";
import { LoginButton } from "../buttons/LoginButton";
import RegisterButton from "../buttons/RegisterButton";

export default function AuthButtons() {
  return (
    <Stack direction={"row"} spacing={2} alignItems="center">
      <LoginButton />
      <RegisterButton />
    </Stack>
  );
}
