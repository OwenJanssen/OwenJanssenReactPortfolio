import { Tooltip } from '@mui/material';
import React from 'react';

export const MusicSection = () => {
     const imageUrl = "../../../Guitars.jpg";

     return <div className="about-me-section">
          <div className={"music"}>
               <img className={"guitars-image"} src={imageUrl} alt={`Image of my two guitars`} />

               <div className={"music-header"}>Music</div>
               <div className={"music-sections"}>
                    <div className={"background"}>
                         <div className={"title"}>Background</div>
                         <div className={"content"}>At the start of 2024 I started learning guitar. I mostly play the electric guitar and call it "Blue Lightning". My favorite genres to play are alternative rock or folk</div>
                    </div>
                    <div className={"favorites"}>
                         <div className={"title"}>Favorites</div>
                         <div className={"lists"}>
                              <div className={"songs"}>
                                   <div className={"title"}>Songs</div>
                                   <Tooltip title={"By Peach Pit"}><div className={"song"}>Everything About You</div></Tooltip>
                                   <Tooltip title={"By Neutral Milk Hotel"}><div className={"song"}>In the Aeroplane Over the Sea</div></Tooltip>
                                   <Tooltip title={"By Nirvana"}><div className={"song"}>All Apologies</div></Tooltip>
                                   <Tooltip title={"By The Shins"}><div className={"song"}>New Slang</div></Tooltip>
                                   <Tooltip title={"By The Beatles"}><div className={"song"}>While My Guitar Gently Weeps</div></Tooltip>
                              </div>
                              <div className={"artists"}>
                                   <div className={"title"}>Artists</div>
                                   <div className={"artist"}>Peach Pit</div>
                                   <div className={"artist"}>The Beatles</div>
                                   <div className={"artist"}>Nirvana</div>
                                   <div className={"artist"}>Vampire Weekend</div>
                                   <div className={"artist"}>Still Woozy</div>                              
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </div>;
}