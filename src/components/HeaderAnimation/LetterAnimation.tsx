import React from "react";
import { getAnimationPercentage } from "./HeaderAnimation";

export type LetterAnimationProps = {
    scrollFraction: number,
    startScrollFractionMoving: number,
    endScrollFractionMoving: number,
    endCenterOffset: number
};

export type LetterAnimationAppearingProps = LetterAnimationProps & {
    startScrollFractionAppearing: number,
    endScrollFractionAppearing: number,
}

export type LetterAnimationDetailedProps = LetterAnimationAppearingProps & {
    startTop: number,
    letter: string,
};

export const LetterAnimation = (props: LetterAnimationDetailedProps) => {
    const [scrollFraction, startScrollFractionAppearing, endScrollFractionAppearing, startScrollFractionMoving, endScrollFractionMoving, startTop, endCenterOffset, letter] =
        [props.scrollFraction, props.startScrollFractionAppearing, props.endScrollFractionAppearing, props.startScrollFractionMoving, props.endScrollFractionMoving, props.startTop, props.endCenterOffset, props.letter];

    const maxFontSize = 65;
    const percentageInAppearingAnimation = getAnimationPercentage(scrollFraction, startScrollFractionAppearing, endScrollFractionAppearing);
    const fontSize = percentageInAppearingAnimation * maxFontSize;

    const endTop = 63;

    const percentageInMovingAnimation = getAnimationPercentage(scrollFraction, startScrollFractionMoving, endScrollFractionMoving);

    const position = {
        top: startTop - (startTop - endTop) * percentageInMovingAnimation,
        centerOffset: endCenterOffset * percentageInMovingAnimation
    };

    const style = {
        top: `${position.top}px`,
        left: `calc(50% + ${position.centerOffset}px)`,
        fontSize: `${fontSize}px`
    };

    return (
        <div className="animated-letter" style={style}>
            {letter}
        </div>
    );
}