import React from "react";
import {Button, Text, useBreakpointValue} from "@chakra-ui/react";
import {RepeatIcon} from "@chakra-ui/icons";
import type {遁} from "@/qimen/type";

interface Props {
    dun: 遁;
    onToggle: () => void;
}

export const YinYangToggleButton = React.memo<Props>(({dun, onToggle}) => {
    const smallButtonSize = useBreakpointValue({base: "sm", md: "md"});
    const iconSize = useBreakpointValue({base: "lg", md: "2xl"});
    const isYang = dun === "陽遁";

    return (
        <Button
            bgColor={isYang ? "white.400" : "black"}
            _hover={{bgColor: isYang ? "white.400" : "black"}}
            _active={{transform: "scale(0.9)", bgColor: isYang ? "white.400" : "black"}}
            color={isYang ? "gray.900" : "white"}
            _focus={{}}
            size={smallButtonSize}
            w="93px"
            h="36px"
            aria-label="current"
            onClick={onToggle}
            mx={{base: 0.5, md: 1}}
        >
            <RepeatIcon fontSize={iconSize} />
            <Text ml={1}>{isYang ? "陽局" : "陰局"}</Text>
        </Button>
    );
});
