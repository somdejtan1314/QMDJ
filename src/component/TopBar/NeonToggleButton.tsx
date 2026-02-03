import React from "react";
import {Button, Text, useBreakpointValue} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
import type {ColorVariant} from "@/types/displayTypes";

interface Props {
    enabled: boolean;
    setEnabled: React.Dispatch<React.SetStateAction<ColorVariant>>;
}

export const NeonToggleButton = React.memo<Props>(({enabled, setEnabled}) => {
    const smallButtonSize = useBreakpointValue({base: "sm", md: "md"});
    const iconSize = useBreakpointValue({base: "lg", md: "2xl"});

    return (
        <Button
            bgColor={enabled ? "purple.500" : "gray.100"}
            color={enabled ? "yellow.300" : "gray.700"}
            _focus={{}}
            _hover={{}}
            _active={{transform: "scale(0.9)"}}
            size={smallButtonSize}
            w="93px"
            h="36px"
            aria-label="current"
            onClick={() => setEnabled(current => (current === "neon" ? "simple" : "neon"))}
            mx={{base: 0.5, md: 1}}
        >
            <StarIcon fontSize={iconSize} />
            <Text ml={1}>霓虹色</Text>
        </Button>
    );
});
