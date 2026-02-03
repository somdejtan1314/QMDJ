import {Flex, Tooltip, useColorModeValue} from "@chakra-ui/react";
import React from "react";
import {天干} from "@/qimen/type";
import {ColorUtil} from "@/qimen/ColorUtil";
import {ScoreModeUtil} from "@/util/ScoreModeUtil";
import type {ColorVariant, Density} from "@/types/displayTypes";
import {densityScale} from "@/types/displayTypes";

interface Props {
    value?: 天干;
    panSize: number;
    isScoreMode: boolean;
    tooltip?: string;
    highlight?: string;
    colorVariant: ColorVariant;
    density: Density;
    badges?: string[];
}

export const Gan = React.memo<Props>(({panSize, value, highlight, isScoreMode, tooltip, colorVariant, density, badges}) => {
    const scale = densityScale(density);
    const neutralScore = useColorModeValue("gray.700", "gray.200");
    const scoreColor = (gan: 天干) => {
        switch (ScoreModeUtil.ganScore(gan)) {
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
            width={`${(panSize / 16) * scale}px`}
            borderRadius={{base: "md", md: "xl"}}
            borderColor={highlight}
            borderWidth={highlight ? {base: 2, md: 4} : undefined}
            alignItems="center"
            justifyContent="center"
            fontSize={`${(panSize / 25) * scale}px`}
            color={isScoreMode && value ? scoreColor(value) : value ? ColorUtil.天干(value, colorVariant) : undefined}
            textShadow={colorVariant === "neon" ? "0 0 6px currentColor" : undefined}
            position="relative"
        >
            <Tooltip hasArrow label={tooltip} aria-label={tooltip} isDisabled={!tooltip} shouldWrapChildren>
                <span>{value || "　"}</span>
            </Tooltip>
            {badges?.length ? (
                <Flex
                    position="absolute"
                    bottom="100%"
                    left="50%"
                    transform="translateX(-50%)"
                    flexDirection="column-reverse"
                    alignItems="center"
                    gap={0.5}
                    mb={1}
                >
                    {badges.map(badge => (
                        <Flex
                            key={badge}
                            bg="purple.500"
                            color="white"
                            borderRadius="full"
                            px={2}
                            py={0.5}
                            fontSize="12px"
                            lineHeight="1"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {badge}
                        </Flex>
                    ))}
                </Flex>
            ) : null}
        </Flex>
    );
});
