import React from "react";
import {Button, Text, useBreakpointValue} from "@chakra-ui/react";
import {CheckCircleIcon} from "@chakra-ui/icons";

interface Props {
    enabled: boolean;
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const JiToggleButton = React.memo<Props>(({enabled, setEnabled}) => {
    const smallButtonSize = useBreakpointValue({base: "sm", md: "md"});
    const iconSize = useBreakpointValue({base: "lg", md: "2xl"});

    return (
        <Button
            bgColor={enabled ? "blue.500" : "gray.100"}
            color={enabled ? "yellow.400" : "gray.700"}
            _focus={{}}
            _hover={{}}
            _active={{transform: "scale(0.9)"}}
            size={smallButtonSize}
            w="138px"
            h="36px"
            aria-label="current"
            onClick={() => setEnabled(current => !current)}
            mx={{base: 0.5, md: 1}}
        >
            <CheckCircleIcon fontSize={iconSize} />
            <Text ml={1}>奇门二十八吉</Text>
        </Button>
    );
});
