import React from "react";
import {Flex, GridItem, useColorModeValue} from "@chakra-ui/react";
import {Circle} from "./Circle";
import {QimenCell, 八神, 八門, 八字, 天干, 宮位} from "@/qimen/type";
import {Gan} from "./Gan";
import {God} from "./God";
import {Door} from "./Door";
import {Star} from "./Star";
import {Room} from "./Room";
import {FourDangerUtil} from "@/util/FourDangerUtil";
import {ScoreModeUtil} from "@/util/ScoreModeUtil";
import {TwelveCycleUtil} from "@/util/TwelveCycleUtil";
import {StrengthUtil} from "@/util/StrengthUtil";
import {Pattern} from "@/component/QimenPanDisplay/Cell/Pattern";
import type {ColorVariant, Density} from "@/types/displayTypes";
import {densityPadding, densityScale} from "@/types/displayTypes";

interface Props {
    cell: QimenCell;
    highlight?: boolean;
    panSize: number;
    isScoreMode: boolean;
    colorVariant: ColorVariant;
    density: Density;
    bazi: 八字;
}

export const Cell = React.memo<Props>(({isScoreMode, highlight, panSize, colorVariant, density, bazi, cell: {宮位, 九星, 八門, 八神, 天盤干, 地盤干, 是否空亡, 是否驛馬}}) => {
    const borderColor = useColorModeValue("gray.300", "gray.600");
    const highlightBg = useColorModeValue("yellow.100", "yellow.900");
    const scale = densityScale(density);
    const padding = densityPadding(density);
    const [yearPillar, monthPillar, dayPillar, hourPillar] = bazi;
    const ganBadges = (gan?: 天干) => {
        if (!gan) {
            return undefined;
        }
        const badges: string[] = [];
        if (yearPillar[0] === gan) {
            badges.push("年");
        }
        if (monthPillar[0] === gan) {
            badges.push("月");
        }
        if (dayPillar[0] === gan) {
            badges.push("日");
        }
        if (hourPillar[0] === gan) {
            badges.push("時");
        }
        return badges.length ? badges : undefined;
    };

    return (
        <GridItem
            p={padding}
            display="flex"
            fontWeight={500}
            justifyContent="space-evenly"
            borderWidth="1px"
            borderColor={borderColor}
            w="100%"
            h={panSize / 3}
            bgColor={highlight ? highlightBg : undefined}
            transition="300ms ease-in-out"
        >
            <Flex position="relative" width={`${(panSize / 18) * scale}px`} flexDirection="column" justifyContent="flex-end">
                <Flex position="absolute" top={0} left={0}>
                    {天盤干[1] && 地盤干[0] && <Pattern g1={天盤干[1]} g2={地盤干[0]} panSize={panSize} density={density} />}
                    {天盤干[0] && 地盤干[1] && <Pattern g1={天盤干[0]} g2={地盤干[1]} panSize={panSize} density={density} />}
                    <Pattern g1={天盤干[0]} g2={地盤干[0]} panSize={panSize} density={density} />
                </Flex>
                <Flex flexDirection="column">
                    <Gan tooltip={cycleOf(宮位, 天盤干[1])} isScoreMode={isScoreMode} panSize={panSize} value={天盤干[1]} colorVariant={colorVariant} density={density} badges={ganBadges(天盤干[1])} />
                    <Gan tooltip={cycleOf(宮位, 地盤干[1])} isScoreMode={isScoreMode} panSize={panSize} value={地盤干[1]} colorVariant={colorVariant} density={density} />
                </Flex>
            </Flex>
            <Flex flexGrow={1} flexDirection="column" alignItems="center" justifyContent="center" gap={density === "compact" ? 1 : 2} mt={density === "compact" ? 3 : 5}>
                <God isScoreMode={isScoreMode} panSize={panSize} value={八神} colorVariant={colorVariant} density={density} />
                <Door tooltip={StrengthUtil.doorStrength(八門, 宮位)} isScoreMode={isScoreMode} highlight={doorHighlight(宮位, 八門)} panSize={panSize} value={八門} colorVariant={colorVariant} density={density} />
                <Star tooltip={StrengthUtil.starStrength(九星, 宮位)} isScoreMode={isScoreMode} panSize={panSize} value={九星} colorVariant={colorVariant} density={density} />
                <Room panSize={panSize} value="" density={density} />
            </Flex>
            <Flex width={`${(panSize / 18) * scale}px`} flexDirection="column" justifyContent="space-between" alignItems="center">
                <Flex flexDirection="column">
                    {是否空亡 && (
                        <Circle panSize={panSize} density={density} colorVariant={colorVariant}>
                            空
                        </Circle>
                    )}
                    {是否驛馬 && (
                        <Circle panSize={panSize} density={density} colorVariant={colorVariant}>
                            馬
                        </Circle>
                    )}
                </Flex>
                <Flex flexDirection="column">
                    <Gan tooltip={cycleOf(宮位, 天盤干[0])} isScoreMode={isScoreMode} panSize={panSize} value={天盤干[0]} colorVariant={colorVariant} density={density} badges={ganBadges(天盤干[0])} />
                    <Gan tooltip={cycleOf(宮位, 地盤干[0])} isScoreMode={isScoreMode} panSize={panSize} value={地盤干[0]} colorVariant={colorVariant} density={density} />
                </Flex>
            </Flex>
        </GridItem>
    );
});

const cycleOf = (room: 宮位, gan?: 天干) => {
    if (!gan) {
        return undefined;
    }

    return TwelveCycleUtil.cellToZhi(room)
        .map(_ => TwelveCycleUtil.get(gan, _))
        .join(", ");
};

const godHighlight = () => {
    return false;
};

const doorHighlight = (cell: 宮位, door: 八門) => {
    return FourDangerUtil.isDoorAttackCell(cell, door);
};

const ganHighlight = () => {
    return undefined;
};
