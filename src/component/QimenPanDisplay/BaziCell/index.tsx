import React from "react";
import {GridItem, useColorModeValue} from "@chakra-ui/react";
import {QimenPan} from "@/qimen/type";
import {Bazi} from "./Bazi";
import {Time} from "./Time";
import {Title} from "./Title";
import type {ColorVariant, Density} from "@/types/displayTypes";
import {densityPadding} from "@/types/displayTypes";

interface Props {
    pan: QimenPan;
    panSize: number;
    colorVariant: ColorVariant;
    density: Density;
}

export const BaziCell = React.memo<Props>(({pan, panSize, colorVariant, density}) => {
    const borderColor = useColorModeValue("gray.300", "gray.600");
    const padding = densityPadding(density);

    return (
        <GridItem fontWeight={500} p={padding} display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" borderWidth="1px" borderColor={borderColor} w="100%" h={panSize / 3}>
            <Time panSize={panSize} lunar={pan.lunar} density={density} />
            <Bazi panSize={panSize} bazi={pan.八字} colorVariant={colorVariant} density={density} />
            <Title pan={pan} panSize={panSize} colorVariant={colorVariant} density={density} />
        </GridItem>
    );
});
