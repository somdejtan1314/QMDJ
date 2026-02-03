import React from "react";
import {Flex, IconButton, Input, Tooltip, useBreakpointValue, useColorModeValue} from "@chakra-ui/react";
import {ArrowBackIcon, ArrowForwardIcon, TimeIcon} from "@chakra-ui/icons";
import moment from "moment";
import {ScoreToggleButton} from "@/component/TopBar/ScoreToggleButton";
import {AngleDevilToggleButton} from "@/component/TopBar/AngleDevilToggleButton";
import {ZhiToggleButton} from "@/component/TopBar/ZhiToggleButton";
import {YinYangToggleButton} from "@/component/TopBar/YinYangToggleButton";
import {NeonToggleButton} from "@/component/TopBar/NeonToggleButton";
import type {遁} from "@/qimen/type";
import type {ColorVariant, Density} from "@/types/displayTypes";

interface Props {
    date: Date;
    setDate: (date: Date) => void;
    isScoreMode: boolean;
    setScoreMode: React.Dispatch<React.SetStateAction<boolean>>;
    showAngelDevil: boolean;
    setShowAngelDevil: React.Dispatch<React.SetStateAction<boolean>>;
    colorVariant: ColorVariant;
    setColorVariant: React.Dispatch<React.SetStateAction<ColorVariant>>;
    density: Density;
    setDensity: React.Dispatch<React.SetStateAction<Density>>;
    showZhiRing: boolean;
    setShowZhiRing: React.Dispatch<React.SetStateAction<boolean>>;
    dun: 遁;
    toggleDun: () => void;
}

export const TopBar = React.memo<Props>(
    ({
        date,
        setDate,
        isScoreMode,
        setScoreMode,
        showAngelDevil,
        setShowAngelDevil,
        colorVariant,
        setColorVariant,
        density,
        setDensity,
        showZhiRing,
        setShowZhiRing,
        dun,
        toggleDun,
    }) => {
        const isCompact = density === "compact";
        const buttonSize = useBreakpointValue({base: isCompact ? "sm" : "md", md: isCompact ? "md" : "lg"});
        const iconSize = useBreakpointValue({base: isCompact ? "md" : "lg", md: isCompact ? "xl" : "2xl"});
        const barBg = useColorModeValue("gray.300", "gray.800");
    const previousTwoHours = () => {
        setDate(new Date(date.getTime() - 120 * 60 * 1000));
    };

    const nextTwoHours = () => {
        setDate(new Date(date.getTime() + 120 * 60 * 1000));
    };

    const currentTime = () => {
        setDate(new Date());
    };

        return (
            <Flex flexDirection="column" w="full" p={{base: isCompact ? 1 : 2, md: isCompact ? 1 : 2}} bgColor={barBg} justifyContent="center" zIndex={10}>
                <Flex justifyContent="center" mb={isCompact ? 1 : 2}>
                    <IconButton _active={{transform: "scale(0.9)"}} size={buttonSize} aria-label="left" icon={<ArrowBackIcon fontSize={iconSize} />} mr={{base: 1, md: 2}} onClick={previousTwoHours} />
                    <Input
                        size={buttonSize}
                        fontSize={{base: isCompact ? "sm" : "md", md: isCompact ? "md" : "xl"}}
                        maxWidth={isCompact ? 320 : 400}
                        textAlign="center"
                        borderRadius="md"
                        variant="filled"
                        type="datetime-local"
                        placeholder="small size"
                        value={moment(date).format("YYYY-MM-DDTHH:mm")}
                        onChange={e => setDate(new Date(e.target.value))}
                        mr={{base: 1, md: 2}}
                    />
                    <Tooltip label="當前時間">
                        <IconButton _active={{transform: "rotate(180deg)"}} size={buttonSize} aria-label="current" icon={<TimeIcon fontSize={iconSize} />} onClick={currentTime} />
                    </Tooltip>
                    <IconButton _active={{transform: "scale(0.9)"}} size={buttonSize} aria-label="right" icon={<ArrowForwardIcon fontSize={iconSize} />} ml={{base: 1, md: 2}} onClick={nextTwoHours} />
                </Flex>
                <Flex justifyContent="center" flexWrap="wrap" gap={2}>
                    <ScoreToggleButton enabled={isScoreMode} setEnabled={setScoreMode} />
                    <AngleDevilToggleButton enabled={showAngelDevil} setEnabled={setShowAngelDevil} />
                    <ZhiToggleButton enabled={showZhiRing} setEnabled={setShowZhiRing} />
                    <YinYangToggleButton dun={dun} onToggle={toggleDun} />
                    <NeonToggleButton enabled={colorVariant === "neon"} setEnabled={setColorVariant} />
                </Flex>
            </Flex>
        );
    }
);
