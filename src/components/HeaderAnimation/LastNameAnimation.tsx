import React, { useState } from "react";
import { LetterAnimationProps } from "./LetterAnimation";
import { getAnimationPercentage } from "./HeaderAnimation";

export const LastNameAnimation = (props: LetterAnimationProps) => {
    const [scrollFraction, startScrollFraction, endScrollFraction, endLeft] =
        [props.scrollFraction, props.startScrollFractionMoving, props.endScrollFractionMoving, props.endCenterOffset];

    const percentageInAnimation = getAnimationPercentage(scrollFraction, startScrollFraction, endScrollFraction);

    return (
        <div className="animated-last-name" style={{
            top: `${100 * percentageInAnimation - 38}px`,
            left: `calc(50% + ${endLeft}px)`
        }}>JANSSEN</div>
    );
}
