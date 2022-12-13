import React, { useState } from 'react';
import './Gallery.css';
import '../../App.css'

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
            image_url: "https://i.imgur.com/lMc5Niy.png",
            gif_url: "https://i.imgur.com/IhScUDB.gif",
        },
        {
            url: "tv", 
            title: "TV Reviews", 
            image_url: "https://i.imgur.com/lMc5Niy.png",
            gif_url: "https://i.imgur.com/IhScUDB.gif",
        },
    ]
    
    const goToWindow = (url : string) => {
        window.location.href = `/${url}`; 
    }

    return (
        <div className="page-container">
            <div className="page-title">Owen Janssen's React Porfolio</div>

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