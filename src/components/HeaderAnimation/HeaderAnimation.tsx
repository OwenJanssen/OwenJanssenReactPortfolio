import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import { LastNameAnimation } from './LastNameAnimation';
import { LetterAnimation } from './LetterAnimation';
import { LetterOAnimation } from './LetterOAnimation';
import "./HeaderAnimation.css";
import { getCookie, setCookie } from '../../utilities/Cookies';
import { getAnalytics, logEvent } from "firebase/analytics";

const html = document.documentElement;

export interface Position {
    top: number;
    left: number;
}

export interface Size {
    width: number;
    height: number;
}

const HeaderAnimation = () => {
    const [scrollFraction, setScrollFraction] = useState<number>(0);
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        let scrollToY = 0;
        if (getCookie("scrolled") === "y")
        {
            scrollToY = 4 * window.innerHeight;
        }
        window.scrollTo(0,scrollToY);

        const handleScroll = () => {
            const scrollTop = html.scrollTop;
            const maxScrollTop = (3.75 * window.innerHeight - 40); // the height of the animation body is 400vh but I want it to finish early
            let sf = scrollTop / maxScrollTop;
            setScrollFraction(sf);

            if (scrollTop >= 4 * window.innerHeight)
            {
                setShowHeader(false);
                setCookie("scrolled", "y", 1); // expires in a day
            }
            else
            {
                setShowHeader(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        const analytics = getAnalytics();
        logEvent(analytics, "entering_home_page");

        return () => {
            window.removeEventListener('scroll', handleScroll);
            logEvent(analytics, "exiting_home_page");
        };
    }, []);

    const startTop = window.innerHeight / 2;

    // These numbers were derived from starting with the finished "OWEN JANSSEN" header, then editing the top and left of the single letters/last name divs to make them match
    const endOCenterOffset = -205;
    const endWCenterOffset = -157.5;
    const endECenterOffset = -111;
    const endNCenterOffset = -71.2;
    const endLastNameCenterOffset = 96.5;
    const letterSpacingDifference = 80;

    const oAppearingStart = 0;
    const oAppearingEnd = 0.125;
    const letterAppearingOffset = 0.075;
    const wAppearingEnd = oAppearingEnd + letterAppearingOffset;
    const eAppearingEnd = wAppearingEnd + letterAppearingOffset;
    const nAppearingEnd = eAppearingEnd + letterAppearingOffset;

    const oMovingStart = 0.45;
    const letterMovingOffset = 0.1125;
    const wMovingStart = oMovingStart + letterMovingOffset;
    const eMovingStart = wMovingStart + letterMovingOffset;
    const nMovingStart = eMovingStart + letterMovingOffset;
    const nMovingEnd = nMovingStart + letterMovingOffset;

    const lastNameAppearingStart = 0.9;
    const lastNameAppearingEnd = 1;

    let visibleLetters = "";
    let hiddenLetters = "OWEN JANSSEN";
    if (scrollFraction >= lastNameAppearingEnd)
    {
        visibleLetters = "OWEN JANSSEN";
        hiddenLetters = "";
    }
    else if (scrollFraction >= nMovingEnd)
    {
        visibleLetters = "OWEN"
        hiddenLetters = " JANSSEN"
    }
    else if (scrollFraction >= nMovingStart)
    {
        visibleLetters = "OWE"
        hiddenLetters = "N JANSSEN"
    }
    else if (scrollFraction >= eMovingStart)
    {
        visibleLetters = "OW"
        hiddenLetters = "EN JANSSEN"
    }
    else if (scrollFraction >= wMovingStart)
    {
        visibleLetters = "O"
        hiddenLetters = "WEN JANSSEN"
    }

    return (
        <div className="header-animation-body">
            <div className="scroll-down-text">SCROLL DOWN</div>
            <div className="animation-canvas">
                {scrollFraction < 1 && <LetterOAnimation scrollFraction={scrollFraction}
                    startScrollFractionAppearing={oAppearingStart} endScrollFractionAppearing={oAppearingEnd}
                    startScrollFractionMoving={oMovingStart} endScrollFractionMoving={wMovingStart}
                    endCenterOffset={endOCenterOffset} />}  
                {scrollFraction < 1 && <LetterAnimation scrollFraction={scrollFraction}
                    startScrollFractionAppearing={oAppearingEnd} endScrollFractionAppearing={wAppearingEnd}
                    startScrollFractionMoving={wMovingStart} endScrollFractionMoving={eMovingStart}
                    startTop={startTop - letterSpacingDifference} endCenterOffset={endWCenterOffset} letter={'W'} />}
                {scrollFraction < 1 && <LetterAnimation scrollFraction={scrollFraction}
                    startScrollFractionAppearing={wAppearingEnd} endScrollFractionAppearing={eAppearingEnd}
                    startScrollFractionMoving={eMovingStart} endScrollFractionMoving={nMovingStart}
                    startTop={startTop} endCenterOffset={endECenterOffset} letter={'E'} />}
                {scrollFraction < 1 && <LetterAnimation scrollFraction={scrollFraction}
                    startScrollFractionAppearing={eAppearingEnd} endScrollFractionAppearing={nAppearingEnd}
                    startScrollFractionMoving={nMovingStart} endScrollFractionMoving={nMovingEnd}
                    startTop={startTop + letterSpacingDifference} endCenterOffset={endNCenterOffset} letter={'N'} />}
                {scrollFraction < 1 && <LastNameAnimation scrollFraction={scrollFraction}
                    startScrollFractionMoving={lastNameAppearingStart} endScrollFractionMoving={lastNameAppearingEnd}
                    endCenterOffset={endLastNameCenterOffset} />}
                <div style={{visibility: showHeader ? "unset" : "hidden"}}><Header visibleLetters={visibleLetters} hiddenLetters={hiddenLetters}/></div>
            </div>
        </div>
    );
}

export const getAnimationPercentage = (scrollFraction: number, startScrollFraction: number, endScrollFraction: number): number => {
    return Math.max(0, (Math.min(scrollFraction, endScrollFraction) - startScrollFraction)) / (endScrollFraction - startScrollFraction);
}

export default HeaderAnimation;