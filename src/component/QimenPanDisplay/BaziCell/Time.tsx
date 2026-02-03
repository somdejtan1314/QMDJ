import React from "react";
import {Text, useColorModeValue} from "@chakra-ui/react";
import {Lunar} from "lunar-typescript";
import type {Density} from "@/types/displayTypes";
import {densityScale} from "@/types/displayTypes";

interface Props {
    panSize: number;
    lunar: Lunar;
    density: Density;
}

export const Time = React.memo<Props>(({lunar, panSize, density}) => {
    const timeColor = useColorModeValue("gray.700", "gray.300");
    const scale = densityScale(density);
    const solar = lunar.getSolar();

    return (
        <Text color={timeColor} fontSize={`${(panSize / 40) * scale}px`}>
            {solar.getMonth()}月 {solar.getDay()}日 {solar.getYear()}年 {solar.getHour()}時
        </Text>
    );
});
