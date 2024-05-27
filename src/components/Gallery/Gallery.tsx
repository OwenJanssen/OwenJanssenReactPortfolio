import React, { useState } from 'react';
import './Gallery.css';
import '../../App.css'
import { Header } from '../Header';

type card = {
    url: string;
    title: string;
    image_url: string;
    gif_url: string;
}

const Gallery = () : React.ReactElement => {
    const cards : card[] = [
        {
            url: "pong", 
            title: "Pong", 
            image_url: "https://lh5.googleusercontent.com/zP3oV6o-fIohDNyGMaGZ--Q-nj0vR4T4gEin3U8OcVS42KWKsTZ5xiTL6uD48jXrkdE=w2400",
            gif_url: "https://lh5.googleusercontent.com/bXYvfSq-gBmaCDzVLED8W8Ga0ZgLe-mALsGnp4fNFr0L5z1myAY2120aCBm4TFCNAoc=w2400",
        },
        // {
        //     url: "tv", 
        //     title: "TV Reviews", 
        //     image_url: "https://lh5.googleusercontent.com/zP3oV6o-fIohDNyGMaGZ--Q-nj0vR4T4gEin3U8OcVS42KWKsTZ5xiTL6uD48jXrkdE=w2400",
        //     gif_url: "https://lh5.googleusercontent.com/bXYvfSq-gBmaCDzVLED8W8Ga0ZgLe-mALsGnp4fNFr0L5z1myAY2120aCBm4TFCNAoc=w2400",
        // },
    ]
    
    const goToWindow = (url : string) => {
        window.location.href = `/${url}`; 
    }

    return (
        <div className="page-container">
            <div className="gallery-card-grid">
                {cards.map(c => {
                    const [imageSrc, setImageSrc] = useState(c.image_url);

                    return (
                        <div className="card" key={c.url} onMouseEnter={() => setImageSrc(c.gif_url)}
                                                          onMouseLeave={() => setImageSrc(c.image_url)}
                                                          onClick={() => goToWindow(c.url)}>
                            <div className="title"><div className="text">{c.title}</div></div>
                            <div className="img-container"><img src={imageSrc} className="img"/></div>
                        </div>
                    )}
                )}
            </div>
        </div>
    )
}

export default Gallery;