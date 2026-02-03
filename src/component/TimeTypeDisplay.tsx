import React from "react";
import {Flex, useColorModeValue} from "@chakra-ui/react";
import {AstrologicalTimeUtil, TimeType} from "@/qimen/AstrologicalTimeUtil";
import {八字, 地支, 天干} from "@/qimen/type";
import type {Density} from "@/types/displayTypes";

interface Props {
    bazi: 八字;
    density: Density;
}

export const TimeTypeDisplay = React.memo<Props>(({bazi, density}) => {
    const type = AstrologicalTimeUtil.getType(bazi[2][0] as 天干, bazi[3][0] as 天干, bazi[3][1] as 地支);
    const isCompact = density === "compact";
    const fallbackText = useColorModeValue("gray.500", "gray.300");

    return (
        <Flex
            w="full"
            justifyContent="center"
            alignItems="center"
            bgColor={`${color(type)}.50` || "transparent"}
            opacity={type ? 1 : 0}
            transition="all 0.1s ease-in-out"
            transform={type ? "translateY(0px)" : "translateY(-50%)"}
            color={type ? `${color(type)}.500` : fallbackText}
            borderBottomColor={type ? `${color(type)}.200` : "transparent"}
            borderBottomWidth={type ? {base: 1, md: 2} : 0}
            borderBottomStyle="dashed"
            fontWeight="bold"
            fontSize={{base: isCompact ? "sm" : "md", md: isCompact ? "md" : "xl"}}
            p={{base: isCompact ? 0.5 : 1, md: isCompact ? 1 : 2}}
        >
            {type || <React.Fragment>&nbsp;</React.Fragment>}
        </Flex>
    );
});

const color = (type: TimeType) => {
    switch (type) {
        case "天顯時格":
            return "pink";
        case "五不遇時":
            return "gray";
        case "時干入墓":
            return "green";
        default:
            return null;
    }
};
