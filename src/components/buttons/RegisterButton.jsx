import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function RegisterButton() {
  return (
    <Button variant="outline" display={{ base: "none", md: "block" }} textAlign={"center"}>
      <Link href={"/register"}>Đăng ký</Link>
    </Button>
  );
}
