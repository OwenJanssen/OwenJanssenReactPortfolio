import React from 'react';
import { LetterAnimationAppearingProps } from './LetterAnimation';
import { getAnimationPercentage, size } from './HeaderAnimation';

export const LetterOAnimation = (props: LetterAnimationAppearingProps) => {
    const [scrollFraction, startScrollFractionAppearing, endScrollFractionAppearing, startScrollFractionMoving, endScrollFractionMoving, endLeft] =
        [props.scrollFraction, props.startScrollFractionAppearing, props.endScrollFractionAppearing, props.startScrollFractionMoving, props.endScrollFractionMoving, props.endCenterOffset];

    // Size and position of the O in the logo animation
    const startTop = window.innerHeight / 2;
    const logoOutsideSize = { width: 200, height: 350 };
    const logoInsideSize = { width: 150, height: 281.25 };

    // Size and position of the O in the header
    const endTop = 61.7;
    const headerOutsideSize = {height: 47, width: 45};
    const headerInsideSize = {height: 32, width: 26};

    const percentageInAppearingAnimation = getAnimationPercentage(scrollFraction, startScrollFractionAppearing, endScrollFractionAppearing);
    const percentageInMovingAnimation = getAnimationPercentage(scrollFraction, startScrollFractionMoving, endScrollFractionMoving);
    
    const position = {
        top: startTop - (startTop - endTop) * percentageInMovingAnimation,
        centerOffset: endLeft * percentageInMovingAnimation
    };

    let outsideSize: size;
    let insideSize: size;

    if (percentageInMovingAnimation === 0) {
        outsideSize = {
            height: logoOutsideSize.height * percentageInAppearingAnimation,
            width: logoOutsideSize.width * percentageInAppearingAnimation
        }; 
        insideSize = {
            height: logoInsideSize.height * percentageInAppearingAnimation,
            width: logoInsideSize.width * percentageInAppearingAnimation
        };
    }
    else
    {
        outsideSize = {
            height: logoOutsideSize.height - (logoOutsideSize.height - headerOutsideSize.height) * percentageInMovingAnimation,
            width: logoOutsideSize.width - (logoOutsideSize.width - headerOutsideSize.width) * percentageInMovingAnimation
        }; 
        insideSize = {
            height: logoInsideSize.height - (logoInsideSize.height - headerInsideSize.height) * percentageInMovingAnimation,
            width: logoInsideSize.width - (logoInsideSize.width - headerInsideSize.width) * percentageInMovingAnimation
        };
    }
    
    return (
        <div style={{
            top: `${position.top}px`,
            left: `calc(50% + ${position.centerOffset}px)`,
            position: "absolute"
        }}>
            <div className="letter-o-outside" style={{
                height: `${outsideSize.height}px`,
                width: `${outsideSize.width}px`,
                borderRadius: `${outsideSize.width / 2}px`
            }} />
            <div className="letter-o-inside" style={{
                height: `${insideSize.height}px`,
                width: `${insideSize.width}px`,
                borderRadius: `${insideSize.width / 2}px`
            }} />
        </div>
    )
}