import React from "react";
import {Text, useColorModeValue} from "@chakra-ui/react";
import type {Density} from "@/types/displayTypes";
import {densityScale} from "@/types/displayTypes";

interface Props {
    panSize: number;
    value: React.ReactNode;
    density: Density;
}

export const Room = React.memo<Props>(({panSize, value, density}) => {
    const scale = densityScale(density);
    const roomColor = useColorModeValue("gray.500", "gray.400");

    return (
        <Text cursor="pointer" fontSize={`${(panSize / 30) * scale}px`} color={roomColor}>
            {value || "　"}
        </Text>
    );
});
