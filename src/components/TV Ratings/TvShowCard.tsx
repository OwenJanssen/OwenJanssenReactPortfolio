import React, { useEffect, useRef, useState } from 'react';
import { TvShow } from './TvRatingsList';

const TvShowCard = ({show}) : React.ReactElement => {
    const show_ : TvShow = show;
    const [title, setTitle] = useState(show_.title + " ");
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
        setTitle(show_.title + " ");
        scrollText.current = false;
        if (show_.title.length > 14) {
            const timerId = setInterval(makeTextScroll, 250);
            return () => clearInterval(timerId);
        }
    }, [show_.title]);
                    
    return (
        <div className="card" key={show_.title} onMouseEnter={() => scrollText.current=true} onMouseLeave={() => {
            scrollText.current=false;
            setTitle(show_.title + " ")
        }}>
            <div className="img-container"><img src={show_.image_url} className="img"/></div>
            <div className="card-text">
                <div className="title">{title}</div>
                <div className="rating">{show_.rating}/10</div>
                <div className="favorite-episode">Favorite Episode:</div>
                <div className="favorite-episode">{show_['favorite episode']}</div>
                <div className="flex-row" style={{
                        maxWidth: "100%",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        marginTop: "2px",
                        marginBottom: "2px",
                        flex: 2,
                    }}>
                    {show_.genres.map((genre) => {
                        return <div className="genre-for-card">{genre}</div>;
                    })}
                </div>
            </div>
        </div>
    )
};

export default TvShowCard;