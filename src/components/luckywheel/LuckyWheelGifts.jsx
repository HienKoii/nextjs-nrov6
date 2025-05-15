import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export default function LuckyWheelGifts({ prizes }) {
  return (
    <>
      <Box my={4} textAlign="center" fontWeight="bold" fontSize="xl" color="orange.500">
        Danh sách phần quà
      </Box>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }}
        gap={4} //
        justifyItems="center"
      >
        {prizes.map((prize, idx) => (
          <GridItem
            key={prize.itemId + "-" + idx}
            w="100%"
            borderRadius="xl" //
            boxShadow="md"
          >
            <Box
              p={4}
              _dark={{ bg: "gray.800" }} //
              textAlign="center"
              minW={120}
            >
              <img src={prize.image} alt={prize.label} style={{ width: 60, height: 60, marginBottom: 8, objectFit: "contain", display: "block", marginLeft: "auto", marginRight: "auto" }} />
              <Box fontSize="md" color="gray.600" _dark={{ color: "gray.300" }} minH={"48px"}>
                {prize.itemName}
              </Box>
              <Box fontSize="md" color="green.500" fontWeight={600} mt={1}>
                x{prize.quantity}
              </Box>
              {prize.listOptions && prize.listOptions.length > 0 && (
                <Box mt={2} fontSize="sm" color="purple.500">
                  Tuỳ chọn:
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {prize.listOptions.map((opt, i) => (
                      <li key={i}>
                        <span style={{ fontWeight: 600 }}>ID: {opt[0]}</span> - Số lượng: {opt[1]}
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Box>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
