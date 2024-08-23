import React from 'react';
import { chordDiagramDimensions } from './ChordDiagram';
import { Genre, TvShow } from './TvRatingsList';
import TvShowCard from './TvShowCard';

export type TvShowCardGridProps = {
    chordDiagramDimensions: chordDiagramDimensions
    filterText: string;
    numberOfSelectedGenres: number;
    shows: TvShow[];
};

export const TvShowCardGrid = (props: TvShowCardGridProps): React.ReactElement => {
    const filteredShows: TvShow[] = props.shows.filter((show: TvShow) => {
        const numSelectedGenresForShow = show.genres.filter((genre: Genre) => genre.selected).length;
        return numSelectedGenresForShow === props.numberOfSelectedGenres;
    });
            
    return <div className="tv-card-grid" style={{ height: props.chordDiagramDimensions.height }}>
        {filteredShows.map((show: TvShow, i: number) =>
            <TvShowCard show={show} filterString={props.filterText} key={show.title} />
        )}
    </div>
};
