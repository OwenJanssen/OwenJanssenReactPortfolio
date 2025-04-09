import React, { ReactElement, useEffect, useState } from 'react';
import './Gallery.css';
import { Card } from './GalleryCard';

const html = document.documentElement;

export type GalleryCard = {
    url: string;
    title: string;
    image_url: string;
    gif_url?: string;
    altImgComponent?: ReactElement;
}

const Gallery = (): React.ReactElement => {
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = html.scrollTop;
            const maxScrollTop = (4 * window.innerHeight);
            if (scrollTop >= maxScrollTop) {
                setShowHeader(true);
            }
            else {
                setShowHeader(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setShowHeader]);


    const chorusText = "Make music with your friends.\n\n Class:\nRapid Prototyping for Software Development";
    const teacherConnectText = "Enabling teachers to connect with their students.\n\n Class:\nHuman Computer Interaction Studio\n\n*unfinished*";
    const terrorInTechText = "Fight waves of Geese invading NU to protect your professor Ian.\n\n Class:\nGame Design Studio"

    const cards: GalleryCard[] = [
        {
            url: "about-me",
            title: "About Me",
            image_url: "../../../Headshot.jpeg",
            gif_url: "../../../Headshot.jpeg",
        },
        {
            url: "tv-ratings",
            title: "TV Ratings",
            image_url: "../../../TV.png",
            gif_url: "../../../TV.png",
        },
        {
            url: "chorus",
            title: "Chorus",
            image_url: "../../../Chorus Cover.png",
            altImgComponent: <div className={"card-alt-text"}>{chorusText}</div>
        },
        {
            url: "hotdog-hangout",
            title: "Hotdog Hangout",
            image_url: "../../../hotdog-cover.jpeg",
            gif_url: "../../../hotdog-gif.gif"
        },
        {
            url: "teacher-connect",
            title: "Teacher Connect",
            image_url: "../../../pencil_icon.svg",
            altImgComponent: <div className={"card-alt-text"}>{teacherConnectText}</div>
        },
        {
            url: "terror-in-tech",
            title: "Terror In Tech",
            image_url: "../../../TerrorInTechCover.png",
            altImgComponent: <div className={"card-alt-text"}>{terrorInTechText}</div>
        },
        {
            url: "pong",
            title: "Pong",
            image_url: "https://lh5.googleusercontent.com/zP3oV6o-fIohDNyGMaGZ--Q-nj0vR4T4gEin3U8OcVS42KWKsTZ5xiTL6uD48jXrkdE=w2400",
            gif_url: "https://lh5.googleusercontent.com/bXYvfSq-gBmaCDzVLED8W8Ga0ZgLe-mALsGnp4fNFr0L5z1myAY2120aCBm4TFCNAoc=w2400",
        },
    ]

    const cardComponents = cards.map(card => <Card key={card.url} card={card}></Card>)

    return <div className="page-container">
        <div className="header">OWEN JANSSEN</div>
        <div className="gallery-card-grid">
            {cardComponents}
        </div>
    </div>;
}

export default Gallery;