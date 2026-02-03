import React from "react";
import {Text, Tooltip, useColorModeValue} from "@chakra-ui/react";
import {ColorUtil} from "@/qimen/ColorUtil";
import {九星} from "@/qimen/type";
import {ScoreModeUtil} from "@/util/ScoreModeUtil";
import type {ColorVariant, Density} from "@/types/displayTypes";
import {densityScale} from "@/types/displayTypes";

interface Props {
    panSize: number;
    isScoreMode: boolean;
    value: 九星;
    tooltip?: string;
    colorVariant: ColorVariant;
    density: Density;
}

export const Star = React.memo<Props>(({panSize, value, isScoreMode, tooltip, colorVariant, density}) => {
    const scale = densityScale(density);
    const neutralScore = useColorModeValue("gray.700", "gray.200");
    const scoreColor = (star: 九星) => {
        switch (ScoreModeUtil.starScore(star)) {
            case "吉":
                return "red.500";
            case "大凶":
                return "green.400";
            case "平":
                return neutralScore;
        }
    };

    return (
        <Text cursor="pointer" fontSize={`${(panSize / 20) * scale}px`} color={isScoreMode ? scoreColor(value) : ColorUtil.九星(value, colorVariant)} textShadow={colorVariant === "neon" ? "0 0 6px currentColor" : undefined}>
            <Tooltip hasArrow label={tooltip} aria-label={tooltip} isDisabled={!tooltip} shouldWrapChildren>
                <span>{value || "　"}</span>
            </Tooltip>
        </Text>
    );
});
