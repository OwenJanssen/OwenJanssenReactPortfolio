import React, { useEffect } from 'react';
import './Hotdogs.css';
import HomeButton from '../HomeButton';
import { getAnalytics, logEvent } from "firebase/analytics";

export const Hotdogs = (): React.ReactElement => {
    useEffect(() => {
        const analytics = getAnalytics();
        logEvent(analytics, `entering_hotdogs`);

        return () => {
            logEvent(analytics, `exiting_hotdogs`);
        };
    }, []);

    return <div className="page-container hotdogs">
        <iframe title="VR HOTDOGS" src="https://hotdogs-arvr-a6.glitch.me/"/>
        <HomeButton />
    </div>
}

export default Hotdogs;