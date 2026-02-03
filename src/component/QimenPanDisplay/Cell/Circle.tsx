import React from "react";
import {Text, useColorModeValue} from "@chakra-ui/react";
import type {ColorVariant, Density} from "@/types/displayTypes";
import {densityScale} from "@/types/displayTypes";

interface Props {
    panSize: number;
    children: React.ReactNode;
    colorVariant: ColorVariant;
    density: Density;
}

export const Circle = React.memo<Props>(({panSize, children, colorVariant, density}) => {
    const scale = densityScale(density);
    const baseBg = useColorModeValue("yellow.300", "yellow.700");
    const neonBg = useColorModeValue("yellow.300", "yellow.500");

    return (
        <Text
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize={`${(panSize / 27) * scale}px`}
            bgColor={colorVariant === "neon" ? neonBg : baseBg}
            color="black"
            borderRadius="full"
            width={`${(panSize / 18) * scale}px`}
            height={`${(panSize / 18) * scale}px`}
            _first={{mb: density === "compact" ? 0.5 : 1}}
        >
            {children}
        </Text>
    );
});
