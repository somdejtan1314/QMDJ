import React from "react";
import {Flex, useColorModeValue} from "@chakra-ui/react";
import {AngelDevilUtil, 神煞} from "@/util/AngelDevilUtil";
import type {ColorVariant} from "@/types/displayTypes";

interface Props {
    items: (神煞 | "貴人")[];
    colorVariant: ColorVariant;
}

export const GodDevilRenderer = React.memo<Props>(({items, colorVariant}) => {
    const angelBg = useColorModeValue(colorVariant === "neon" ? "pink.400" : "red.400", "pink.500");
    const devilBg = useColorModeValue(colorVariant === "neon" ? "blue.400" : "gray.500", "gray.600");

    return (
        <React.Fragment>
            {items.map((item, index) => (
                <Flex
                    py={0}
                    px={0.5}
                    fontSize={{base: "xs", sm: "xs", md: "sm", lg: "md"}}
                    m={0.5}
                    key={index}
                    bgColor={AngelDevilUtil.isAngel(item as 神煞) ? angelBg : devilBg}
                    color="white"
                    borderRadius={{base: "sm", md: "md"}}
                    textShadow={colorVariant === "neon" ? "0 0 6px rgba(255,255,255,0.5)" : undefined}
                >
                    {item}
                </Flex>
            ))}
        </React.Fragment>
    );
});
