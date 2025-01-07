import React, { useState } from 'react';
import { GalleryCard } from './Gallery'

export type CardProps = {
    card: GalleryCard;
}

export const Card = (props: CardProps) => {
    const { card } = props;

    const [imageSrc, setImageSrc] = useState<string | null>(card.image_url);

    const onMouseEnter = () => {
        if (card.altImgComponent != null) {
            setImageSrc(null);
        }
        else if (card.gif_url != null) {
            setImageSrc(card.gif_url);
        }
    };
    const onMouseLeave = () => {
        setImageSrc(card.image_url);
    };
    const onClick = () => window.location.href = `/${card.url}`

    return <div className="card" key={card.url} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
        <div className="title">
            <div className="text">
                {card.title}
            </div>
        </div>
        <div className="img-container">
            {imageSrc != null && <img src={imageSrc} className="img" alt={`Image of page ${card.title}`} />}
            {imageSrc == null && card.altImgComponent}
        </div>
    </div>
};
