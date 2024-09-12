import React from 'react';
import { Genre, TvShow } from './TvRatingsList';
import TvShowCard from './TvShowCard';

export type TvShowCardGridProps = {
    filterText: string;
    numberOfSelectedGenres: number;
    shows: TvShow[];
};

export const TvShowCardGrid = (props: TvShowCardGridProps): React.ReactElement => {
    const { filterText, numberOfSelectedGenres, shows } = props;
    
    const filteredShows: TvShow[] = shows.filter((show: TvShow) => {
        const numSelectedGenresForShow = show.genres.filter((genre: Genre) => genre.selected).length;
        return numSelectedGenresForShow === numberOfSelectedGenres;
    });
            
    return <div className="tv-card-grid">
        {filteredShows.map((show: TvShow, i: number) =>
            <TvShowCard show={show} filterString={filterText} key={show.title} firstCard={i === 0} lastCard={i === filteredShows.length} />
        )}
    </div>
};
