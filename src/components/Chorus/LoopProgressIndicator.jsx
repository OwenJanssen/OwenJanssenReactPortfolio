
import { useEffect, useState } from "react";

const LoopProgressIndicator = ({isPlayed, midiSounds, beatIndex, setBeatIndex, height}) => {
    const shiftAmount = 16; //pixel
    const [position, setPosition] = useState(0);
    
    useEffect(() => {
        if (midiSounds && isPlayed) {  
            const interval = setInterval(() => {
                setBeatIndex(midiSounds.beatIndex);
            }, 10);
        }else{
            setBeatIndex(0);
        }
    });

    return midiSounds && (
        <div className="moving-bar-box" style={{height: height}}>
            <div className="bar" style={{
                    left: beatIndex * shiftAmount - 2 + "px", 
            }}/>
            
            {/* Janky code to place measure bars on screen - Ethan*/}
            <div className="measure-bar" style={{
                    left: 16 * shiftAmount - 2 +1 +"px", 
                    top: "-100%"
            }}/>
            <div className="measure-bar" style={{
                    left: 32 * shiftAmount - 2 +1 +"px", 
                    top: "-200%"
            }}/>
            <div className="measure-bar" style={{
                    left: 48 * shiftAmount - 2 +1 +"px", 
                    top: "-300%"
            }}/>
        </div>
    )
}

export default LoopProgressIndicator;