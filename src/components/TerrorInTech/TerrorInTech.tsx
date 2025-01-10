import './TerrorInTech.css'

import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

export const TerrorInTech = (): React.ReactElement => {
    const {unityProvider, loadingProgression, isLoaded} = useUnityContext({
        loaderUrl: "/Build/TerrorInTech.loader.js",
        dataUrl: "/Build/TerrorInTech.data.br",
        frameworkUrl: "/Build/TerrorInTech.framework.js.br",
        codeUrl: "/Build/TerrorInTech.wasm.br",
    });

    return <div className={"page-container terror-in-tech"}>
        {!isLoaded && <LoadingScreen progression={loadingProgression}/>}
        <Unity unityProvider={unityProvider}/>
    </div>;
};

export default TerrorInTech;

interface LoadingScreenProps {
    progression: number;
} 

const LoadingScreen = (props: LoadingScreenProps) => {
    return <div className={"loading-screen"}>
        <div className={"loading-message"}>Loading Terror In Tech...</div>
        <div className={"loading-indicator"} style={{ width: `${props.progression * 100}%` }}></div>
        <div className={"loading-percentage"}>{Math.round(props.progression)}</div>
    </div>;
}