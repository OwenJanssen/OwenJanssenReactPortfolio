import React, { useState } from 'react';
import { GalleryCard } from './Gallery'

export interface GalleryCardProps
{
    card: GalleryCard;
}

export const Card = (props: GalleryCardProps) => {
    const card = props.card;
    
    const onMouseEnter = () => setImageSrc(card.gif_url);
    const onMouseLeave = () => setImageSrc(card.image_url);
    const onClick = () => window.location.href = `/${card.url}`

    const [imageSrc, setImageSrc] = useState(card.image_url);

    return <div
        className="card"
        key={card.url}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}>
        <div className="title">
            <div className="text">
                {card.title}
            </div>
        </div>
        <div className="img-container">
            <img
                src={imageSrc}
                className="img"
                alt={`Image of page ${card.title}`} />
        </div>
    </div>
};
