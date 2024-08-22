import React, { useEffect, useRef, useState } from 'react';
import { TvShow } from './TvRatingsList';

type TvShowCardProps = {
    show: TvShow
}

const TvShowCard = ({ show }: TvShowCardProps): React.ReactElement => {
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
        if (show.title.length > 14) {
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
                <div className="title" key="title">{title}</div>
                <div className="rating" key="rating">{show.rating}/10</div>
                <div className="favorite-episode" key="favorite-episode-label">Favorite Episode:</div>
                <div className="favorite-episode" key="favorite-episode-text">{show['favorite episode']}</div>
                <div className="flex-row" style={{
                        maxWidth: "100%",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        marginTop: "2px",
                        marginBottom: "2px",
                        flex: 2,
                    }}>
                    {show.genres.map((genre) =>
                        <div className="genre-for-card" key={genre.name}>{genre.name}</div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default TvShowCard;