import './TerrorInTech.css'

import React, { useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import HomeButton from '../HomeButton';
import { getAnalytics, logEvent } from 'firebase/analytics';

export const TerrorInTech = (): React.ReactElement => {
    useEffect(() => {
        const analytics = getAnalytics();
        logEvent(analytics, `entering_terror_in_tech`);

        return () => {
            logEvent(analytics, `exiting_terror_in_tech`);
        };
    }, []);


    const {unityProvider, loadingProgression, isLoaded} = useUnityContext({
        loaderUrl: "/Build/TerrorInTech.loader.js",
        dataUrl: "/Build/TerrorInTech.data.br",
        frameworkUrl: "/Build/TerrorInTech.framework.js.br",
        codeUrl: "/Build/TerrorInTech.wasm.br",
    });

    return <div className={"page-container terror-in-tech"}>
        <HomeButton />
        {!isLoaded && <LoadingScreen progression={loadingProgression}/>}
        <Unity unityProvider={unityProvider} style={{display: isLoaded ? "" : "none"}} />
    </div>;
};

export default TerrorInTech;

interface LoadingScreenProps {
    progression: number;
} 

const LoadingScreen = (props: LoadingScreenProps) => {
    return <div className={"loading-screen"}>
        <div className={"loading-message"}>Loading Terror In Tech - {Math.round(props.progression)}%</div>
    </div>;
}