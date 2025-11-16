"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";

type SlotSymbol = {
  id: string;
  label?: string;
  imageUrl?: string;
};

interface SlotProps {
  symbols?: SlotSymbol[];
  onResult?: (result: [SlotSymbol, SlotSymbol, SlotSymbol]) => void;
}

const MotionBox = motion(Box);

export function Slot({ symbols, onResult }: SlotProps) {
  const defaultSymbols = useMemo<SlotSymbol[]>(
    () => [
      { id: "animal1", label: "A", imageUrl: "/animals/golden.png" },
      { id: "animal2", label: "B", imageUrl: "/hero/birds.png" },
      { id: "animal3", label: "C", imageUrl: "/hero/animals.png" },
      { id: "unknown", label: "?", imageUrl: "/favicon.png" },
    ],
    []
  );

  const pool = symbols && symbols.length >= 4 ? symbols : defaultSymbols;
  const [spinning, setSpinning] = useState(false);
  const [stops, setStops] = useState<[number, number, number]>([0, 1, 2]);

  const start = useCallback(() => {
    if (spinning) return;
    setSpinning(true);

    const nextStops: [number, number, number] = [
      Math.floor(Math.random() * pool.length),
      Math.floor(Math.random() * pool.length),
      Math.floor(Math.random() * pool.length),
    ];
    setStops(nextStops);

    // 停止時間做出階梯效果
    const stopDelays = [1100, 1400, 1700];
    stopDelays.forEach((delay, idx) => {
      setTimeout(() => {
        if (idx === 2) {
          setSpinning(false);
          onResult?.([
            pool[nextStops[0]],
            pool[nextStops[1]],
            pool[nextStops[2]],
          ]);
        }
      }, delay);
    });
  }, [onResult, pool, spinning]);

  const renderCell = (symbol: SlotSymbol) => {
    return (
      <Box
        w="60px"
        h="60px"
        rounded="8px"
        bg="white"
        border="1px solid"
        borderColor="#EDE7E1"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {symbol.imageUrl ? (
          <Box
            w="100%"
            h="100%"
            bgImage={`url('${symbol.imageUrl}')`}
            bgSize="cover"
            bgPos="center"
          />
        ) : (
          <Text color="#72543B" fontWeight="700">
            {symbol.label ?? "?"}
          </Text>
        )}
      </Box>
    );
  };

  const Reel = ({
    index,
    stopIndex,
  }: {
    index: number;
    stopIndex: number;
  }) => {
    const targetSymbol = pool[stopIndex % pool.length];
    return (
      <Box
        w="60px"
        h="60px"
        rounded="10px"
        bg="white"
        border="2px solid"
        borderColor="#987455"
        boxShadow="0 2px 0 rgba(0,0,0,0.06)"
        overflow="hidden"
      >
        <MotionBox
          key={`${spinning ? "spin" : "stop"}-${index}-${stopIndex}`}
          animate={
            spinning
              ? { y: [0, -60, -120, -180, -240, 0] }
              : { y: 0 }
          }
          transition={
            spinning
              ? {
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                }
              : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
          }
        >
          {/* 3 倍高度內容做循環滾動效果 */}
          <Flex direction="column">
            {pool.slice(0, 3).map((sym) => (
              <Box key={`loop-${sym.id}-${index}-${sym.label}`}>{renderCell(sym)}</Box>
            ))}
          </Flex>
        </MotionBox>
        {!spinning && (
          <Box position="absolute" w="60px" h="60px" top={0} left={0}>
            {renderCell(targetSymbol)}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Flex direction="column" align="center" gap="14px">
      <Flex gap="10px">
        <Reel index={0} stopIndex={stops[0]} />
        <Reel index={1} stopIndex={stops[1]} />
        <Reel index={2} stopIndex={stops[2]} />
      </Flex>
      <Button
        onClick={start}
        disabled={spinning}
        colorScheme="brand"
        bg="#987455"
        _hover={{ bg: "#87654a" }}
        rounded="999px"
        px="28px"
        h="40px"
      >
        {spinning ? "轉動中..." : "開始"}
      </Button>
    </Flex>
  );
}
