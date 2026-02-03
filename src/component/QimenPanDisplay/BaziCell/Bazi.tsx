import React from "react";
import {八字, 地支, 天干} from "@/qimen/type";
import {Flex, Grid, GridItem, useColorModeValue} from "@chakra-ui/react";
import {ColorUtil} from "@/qimen/ColorUtil";
import type {ColorVariant, Density} from "@/types/displayTypes";
import {densityScale} from "@/types/displayTypes";

interface Props {
    bazi: 八字;
    panSize: number;
    colorVariant: ColorVariant;
    density: Density;
}

export const Bazi = React.memo<Props>(({panSize, bazi: [年柱, 月柱, 日柱, 時柱], colorVariant, density}) => {
    const scale = densityScale(density);
    const labelColor = useColorModeValue("gray.500", "gray.300");

    return (
        <Grid fontSize={(panSize / 25) * scale} templateColumns="repeat(4, 1fr)">
            <GridItem w={`${(panSize / 20) * scale}px`} display="flex" flexDirection="column" alignItems="center">
                <Flex color={labelColor} fontSize={(panSize / 40) * scale}>
                    時
                </Flex>
                <Flex color={ColorUtil.天干(時柱[0] as 天干, colorVariant)}>{時柱[0]}</Flex>
                <Flex color={ColorUtil.地支(時柱[1] as 地支, colorVariant)}>{時柱[1]}</Flex>
            </GridItem>
            <GridItem w={`${(panSize / 20) * scale}px`} display="flex" flexDirection="column" alignItems="center">
                <Flex color={labelColor} fontSize={(panSize / 40) * scale}>
                    日
                </Flex>
                <Flex color={ColorUtil.天干(日柱[0] as 天干, colorVariant)}>{日柱[0]}</Flex>
                <Flex color={ColorUtil.地支(日柱[1] as 地支, colorVariant)}>{日柱[1]}</Flex>
            </GridItem>
            <GridItem w={`${(panSize / 20) * scale}px`} display="flex" flexDirection="column" alignItems="center">
                <Flex color={labelColor} fontSize={(panSize / 40) * scale}>
                    月
                </Flex>
                <Flex color={ColorUtil.天干(月柱[0] as 天干, colorVariant)}>{月柱[0]}</Flex>
                <Flex color={ColorUtil.地支(月柱[1] as 地支, colorVariant)}>{月柱[1]}</Flex>
            </GridItem>
            <GridItem w={`${(panSize / 20) * scale}px`} display="flex" flexDirection="column" alignItems="center">
                <Flex color={labelColor} fontSize={(panSize / 40) * scale}>
                    年
                </Flex>
                <Flex color={ColorUtil.天干(年柱[0] as 天干, colorVariant)}>{年柱[0]}</Flex>
                <Flex color={ColorUtil.地支(年柱[1] as 地支, colorVariant)}>{年柱[1]}</Flex>
            </GridItem>
        </Grid>
    );
});
