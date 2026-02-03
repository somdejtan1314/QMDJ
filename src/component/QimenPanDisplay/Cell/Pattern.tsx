import React from "react";
import {Box, Flex, Tooltip, useColorModeValue} from "@chakra-ui/react";
import {天干} from "@/qimen/type";
import {BehaviorType, QmPatternUtil} from "@/util/QmPatternUil";
import type {Density} from "@/types/displayTypes";
import {densityScale} from "@/types/displayTypes";

interface Props {
    panSize: number;
    g1: 天干;
    g2: 天干;
    density: Density;
}

export const Pattern = React.memo<Props>(({panSize, g1, g2, density}) => {
    const result = QmPatternUtil.pattern(g1, g2);
    const patternName = result?.[0] ?? `${g1}${g2}`;
    const type = result?.[1] ?? "平";
    const description = result?.[2] ?? ["無資料"];
    const neutralColor = useColorModeValue("gray.500", "gray.300");
    const scale = densityScale(density);

    return (
        <Tooltip
            hasArrow
            label={
                <Box whiteSpace="pre-line">
                    {description.join("\n")}
                </Box>
            }
            isDisabled={!description.length}
        >
            <Flex
                cursor="pointer"
                justifyContent="center"
                fontSize={`${(panSize / 36) * scale}px`}
                mx={`${(panSize / 600) * scale}px`}
                w={`${(panSize / 36) * scale}px`}
                color={color(type, neutralColor)}
            >
                {patternName}
            </Flex>
        </Tooltip>
    );
});

const color = (type: BehaviorType, neutralColor: string) => {
    switch (type) {
        case "吉":
            return "green.500";
        case "凶":
            return "black";
        default:
            return neutralColor;
    }
};
