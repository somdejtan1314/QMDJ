import React from "react";
import {八神} from "@/qimen/type";
import {Flex, useColorModeValue} from "@chakra-ui/react";
import {ColorUtil} from "@/qimen/ColorUtil";
import {ScoreModeUtil} from "@/util/ScoreModeUtil";
import type {ColorVariant, Density} from "@/types/displayTypes";
import {densityScale} from "@/types/displayTypes";

interface Props {
    panSize: number;
    value: 八神;
    isScoreMode: boolean;
    highlight?: boolean;
    colorVariant: ColorVariant;
    density: Density;
}

export const God = React.memo<Props>(({panSize, value, isScoreMode, highlight, colorVariant, density}) => {
    const scale = densityScale(density);
    const neutralScore = useColorModeValue("gray.700", "gray.200");
    const scoreColor = (god: 八神) => {
        switch (ScoreModeUtil.godScore(god)) {
            case "吉":
                return "red.500";
            case "大凶":
                return "green.400";
            case "平":
                return neutralScore;
        }
    };

    return (
        <Flex
            cursor="pointer"
            justifyContent="center"
            fontSize={`${(panSize / 20) * scale}px`}
            color={isScoreMode ? scoreColor(value) : ColorUtil.八神(value, colorVariant)}
            borderColor={highlight ? "teal.300" : undefined}
            borderWidth={highlight ? {base: 2, md: 4} : undefined}
            borderRadius={{base: "md", md: "xl"}}
            width={(panSize / 8) * scale}
            textShadow={colorVariant === "neon" ? "0 0 6px currentColor" : undefined}
        >
            {value || "　"}
        </Flex>
    );
});
