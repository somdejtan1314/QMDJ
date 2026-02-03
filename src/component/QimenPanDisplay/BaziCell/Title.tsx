import React from "react";
import {QimenPan} from "@/qimen/type";
import {Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {QimenFormatUtil} from "@/qimen/FormatUtil";
import {ColorUtil} from "@/qimen/ColorUtil";
import type {ColorVariant, Density} from "@/types/displayTypes";
import {densityScale} from "@/types/displayTypes";

interface Props {
    pan: QimenPan;
    panSize: number;
    colorVariant: ColorVariant;
    density: Density;
}

export const Title = React.memo(({pan, panSize, colorVariant, density}: Props) => {
    const titleColor = useColorModeValue("gray.700", "gray.300");
    const scale = densityScale(density);

    return (
        <Flex flexDirection="column" alignItems="center">
            <Text color={titleColor} fontSize={`${(panSize / 40) * scale}px`}>
                {QimenFormatUtil.局名(pan.遁, pan.局數)}，值使：
                <Text as="span" color={ColorUtil.八門(pan.值使門, colorVariant)}>
                    {pan.值使門}
                </Text>
            </Text>
        </Flex>
    );
});
