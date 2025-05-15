import { Box, VStack} from "@chakra-ui/react";
import { useRef } from "react";

const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#E7E9ED", "#FF6384"];

export default function LuckyWheelSpin({ prizes, spinning, onSpin, angle }) {
  const wheelRef = useRef();

  // Vẽ các phần thưởng bằng SVG (ảnh + label)
  const renderSlices = () => {
    const prizeCount = prizes.length;
    const radius = 140;
    const center = 150;
    const anglePer = 360 / prizeCount;
    return prizes.map((prize, i) => {
      const startAngle = anglePer * i;
      const endAngle = anglePer * (i + 1);
      const x1 = center + radius * Math.cos((Math.PI * startAngle) / 180);
      const y1 = center + radius * Math.sin((Math.PI * startAngle) / 180);
      const x2 = center + radius * Math.cos((Math.PI * endAngle) / 180);
      const y2 = center + radius * Math.sin((Math.PI * endAngle) / 180);
      const largeArc = anglePer > 180 ? 1 : 0;
      // Tính vị trí icon
      const iconR = radius - 55;
      const iconX = center + iconR * Math.cos((Math.PI * (startAngle + anglePer / 2)) / 180) - 22;
      const iconY = center + iconR * Math.sin((Math.PI * (startAngle + anglePer / 2)) / 180) - 22;
      // Bỏ label trên vòng quay
      return (
        <g key={i}>
          <path d={`M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`} fill={colors[i % colors.length]} stroke="#fff" strokeWidth={2} />
          {/* Icon */}
          <image
            href={prize.image}
            x={iconX}
            y={iconY} //
            width={44}
            height={44}
            style={{ pointerEvents: "none" }}
          />
        </g>
      );
    });
  };

  return (
    <VStack spacing={8} flex={2} align="center" justify="center" p={1}>
      <Box position="relative">
        <svg
          ref={wheelRef}
          width={300}
          height={300}
          style={{
            transition: spinning ? "transform 3.5s cubic-bezier(.17,.67,.83,.67)" : undefined,
            transform: `rotate(${angle}deg)`,
          }}
        >
          {renderSlices()}
          {/* Kim chỉ */}
          <circle cx={150} cy={150} r={30} fill="#fff" stroke="#888" strokeWidth={2} />
        </svg>
        {/* Kim chỉ trên cùng */}
        <Box
          position="absolute"
          top="1px"
          left="50%" //
          transform="translateX(-50%)"
          zIndex={2}
        >
          <Box
            w={0}
            h={0}
            borderLeft="12px solid transparent" //
            borderRight="12px solid transparent"
            borderTop="24px solid #e53e3e"
          />
        </Box>
      </Box>
    </VStack>
  );
}
