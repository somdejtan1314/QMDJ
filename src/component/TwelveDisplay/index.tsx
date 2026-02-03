import React from "react";
import {Flex} from "@chakra-ui/react";
import {Horizontal} from "@/component/TwelveDisplay/Horizontal";
import {Vertical} from "@/component/TwelveDisplay/Vertical";
import {地支} from "@/qimen/type";

interface Props<T extends string> {
    itemsMap: Record<地支, T[]>;
    renderer?: (items: T[]) => React.ReactNode;
    size: number;
    ringScale?: number;
    offsetScale?: number;
    zIndex?: number;
    translateX?: number;
    translateY?: number;
    leftOffset?: number;
    rightOffset?: number;
    rightShiftSlots?: number[];
    rightShiftPx?: number;
}

export const TwelveDisplay = <T extends string>({
    renderer,
    itemsMap,
    size,
    ringScale = 1.2,
    offsetScale = 0.1,
    zIndex,
    translateX = 0,
    translateY = 0,
    leftOffset = 0,
    rightOffset = 0,
    rightShiftSlots = [],
    rightShiftPx = 0,
}: Props<T>) => {
    const containerSize = size * ringScale;
    const offset = containerSize * offsetScale;
    const slotWidth = (containerSize - offset * 2) / 3;
    const slotHeight = (containerSize - offset * 2) / 3;
    const slotCenterX = (index: number) => offset + slotWidth * (index + 0.5);
    const slotCenterY = (index: number) => offset + slotHeight * (index + 0.5);
    const containerTransform = `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY}px)`;
    const shiftRight = (index: number) => (rightShiftSlots.includes(index) ? rightShiftPx : 0);

    return (
        <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform={containerTransform}
            width={`${containerSize}px`}
            height={`${containerSize}px`}
            zIndex={zIndex}
            pointerEvents="none"
        >
            <Horizontal size={size} bottom={0} left={`${slotCenterX(1)}px`} transform="translateX(-50%)">
                {renderer ? renderer(itemsMap.子) : itemsMap.子}
            </Horizontal>
            <Horizontal size={size} bottom={0} left={`${slotCenterX(0) + leftOffset}px`} transform="translateX(-50%)">
                {renderer ? renderer(itemsMap.丑) : itemsMap.丑}
            </Horizontal>
            <Vertical size={size} top={`${slotCenterY(2)}px`} left={`${leftOffset}px`} transform="translateY(-50%)">
                {renderer ? renderer(itemsMap.寅) : itemsMap.寅}
            </Vertical>
            <Vertical size={size} top={`${slotCenterY(1)}px`} left={`${leftOffset}px`} transform="translateY(-50%)">
                {renderer ? renderer(itemsMap.卯) : itemsMap.卯}
            </Vertical>
            <Vertical size={size} top={`${slotCenterY(0)}px`} left={`${leftOffset}px`} transform="translateY(-50%)">
                {renderer ? renderer(itemsMap.辰) : itemsMap.辰}
            </Vertical>
            <Horizontal size={size} top={0} left={`${slotCenterX(0) + leftOffset}px`} transform="translateX(-50%)">
                {renderer ? renderer(itemsMap.巳) : itemsMap.巳}
            </Horizontal>
            <Horizontal size={size} top={0} left={`${slotCenterX(1)}px`} transform="translateX(-50%)">
                {renderer ? renderer(itemsMap.午) : itemsMap.午}
            </Horizontal>
            <Horizontal size={size} top={0} left={`${slotCenterX(2)}px`} transform="translateX(-50%)">
                {renderer ? renderer(itemsMap.未) : itemsMap.未}
            </Horizontal>
            <Vertical size={size} top={`${slotCenterY(0)}px`} right={`${rightOffset + shiftRight(0)}px`} transform="translateY(-50%)">
                {renderer ? renderer(itemsMap.申) : itemsMap.申}
            </Vertical>
            <Vertical size={size} top={`${slotCenterY(1)}px`} right={`${rightOffset + shiftRight(1)}px`} transform="translateY(-50%)">
                {renderer ? renderer(itemsMap.酉) : itemsMap.酉}
            </Vertical>
            <Vertical size={size} top={`${slotCenterY(2)}px`} right={`${rightOffset + shiftRight(2)}px`} transform="translateY(-50%)">
                {renderer ? renderer(itemsMap.戌) : itemsMap.戌}
            </Vertical>
            <Horizontal size={size} bottom={0} left={`${slotCenterX(2)}px`} transform="translateX(-50%)">
                {renderer ? renderer(itemsMap.亥) : itemsMap.亥}
            </Horizontal>
        </Flex>
    );
};
