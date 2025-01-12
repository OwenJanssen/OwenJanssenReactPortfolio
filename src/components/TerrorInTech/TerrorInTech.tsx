import './TerrorInTech.css'

import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import HomeButton from '../HomeButton';

export const TerrorInTech = (): React.ReactElement => {
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