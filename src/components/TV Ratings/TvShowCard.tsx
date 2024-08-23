import React, { useEffect, useRef, useState } from 'react';
import { TvShow } from './TvRatingsList';

export type TvShowCardProps = {
    show: TvShow,
    filterString: string
};

const TvShowTitle = ({ title, filterString }: { title: string, filterString: string }): React.ReactElement => {
    const indexOfFilterString = title.indexOf(filterString);

    const beforeString = title.slice(0, indexOfFilterString);
    const afterString = title.slice(indexOfFilterString + filterString.length, title.length);

    return <div className={"title"} key={"title"}>
        {beforeString}
        <div className={"highlighted"}>{filterString}</div>
        {afterString}
    </div>
};

export const TvShowCard = ({ show, filterString }: TvShowCardProps): React.ReactElement => {
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
                 
    const onMouseEnter = () => scrollText.current = true;

    const onMouseLeave = () => {
        scrollText.current = false;
        setTitle(show.title + " ")
    };

    return <div className="card"
        key={show.title}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        <div className={"img-container"}>
            <img src={show.image_url} className={"img"} />
        </div>
        <div className="card-text">
            <TvShowTitle title={title} filterString={filterString} />
            <div className={"rating"} key={"rating"}>{show.rating}/10</div>
            <div className={"favorite-episode"} key={"favorite-episode-label"}>Favorite Episode:</div>
            <div className={"favorite-episode"} key={"favorite-episode-text"}>{show['favorite episode']}</div>
            <div className={"genres-section"}>
                {show.genres.map((genre) =>
                    <div className="genre-chiclet" key={genre.name}>{genre.name}</div>
                )}
            </div>
        </div>
    </div>;
};

export default TvShowCard;