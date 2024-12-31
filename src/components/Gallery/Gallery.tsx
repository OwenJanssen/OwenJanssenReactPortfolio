import React, { useState } from 'react';
import './Gallery.css';
import '../../App.css'
import { Card } from './GalleryCard';

export type GalleryCard = {
    url: string;
    title: string;
    image_url: string;
    gif_url: string;
}

const Gallery = (): React.ReactElement => {
    const cards: GalleryCard[] = [
        {
            url: "about-me",
            title: "About Me",
            image_url: "https://lh5.googleusercontent.com/zP3oV6o-fIohDNyGMaGZ--Q-nj0vR4T4gEin3U8OcVS42KWKsTZ5xiTL6uD48jXrkdE=w2400",
            gif_url: "https://lh5.googleusercontent.com/bXYvfSq-gBmaCDzVLED8W8Ga0ZgLe-mALsGnp4fNFr0L5z1myAY2120aCBm4TFCNAoc=w2400",
        },
        {
            url: "tv-ratings",
            title: "TV Ratings",
            image_url: "https://lh5.googleusercontent.com/zP3oV6o-fIohDNyGMaGZ--Q-nj0vR4T4gEin3U8OcVS42KWKsTZ5xiTL6uD48jXrkdE=w2400",
            gif_url: "https://lh5.googleusercontent.com/bXYvfSq-gBmaCDzVLED8W8Ga0ZgLe-mALsGnp4fNFr0L5z1myAY2120aCBm4TFCNAoc=w2400",
        },
        {
            url: "chorus",
            title: "Chorus",
            image_url: "https://lh5.googleusercontent.com/zP3oV6o-fIohDNyGMaGZ--Q-nj0vR4T4gEin3U8OcVS42KWKsTZ5xiTL6uD48jXrkdE=w2400",
            gif_url: "https://lh5.googleusercontent.com/bXYvfSq-gBmaCDzVLED8W8Ga0ZgLe-mALsGnp4fNFr0L5z1myAY2120aCBm4TFCNAoc=w2400",
        },
        {
            url: "pong",
            title: "Pong",
            image_url: "https://lh5.googleusercontent.com/zP3oV6o-fIohDNyGMaGZ--Q-nj0vR4T4gEin3U8OcVS42KWKsTZ5xiTL6uD48jXrkdE=w2400",
            gif_url: "https://lh5.googleusercontent.com/bXYvfSq-gBmaCDzVLED8W8Ga0ZgLe-mALsGnp4fNFr0L5z1myAY2120aCBm4TFCNAoc=w2400",
        },
    ]

    const cardComponents = cards.map(card => <Card card={card}></Card>)

    return <div className="page-container">
        <div className="gallery-card-grid">
            {cardComponents}
        </div>
    </div>;
}

export default Gallery;