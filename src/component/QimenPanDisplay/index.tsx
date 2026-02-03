import React from "react";
import {Grid} from "@chakra-ui/react";
import {Cell} from "@/component/QimenPanDisplay/Cell";
import {QimenPan} from "@/qimen/type";
import {BaziCell} from "@/component/QimenPanDisplay/BaziCell";
import {LuckyCellUtil} from "@/util/LuckyCellUtil";
import type {ColorVariant, Density} from "@/types/displayTypes";

interface Props {
    pan: QimenPan;
    size: number;
    isScoreMode: boolean;
    colorVariant: ColorVariant;
    density: Density;
}

export const QimenPanDisplay = React.memo<Props>(({size, pan, isScoreMode, colorVariant, density}) => {
    return (
        <Grid zIndex={1} width={size} height={size} templateColumns="repeat(3, 1fr)">
            <Cell isScoreMode={isScoreMode} highlight={LuckyCellUtil.isLucky(pan.九宮[3])} cell={pan.九宮[3]} panSize={size} colorVariant={colorVariant} density={density} bazi={pan.八字} />
            <Cell isScoreMode={isScoreMode} highlight={LuckyCellUtil.isLucky(pan.九宮[8])} cell={pan.九宮[8]} panSize={size} colorVariant={colorVariant} density={density} bazi={pan.八字} />
            <Cell isScoreMode={isScoreMode} highlight={LuckyCellUtil.isLucky(pan.九宮[1])} cell={pan.九宮[1]} panSize={size} colorVariant={colorVariant} density={density} bazi={pan.八字} />
            <Cell isScoreMode={isScoreMode} highlight={LuckyCellUtil.isLucky(pan.九宮[2])} cell={pan.九宮[2]} panSize={size} colorVariant={colorVariant} density={density} bazi={pan.八字} />
            <BaziCell pan={pan} panSize={size} colorVariant={colorVariant} density={density} />
            <Cell isScoreMode={isScoreMode} highlight={LuckyCellUtil.isLucky(pan.九宮[6])} cell={pan.九宮[6]} panSize={size} colorVariant={colorVariant} density={density} bazi={pan.八字} />
            <Cell isScoreMode={isScoreMode} highlight={LuckyCellUtil.isLucky(pan.九宮[7])} cell={pan.九宮[7]} panSize={size} colorVariant={colorVariant} density={density} bazi={pan.八字} />
            <Cell isScoreMode={isScoreMode} highlight={LuckyCellUtil.isLucky(pan.九宮[0])} cell={pan.九宮[0]} panSize={size} colorVariant={colorVariant} density={density} bazi={pan.八字} />
            <Cell isScoreMode={isScoreMode} highlight={LuckyCellUtil.isLucky(pan.九宮[5])} cell={pan.九宮[5]} panSize={size} colorVariant={colorVariant} density={density} bazi={pan.八字} />
        </Grid>
    );
});
