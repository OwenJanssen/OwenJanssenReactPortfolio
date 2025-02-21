import React, { ReactElement, useState} from 'react';
import { getAnalytics, logEvent } from "firebase/analytics";

export const HobbiesSection = () => {
    return <div className="about-me-section">
         {/* TODO Add background with moving circles like Ab Initio */}
         <div className={"hobbies"}>
             <div className={"hobbies-header"}>Other Hobbies</div>
             <div className={"hobbies-grid"}>
                 <Hobby name={"Running"} imageUrl={"../../../Running.jpg"} altImgComponent={<RunningStats/>} />
                 <Hobby name={"Skateboarding"} imageUrl={"../../../Skateboarding.jpg"} gifUrl={"../../../Skateboarding\ GIF.gif"}/>
                 <Hobby name={"Rollerblading"} imageUrl={"../../../Rollerblading.jpg"} gifUrl={"../../../Rollerblading\ GIF.gif"}/>
                 <Hobby name={"Basketball"} imageUrl={"../../../Celtics\ Game.jpg"} altImgComponent={<Basketball/>}/>
             </div>
          </div>
     </div>;
}

export interface HobbyProps {
    name: string,
    imageUrl: string,
    gifUrl?: string,
    altImgComponent?: ReactElement
}

export const Hobby = (props: HobbyProps) => {
    const [imageSrc, setImageSrc] = useState<string | null>(props.imageUrl);
    const onMouseEnter = () => {
        if (props.gifUrl != null) {
            setImageSrc(props.gifUrl);
        }
        else if (props.altImgComponent != null) {
            setImageSrc(null);
        }
        logEvent(getAnalytics(), `entered_hobby`, {"hobby": props.name});
    };
    const onMouseLeave = () => setImageSrc(props.imageUrl);

    return <div className={"hobby"} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className={"hobby-name"}>{props.name}</div>
        <div className={"image-container"}>
            {imageSrc != null && <img src={imageSrc} alt={props.name} />}
            {imageSrc == null && props.altImgComponent}
        </div>
    </div>
}

export const RunningStats = () => {
    return <div className={"running-stats"}>
        <div className={"stat"}>
            Marathon (1)
            <div>PR: <a href={"https://results.raceroster.com/v2/en-US/results/y7tjycgws6hxawjc/detail/jqjxgz2m7mfvyyjf"}>4:03:36</a></div>
        </div>
        <div className={"stat"}>
            Half Marathon (4)
            <div>PR: <a href={"https://rtrt.me/ulink/TLMRA/TLMR-CAMBRIDGE-HALF-2024/tracker/RJ845V29/focus"}>1:43:42</a></div>
        </div>
    </div>
}

export const Basketball = () => {
    return <div className={"running-stats"}>
        <div className={"stat"}>
            <div>My first Celtics game! Celtics vs Pacers on November 1st, 2023</div>
        </div>
    </div>
}