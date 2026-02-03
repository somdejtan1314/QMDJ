import React from "react";
import {Flex, Tooltip, useColorModeValue} from "@chakra-ui/react";
import {八門} from "@/qimen/type";
import {ColorUtil} from "@/qimen/ColorUtil";
import {ScoreModeUtil} from "@/util/ScoreModeUtil";
import type {ColorVariant, Density} from "@/types/displayTypes";
import {densityScale} from "@/types/displayTypes";

interface Props {
    panSize: number;
    value: 八門;
    isScoreMode: boolean;
    highlight?: boolean;
    tooltip?: string;
    colorVariant: ColorVariant;
    density: Density;
}

export const Door = React.memo<Props>(({panSize, value, isScoreMode, highlight, tooltip, colorVariant, density}) => {
    const scale = densityScale(density);
    const neutralScore = useColorModeValue("gray.700", "gray.200");
    const scoreColor = (door: 八門) => {
        switch (ScoreModeUtil.doorScore(door)) {
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
            color={isScoreMode ? scoreColor(value) : ColorUtil.八門(value, colorVariant)}
            borderColor={highlight ? "pink.300" : undefined}
            borderWidth={highlight ? {base: 2, md: 4} : undefined}
            borderRadius={{base: "md", md: "xl"}}
            width={(panSize / 8) * scale}
            textShadow={colorVariant === "neon" ? "0 0 6px currentColor" : undefined}
        >
            <Tooltip hasArrow label={tooltip} aria-label={tooltip} isDisabled={!tooltip} shouldWrapChildren>
                <span>{value || "　"}</span>
            </Tooltip>
        </Flex>
    );
});
