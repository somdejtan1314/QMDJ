import React from "react";
import {QimenUtil} from "./qimen/QimenUtil";
import {Lunar} from "lunar-typescript";
import {Box, ChakraProvider, Flex, Grid, Select, Text, extendTheme, useBreakpointValue, useColorModeValue} from "@chakra-ui/react";
import {QimenPanDisplay} from "@/component/QimenPanDisplay";
import {useKeyboardArrow} from "@/hook/useKeyboardArrow";
import {TwelveDisplay} from "src/component/TwelveDisplay";
import {AngelDevilUtil} from "@/util/AngelDevilUtil";
import {AstrologicalTimeUtil} from "@/qimen/AstrologicalTimeUtil";
import {八字, 八門, 九星, 地支, 天干, 宮位, 八神, 五行, 遁} from "@/qimen/type";
import {GodDevilRenderer} from "@/component/GodDevilRenderer";
import {TopBar} from "@/component/TopBar";
import {TimeTypeDisplay} from "@/component/TimeTypeDisplay";
import {useScreenWidth} from "@/hook/useScreenWidth";
import moment from "moment";
import type {ColorVariant, Density} from "@/types/displayTypes";
import {ColorUtil} from "@/qimen/ColorUtil";
import {FourDangerUtil} from "@/util/FourDangerUtil";
import {StrengthUtil} from "@/util/StrengthUtil";
import {BehaviorType, QmPatternUtil, qmPatternMap} from "@/util/QmPatternUil";

export const App = React.memo(() => {
    const [date, setDate] = React.useState(new Date());
    const [isScoreMode, setScoreMode] = React.useState(false);
    const [showAngelDevil, setShowAngelDevil] = React.useState(false);
    const [colorVariant, setColorVariant] = React.useState<ColorVariant>("simple");
    const [density] = React.useState<Density>("comfortable");
    const [showZhiRing, setShowZhiRing] = React.useState(false);
    const [showJiPanel, setShowJiPanel] = React.useState(true);
    const [dunOverride, setDunOverride] = React.useState<遁 | null>("陰遁");
    const [ref, screenWidth] = useScreenWidth(800);
    const qimenPan = QimenUtil.create(Lunar.fromDate(date), dunOverride ?? undefined);
    const pageBg = useColorModeValue("white", "gray.900");
    const pageColor = useColorModeValue("gray.900", "gray.100");
    const panSize = screenWidth * 0.9;

    const changeDate = (value: Date) => {
        if (moment(value).isValid()) {
            setDate(value);
        }
    };

    useKeyboardArrow(setDate);

    return (
        <ChakraProvider theme={theme}>
            <Flex ref={ref} flexDirection="column" h="100%" justifyContent="space-between" alignItems="center" bg={pageBg} color={pageColor}>
                <TopBar
                    showAngelDevil={showAngelDevil}
                    setShowAngelDevil={setShowAngelDevil}
                    setScoreMode={setScoreMode}
                    isScoreMode={isScoreMode}
                    date={date}
                    setDate={changeDate}
                    colorVariant={colorVariant}
                    setColorVariant={setColorVariant}
                    density={density}
                    showZhiRing={showZhiRing}
                    setShowZhiRing={setShowZhiRing}
                    showJiPanel={showJiPanel}
                    setShowJiPanel={setShowJiPanel}
                    dun={qimenPan.遁}
                    toggleDun={() =>
                        setDunOverride(current => ((current ?? qimenPan.遁) === "陽遁" ? "陰遁" : "陽遁"))
                    }
                />
                <TimeTypeDisplay bazi={qimenPan.八字} density={density} />
                <Flex flexGrow={1} justifyContent="center" alignItems="center" position="relative" w="full">
                    <Flex flexDirection="column" alignItems="center" mt="20px" mb="20px">
                        <Box position="relative" width={`${panSize}px`} height={`${panSize}px`}>
                        {showZhiRing && (
                            <TwelveDisplay
                                renderer={items => <ZhiRenderer items={items} colorVariant={colorVariant} bazi={qimenPan.八字} />}
                                itemsMap={buildZhiMap()}
                                size={panSize}
                                ringScale={1.155}
                                offsetScale={0.025}
                                zIndex={1}
                            />
                        )}
                        {showAngelDevil && (
                            <TwelveDisplay
                                renderer={items => <GodDevilRenderer items={items} colorVariant={colorVariant} />}
                                itemsMap={AngelDevilUtil.getAngelDevilMap(qimenPan.八字[3][0] as 天干, qimenPan.八字[3][1] as 地支)}
                                size={panSize}
                                ringScale={1.275}
                                offsetScale={0.14}
                                leftOffset={-5}
                                rightOffset={0}
                                rightShiftSlots={[0, 1, 2]}
                                rightShiftPx={0}
                                translateY={0}
                                zIndex={2}
                            />
                        )}
                        <QimenPanDisplay isScoreMode={isScoreMode} pan={qimenPan} size={panSize} colorVariant={colorVariant} density={density} />
                        </Box>
                        {showJiPanel && <PillBox pan={qimenPan} maxWidth={panSize} mt={10} date={date} dunOverride={dunOverride} />}
                    </Flex>
                </Flex>
            </Flex>
        </ChakraProvider>
    );
});

const theme = extendTheme({
    config: {
        initialColorMode: "light",
        useSystemColorMode: false,
    },
});

const zhiOrder: 地支[] = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const doorHomePalace: Record<八門, 宮位> = {
    休門: "坎一宮",
    生門: "艮八宮",
    傷門: "震三宮",
    杜門: "巽四宮",
    景門: "離九宮",
    死門: "坤二宮",
    驚門: "兌七宮",
    開門: "乾六宮",
};

const starHomePalace: Record<九星, 宮位> = {
    天蓬: "坎一宮",
    天任: "艮八宮",
    天冲: "震三宮",
    天輔: "巽四宮",
    天英: "離九宮",
    天芮: "坤二宮",
    天柱: "兌七宮",
    天心: "乾六宮",
    天禽: "中五宮",
};

const doorFanPalace: Record<八門, 宮位> = {
    開門: "巽四宮",
    休門: "離九宮",
    生門: "坤二宮",
    傷門: "兌七宮",
    杜門: "乾六宮",
    景門: "坎一宮",
    死門: "艮八宮",
    驚門: "震三宮",
};

const starFanPalace: Record<九星, 宮位> = {
    天心: "巽四宮",
    天蓬: "離九宮",
    天任: "坤二宮",
    天冲: "兌七宮",
    天輔: "乾六宮",
    天英: "坎一宮",
    天芮: "艮八宮",
    天柱: "震三宮",
    天禽: "中五宮",
};

const zhiYearPairs: Record<地支, [number, number]> = {
    巳: [2013, 2001],
    午: [2014, 2002],
    未: [2015, 2003],
    辰: [2012, 2000],
    卯: [2011, 1999],
    寅: [2010, 1998],
    申: [2016, 2004],
    酉: [2017, 2005],
    戌: [2018, 2006],
    丑: [2009, 1997],
    子: [2008, 1996],
    亥: [2007, 1995],
};

const buildZhiMap = (): Record<地支, string[]> => {
    return zhiOrder.reduce((acc, zhi) => {
        acc[zhi] = [zhi];
        return acc;
    }, {} as Record<地支, string[]>);
};

const ZhiRenderer = ({items, colorVariant, bazi}: {items: string[]; colorVariant: ColorVariant; bazi: 八字}) => {
    const zhi = items[0] as 地支;
    const years = zhiYearPairs[zhi];
    const stackedYearZhi = new Set<地支>(["寅", "卯", "辰", "申", "酉", "戌"]);
    const badgeFontSize = useBreakpointValue({base: 10, sm: "sm", md: "md", lg: "xl"});
    const [yearPillar, monthPillar, dayPillar, hourPillar] = bazi;
    const zhiBadges = () => {
        const badges: string[] = [];
        if (yearPillar[1] === zhi) {
            badges.push("年");
        }
        if (monthPillar[1] === zhi) {
            badges.push("月");
        }
        if (dayPillar[1] === zhi) {
            badges.push("日");
        }
        if (hourPillar[1] === zhi) {
            badges.push("時");
        }
        return badges;
    };
    const badges = zhiBadges();

    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            lineHeight="1"
            color={ColorUtil.地支(zhi, colorVariant)}
            textShadow={colorVariant === "neon" ? "0 0 6px currentColor" : undefined}
            position="relative"
        >
            <Text fontSize="sm" fontWeight="bold">
                {items[0]}
            </Text>
            {years && (
                <Flex flexDirection="column" alignItems="center" fontSize={badgeFontSize} lineHeight="1">
                    {stackedYearZhi.has(zhi) ? (
                        <>
                            <Text>{years[0]}</Text>
                            <Text>{years[1]}</Text>
                        </>
                    ) : (
                        <Text>{years.join(", ")}</Text>
                    )}
                </Flex>
            )}
            {badges.length ? (
                <Flex
                    position="absolute"
                    top="2px"
                    left="50%"
                    transform="translateX(-50%)"
                    flexDirection="column-reverse"
                    alignItems="center"
                    gap={0.5}
                >
                    {badges.map(badge => (
                        <Flex
                            key={badge}
                            bg="purple.500"
                            color="white"
                            borderRadius="full"
                            px={2}
                            py={0.5}
                            fontSize="12px"
                            lineHeight="1"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {badge}
                        </Flex>
                    ))}
                </Flex>
            ) : null}
        </Flex>
    );
};

const PillBox = ({
    pan,
    maxWidth,
    mt = 0,
    date,
    dunOverride,
}: {
    pan: ReturnType<typeof QimenUtil.create>;
    maxWidth?: number;
    mt?: number;
    date: Date;
    dunOverride: 遁 | null;
}) => {
    const borderColor = useColorModeValue("gray.300", "gray.600");
    const bgColor = useColorModeValue("pink.100", "pink.900");
    const textColor = useColorModeValue("gray.800", "gray.100");
    const activeBg = useColorModeValue("pink.200", "pink.700");
    const [selectedFormation, setSelectedFormation] = React.useState("");
    const [selectedJiuDun, setSelectedJiuDun] = React.useState<"天遁" | "地遁" | "人遁" | "神遁" | "鬼遁" | "风遁" | "云遁" | "龙遁" | "虎遁" | "">("");
    const [stepSize, setStepSize] = React.useState<"two-hour" | "day">("two-hour");
    const [timeStepSize, setTimeStepSize] = React.useState<"two-hour" | "day">("two-hour");
    const [timeTypeFilter, setTimeTypeFilter] = React.useState<"" | "五不遇时" | "天显时格" | "时干入墓">("");

    const cells = pan.九宮;
    const hasKongWang = cells.some(cell => cell.是否空亡);
    const hasMenPo = cells.some(cell => cell.八門 && FourDangerUtil.isDoorAttackCell(cell.宮位, cell.八門));
    const hasRuMu =
        cells.some(cell => cell.八門 && StrengthUtil.doorStrength(cell.八門, cell.宮位) === "入墓") ||
        cells.some(cell => cell.天盤干.some(gan => gan && FourDangerUtil.isInGrave(cell.宮位, gan)) || cell.地盤干.some(gan => gan && FourDangerUtil.isInGrave(cell.宮位, gan)));
    const hasJiXing = cells.some(cell => cell.天盤干.some(gan => gan && FourDangerUtil.isInJail(cell.宮位, gan)) || cell.地盤干.some(gan => gan && FourDangerUtil.isInJail(cell.宮位, gan)));
    const hasMenFu = cells.some(cell => cell.八門 && doorHomePalace[cell.八門] === cell.宮位);
    const hasStarFu = cells.some(cell => cell.九星 && starHomePalace[cell.九星] === cell.宮位);
    const hasGanFu = cells.some(cell => cell.天盤干.some(gan => gan && cell.地盤干.includes(gan)));
    const hasMenFan = cells.some(cell => cell.八門 && doorFanPalace[cell.八門] === cell.宮位);
    const hasStarFan = cells.some(cell => cell.九星 && starFanPalace[cell.九星] === cell.宮位);
    const yangFanPairs: [天干, 天干][] = [
        ["甲", "戊"],
        ["戊", "壬"],
        ["壬", "丙"],
        ["丙", "庚"],
        ["庚", "甲"],
    ];
    const yinFanPairs: [天干, 天干][] = [
        ["乙", "己"],
        ["己", "癸"],
        ["癸", "丁"],
        ["丁", "辛"],
        ["辛", "乙"],
    ];
    const isGanFanPair = (a: 天干, b: 天干) =>
        yangFanPairs.some(([from, to]) => from === a && to === b) || yinFanPairs.some(([from, to]) => from === a && to === b);
    const hasGanFan = cells.some(cell =>
        cell.天盤干.some(gan => gan && cell.地盤干.some(di => di && isGanFanPair(gan, di)))
    );

    const items: {label: string; active: boolean}[] = [
        {label: "擊刑", active: hasJiXing},
        {label: "門迫", active: hasMenPo},
        {label: "入墓", active: hasRuMu},
        {label: "空亡", active: hasKongWang},
        {label: "干伏", active: hasGanFu},
        {label: "門伏", active: hasMenFu},
        {label: "星伏", active: hasStarFu},
        {label: "干反", active: hasGanFan},
        {label: "門反", active: hasMenFan},
        {label: "星反", active: hasStarFan},
    ];
    const palaceShort = (palace: 宮位) => {
        switch (palace) {
            case "坎一宮":
                return "坎";
            case "坤二宮":
                return "坤";
            case "震三宮":
                return "震";
            case "巽四宮":
                return "巽";
            case "中五宮":
                return "中";
            case "乾六宮":
                return "乾";
            case "兌七宮":
                return "兌";
            case "艮八宮":
                return "艮";
            case "離九宮":
                return "離";
        }
    };
    const palaceDirection = (palace: 宮位) => {
        switch (palace) {
            case "坎一宮":
                return "北";
            case "坤二宮":
                return "西南";
            case "震三宮":
                return "东";
            case "巽四宮":
                return "东南";
            case "中五宮":
                return "中";
            case "乾六宮":
                return "西北";
            case "兌七宮":
                return "西";
            case "艮八宮":
                return "东北";
            case "離九宮":
                return "南";
        }
    };
    const palaceDisplay = (palace: 宮位) => {
        switch (palace) {
            case "坎一宮":
                return "坎宫";
            case "坤二宮":
                return "坤宫";
            case "震三宮":
                return "震宫";
            case "巽四宮":
                return "巽宫";
            case "中五宮":
                return "中宫";
            case "乾六宮":
                return "乾宫";
            case "兌七宮":
                return "兑宫";
            case "艮八宮":
                return "艮宫";
            case "離九宮":
                return "离宫";
        }
    };
    const formatDate = (value: Date) => `${value.getDate()}日 ${value.getMonth() + 1}月 ${value.getFullYear()}年`;
    const formatDateTime = (value: Date) =>
        `${formatDate(value)} ${value.getHours().toString().padStart(2, "0")}:${value.getMinutes().toString().padStart(2, "0")}`;
    const kongPalaces = cells
        .filter(cell => cell.是否空亡)
        .map(cell => palaceShort(cell.宮位))
        .filter(Boolean) as string[];
    const menPoPalaces = cells
        .filter(cell => cell.八門 && FourDangerUtil.isDoorAttackCell(cell.宮位, cell.八門))
        .map(cell => palaceShort(cell.宮位))
        .filter(Boolean) as string[];
    const ruMuPalaces = cells
        .filter(
            cell =>
                (cell.八門 && StrengthUtil.doorStrength(cell.八門, cell.宮位) === "入墓") ||
                cell.天盤干.some(gan => gan && FourDangerUtil.isInGrave(cell.宮位, gan)) ||
                cell.地盤干.some(gan => gan && FourDangerUtil.isInGrave(cell.宮位, gan))
        )
        .map(cell => palaceShort(cell.宮位))
        .filter(Boolean) as string[];
    const godElement = (god: 八神): 五行 => {
        if (pan.遁 === "陽遁") {
            switch (god) {
                case "值符":
                    return "火";
                case "騰蛇":
                    return "土";
                case "太陰":
                    return "金";
                case "六合":
                    return "木";
                case "白虎":
                    return "土";
                case "玄武":
                    return "火";
                case "九地":
                    return "土";
                case "九天":
                    return "金";
            }
        }

        switch (god) {
            case "值符":
                return "火";
            case "騰蛇":
                return "土";
            case "太陰":
                return "金";
            case "六合":
                return "木";
            case "白虎":
                return "金";
            case "玄武":
                return "水";
            case "九地":
                return "土";
            case "九天":
                return "金";
        }
    };
    const godGravePalaces: Record<五行, 宮位[]> = {
        木: ["坤二宮"],
        火: ["乾六宮"],
        金: ["艮八宮"],
        水: ["巽四宮"],
        土: ["坤二宮", "乾六宮", "艮八宮", "巽四宮"],
    };
    const ruMuGods = Array.from(
        new Set(
            cells
                .filter(cell => cell.八神 && godGravePalaces[godElement(cell.八神)]?.includes(cell.宮位))
                .map(cell => cell.八神)
        )
    );
    const jiXingPalaces = cells
        .filter(
            cell =>
                cell.天盤干.some(gan => gan && FourDangerUtil.isInJail(cell.宮位, gan)) ||
                cell.地盤干.some(gan => gan && FourDangerUtil.isInJail(cell.宮位, gan))
        )
        .map(cell => palaceShort(cell.宮位))
        .filter(Boolean) as string[];
    const hasGan = (cell: (typeof cells)[number], gan: 天干) =>
        cell.天盤干.some(value => value === gan) || cell.地盤干.some(value => value === gan);
    const hasGanIn = (list: (天干 | undefined)[], gan: 天干) => list.some(value => value === gan);
    const isThreeLuckyDoor = (door?: 八門) => door === "休門" || door === "生門" || door === "開門";
    const findJiuDunPalaces = (cellsToCheck: typeof cells, dun: typeof selectedJiuDun) => {
        if (!dun) {
            return [] as 宮位[];
        }
        return cellsToCheck
            .filter(cell => {
                switch (dun) {
                    case "天遁":
                        return cell.八門 === "生門" && (hasGan(cell, "丙") || hasGan(cell, "丁"));
                    case "地遁":
                        return cell.八門 === "開門" && (hasGan(cell, "乙") || hasGan(cell, "己"));
                    case "人遁":
                        return cell.八門 === "休門" && hasGan(cell, "丁") && cell.八神 === "太陰";
                    case "神遁":
                        return cell.八門 === "生門" && hasGan(cell, "丙") && cell.八神 === "九天";
                    case "鬼遁":
                        return cell.八門 === "杜門" && hasGan(cell, "丁") && cell.八神 === "九地";
                    case "风遁":
                        return (
                            isThreeLuckyDoor(cell.八門) &&
                            cell.宮位 === "巽四宮" &&
                            hasGanIn(cell.天盤干, "乙") &&
                            hasGanIn(cell.地盤干, "丁")
                        );
                    case "云遁":
                        return isThreeLuckyDoor(cell.八門) && hasGan(cell, "乙") && hasGan(cell, "辛");
                    case "龙遁":
                        return cell.八門 === "休門" && cell.宮位 === "坎一宮" && hasGan(cell, "乙");
                    case "虎遁":
                        return cell.八門 === "休門" && cell.宮位 === "艮八宮" && hasGan(cell, "乙") && hasGan(cell, "辛");
                }
            })
            .map(cell => cell.宮位);
    };
    const findFormationPalaces = (cellsToCheck: typeof cells, formationName: string) => {
        const matches = new Set<宮位>();
        cellsToCheck.forEach(cell => {
            const combos: [天干 | undefined, 天干 | undefined][] = [
                [cell.天盤干[1], cell.地盤干[0]],
                [cell.天盤干[0], cell.地盤干[1]],
                [cell.天盤干[0], cell.地盤干[0]],
            ];
            combos.forEach(([g1, g2]) => {
                if (!g1 || !g2) {
                    return;
                }
                const result = QmPatternUtil.pattern(g1, g2);
                if (!result) {
                    return;
                }
                const [name, type] = result;
                if (type === "吉" && name === formationName) {
                    matches.add(cell.宮位);
                }
            });
        });
        return Array.from(matches);
    };
    const patternEntries = React.useMemo(() => {
        const entries: {name: string; type: BehaviorType; palace: 宮位}[] = [];
        cells.forEach(cell => {
            const combos: [天干 | undefined, 天干 | undefined][] = [
                [cell.天盤干[1], cell.地盤干[0]],
                [cell.天盤干[0], cell.地盤干[1]],
                [cell.天盤干[0], cell.地盤干[0]],
            ];
            combos.forEach(([g1, g2]) => {
                if (!g1 || !g2) {
                    return;
                }
                const result = QmPatternUtil.pattern(g1, g2);
                if (!result) {
                    return;
                }
                const [name, type] = result;
                entries.push({name, type, palace: cell.宮位});
            });
        });
        return entries;
    }, [cells]);
    const goodFormationOptions = React.useMemo(() => {
        return Array.from(new Set(Object.values(qmPatternMap).filter(([, type]) => type === "吉").map(([name]) => name))).sort((a, b) =>
            a.localeCompare(b, "zh-Hans")
        );
    }, []);
    const selectedPalaces = React.useMemo(() => {
        return Array.from(
            new Set(patternEntries.filter(entry => entry.type === "吉" && entry.name === selectedFormation).map(entry => entry.palace))
        );
    }, [patternEntries, selectedFormation]);
    const futureMatches = React.useMemo(() => {
        if (!selectedFormation) {
            return [] as {date: Date; palace: 宮位}[];
        }
        const matches: {date: Date; palace: 宮位}[] = [];
        const start = moment(date);
        const end = moment(date).add(1, "year");
        const step = stepSize === "two-hour" ? {value: 2, unit: "hours" as const} : {value: 1, unit: "days" as const};
        let cursor = start.clone();
        while (cursor.isSameOrBefore(end)) {
            const pan = QimenUtil.create(Lunar.fromDate(cursor.toDate()), dunOverride ?? undefined);
            const palaces = findFormationPalaces(pan.九宮, selectedFormation);
            palaces.forEach(palace => {
                matches.push({date: cursor.toDate(), palace});
            });
            cursor = cursor.add(step.value, step.unit);
        }
        return matches;
    }, [date, selectedFormation, stepSize, dunOverride]);
    const futureJiuDunMatches = React.useMemo(() => {
        if (!selectedJiuDun) {
            return [] as {date: Date; palace: 宮位}[];
        }
        const matches: {date: Date; palace: 宮位}[] = [];
        const start = moment(date);
        const end = moment(date).add(1, "year");
        const step = stepSize === "two-hour" ? {value: 2, unit: "hours" as const} : {value: 1, unit: "days" as const};
        let cursor = start.clone();
        while (cursor.isSameOrBefore(end)) {
            const pan = QimenUtil.create(Lunar.fromDate(cursor.toDate()), dunOverride ?? undefined);
            const palaces = findJiuDunPalaces(pan.九宮, selectedJiuDun);
            palaces.forEach(palace => {
                matches.push({date: cursor.toDate(), palace});
            });
            cursor = cursor.add(step.value, step.unit);
        }
        return matches;
    }, [date, selectedJiuDun, stepSize, dunOverride]);
    const timeTypeMatches = React.useMemo(() => {
        if (!timeTypeFilter) {
            return [] as Date[];
        }
        const typeMap: Record<Exclude<typeof timeTypeFilter, "">, "五不遇時" | "天顯時格" | "時干入墓"> = {
            五不遇时: "五不遇時",
            天显时格: "天顯時格",
            时干入墓: "時干入墓",
        };
        const targetType = typeMap[timeTypeFilter];
        const matches: Date[] = [];
        const start = moment(date);
        const end = moment(date).add(1, "year");
        const step = timeStepSize === "two-hour" ? {value: 2, unit: "hours" as const} : {value: 1, unit: "days" as const};
        let cursor = start.clone();
        while (cursor.isSameOrBefore(end)) {
            const pan = QimenUtil.create(Lunar.fromDate(cursor.toDate()), dunOverride ?? undefined);
            const [, , dayStem, hourStem] = pan.八字;
            const type = AstrologicalTimeUtil.getType(dayStem[0] as 天干, hourStem[0] as 天干, hourStem[1] as 地支);
            if (type === targetType) {
                matches.push(cursor.toDate());
            }
            cursor = cursor.add(step.value, step.unit);
        }
        return matches;
    }, [date, timeTypeFilter, timeStepSize, dunOverride]);
    React.useEffect(() => {
        if (selectedFormation && !goodFormationOptions.includes(selectedFormation)) {
            setSelectedFormation("");
        }
    }, [selectedFormation, goodFormationOptions]);
    return (
        <Flex flexDirection="column" alignItems="center" mt={mt} w="100%" maxW={maxWidth ? `${maxWidth}px` : undefined}>
            <Flex
                w="100%"
                borderWidth="1px"
                borderColor={borderColor}
                bg={bgColor}
                color={textColor}
                fontWeight="bold"
                borderRadius="md"
                overflow="hidden"
            >
                {items
                    .filter(item => item.active)
                    .map((item, index, activeItems) => (
                        <Flex
                            key={item.label}
                            px={2}
                            py={1}
                            fontSize="xs"
                            alignItems="center"
                            justifyContent="center"
                            flex="1"
                            minW={0}
                            borderRightWidth={index === activeItems.length - 1 ? 0 : "1px"}
                            borderRightColor={borderColor}
                            bg={activeBg}
                        >
                            <Text>{item.label}</Text>
                        </Flex>
                    ))}
            </Flex>
            <Flex
                mt={1}
                w="100%"
                borderWidth="1px"
                borderColor={borderColor}
                bg={bgColor}
                color={textColor}
                fontWeight="bold"
                borderRadius="md"
                overflow="hidden"
            >
                {items
                    .filter(item => item.active)
                    .map((item, index, activeItems) => (
                        <Flex
                            key={`${item.label}-dup`}
                            px={2}
                            py={1}
                            fontSize="xs"
                            alignItems="center"
                            justifyContent="center"
                            flex="1"
                            minW={0}
                            textAlign="center"
                            whiteSpace="normal"
                            borderRightWidth={index === activeItems.length - 1 ? 0 : "1px"}
                            borderRightColor={borderColor}
                            bg={activeBg}
                        >
                            {item.label === "擊刑" ? (
                                <Text>{jiXingPalaces.join("、")}</Text>
                            ) : item.label === "門迫" ? (
                                <Text>{menPoPalaces.join("、")}</Text>
                            ) : item.label === "入墓" ? (
                                <Text>{[...ruMuPalaces, ...ruMuGods].filter(Boolean).join("、")}</Text>
                            ) : item.label === "空亡" ? (
                                <Text>{kongPalaces.join("、")}</Text>
                            ) : (
                                <Text>✅</Text>
                            )}
                        </Flex>
                    ))}
            </Flex>
            <Flex mt={2} w="100%" flexDirection="column" alignItems="center" gap={2}>
                <Grid w="100%" maxW="720px" templateColumns="repeat(3, minmax(0, 1fr))" columnGap={3} rowGap={2}>
                    <Select
                        size="sm"
                        w="100%"
                        bg="white"
                        borderColor="gray.300"
                        borderWidth="1px"
                        borderRadius="md"
                        value={selectedFormation}
                        onChange={event => setSelectedFormation(event.target.value)}
                        placeholder="选择吉格局"
                    >
                        {goodFormationOptions.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </Select>
                    <Select
                        size="sm"
                        w="100%"
                        bg="white"
                        borderColor="gray.300"
                        borderWidth="1px"
                        borderRadius="md"
                        value={selectedJiuDun}
                        onChange={event => setSelectedJiuDun(event.target.value as typeof selectedJiuDun)}
                        placeholder="选择九遁"
                    >
                        {["天遁", "地遁", "人遁", "神遁", "鬼遁", "风遁", "云遁", "龙遁", "虎遁"].map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </Select>
                    <Select
                        size="sm"
                        w="100%"
                        bg="white"
                        borderColor="gray.300"
                        borderWidth="1px"
                        borderRadius="md"
                        value={timeTypeFilter}
                        onChange={event => setTimeTypeFilter(event.target.value as typeof timeTypeFilter)}
                        placeholder="选择吉时"
                    >
                        <option value="五不遇时">五不遇时</option>
                        <option value="天显时格">天显时格</option>
                        <option value="时干入墓">时干入墓</option>
                    </Select>
                    <Select
                        size="sm"
                        w="100%"
                        bg="white"
                        borderColor="gray.300"
                        borderWidth="1px"
                        borderRadius="md"
                        value={stepSize}
                        onChange={event => setStepSize(event.target.value as typeof stepSize)}
                    >
                        <option value="two-hour">时辰</option>
                        <option value="day">每天</option>
                    </Select>
                    <Box />
                    <Select
                        size="sm"
                        w="100%"
                        bg="white"
                        borderColor="gray.300"
                        borderWidth="1px"
                        borderRadius="md"
                        value={timeStepSize}
                        onChange={event => setTimeStepSize(event.target.value as typeof timeStepSize)}
                    >
                        <option value="two-hour">时辰</option>
                        <option value="day">每天</option>
                    </Select>
                </Grid>
                {selectedFormation && (
                    <Flex flexDirection="column" w="100%" alignItems="center" fontSize="sm" color={textColor}>
                        {selectedPalaces.length ? (
                            selectedPalaces.map(palace => (
                                <Text key={`${selectedFormation}-${palace}`}>
                                    {formatDate(date)} {palaceDirection(palace)} {palaceDisplay(palace)}
                                </Text>
                            ))
                        ) : (
                            <Text color="red.500" fontWeight="bold">此盘没格局</Text>
                        )}
                    </Flex>
                )}
                {selectedFormation && (
                    <Flex flexDirection="column" w="100%" alignItems="center" fontSize="sm" color={textColor}>
                        {futureMatches.length ? (
                            futureMatches.map((match, index) => (
                                <Text key={`${selectedFormation}-${match.palace}-${index}`}>
                                    {stepSize === "two-hour" ? formatDateTime(match.date) : formatDate(match.date)} {palaceDirection(match.palace)} {palaceDisplay(match.palace)}
                                </Text>
                            ))
                        ) : (
                            <Text>未来一年无匹配</Text>
                        )}
                    </Flex>
                )}
                {selectedJiuDun && (
                    <Flex flexDirection="column" w="100%" alignItems="center" fontSize="sm" color={textColor}>
                        {futureJiuDunMatches.length ? (
                            futureJiuDunMatches.map((match, index) => (
                                <Text key={`${selectedJiuDun}-${match.palace}-${index}`}>
                                    {stepSize === "two-hour" ? formatDateTime(match.date) : formatDate(match.date)} {palaceDirection(match.palace)} {palaceDisplay(match.palace)}
                                </Text>
                            ))
                        ) : (
                            <Text>未来一年无匹配</Text>
                        )}
                    </Flex>
                )}
                {timeTypeFilter && (
                    <Flex flexDirection="column" w="100%" alignItems="center" fontSize="sm" color={textColor}>
                        {timeTypeMatches.length ? (
                            timeTypeMatches.map((match, index) => (
                                <Text key={`${timeTypeFilter}-${index}`}>
                                    {timeStepSize === "two-hour" ? formatDateTime(match) : formatDate(match)}
                                </Text>
                            ))
                        ) : (
                            <Text>未来一年无匹配</Text>
                        )}
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};
