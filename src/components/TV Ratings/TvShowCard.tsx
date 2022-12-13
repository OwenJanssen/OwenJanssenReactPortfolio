import React, { useEffect, useRef, useState } from 'react';

const TvShowCard = ({show}) : React.ReactElement => {
    const [title, setTitle] = useState(show.title + " ");
    const scrollText = useRef(false);

    const makeTextScroll = () => {
        if (scrollText.current) {
            setTitle((t) => {
                const first = t[0];
                return t.substring(1, t.length) + first;
            });
        }
    };

    useEffect(() => {
        setTitle(show.title + " ");
        scrollText.current = false;
        if (show.title.length > 15) {
            const timerId = setInterval(makeTextScroll, 250);
            return () => clearInterval(timerId);
        }
    }, [show.title]);
                    
    return (
        <div className="card" key={show.title} onMouseEnter={() => scrollText.current=true} onMouseLeave={() => {
            scrollText.current=false;
            setTitle(show.title + " ")
        }}>
            <div className="img-container"><img src={show.image_url} className="img"/></div>
            <div className="card-text">
                <div className="title">{title}</div>
                <div className="rating">{show.rating}/10</div>
                <div className="favorite-episode">Favorite Episode:</div>
                <div className="favorite-episode">{show['favorite episode']}</div>
            </div>
        </div>
    )
};

export default TvShowCard;