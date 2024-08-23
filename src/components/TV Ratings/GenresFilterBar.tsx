import './TvRatings.css'
import React from 'react';
import { Genre } from './TvRatingsList';

export type GenreFilterBarProps = {
    genres: Genre[],
    numberOfSelectedGenres: number,
    updateSelectedGenres: (genre: Genre) => void,
    updateAllGenres: (value: boolean) => void
};

export const GenresFilterBar = (props: GenreFilterBarProps): React.ReactElement => {

    return <div className="genre-filter-buttons-bar">
        {props.genres.map((genre: Genre) =>
            // use numberOfSelectedGenres in key because its observable and will update will the genre is selected so it will cause a rerender
            <div className={"genre-filter-button " + (genre.selected ? "selected" : "unselected")}
                key={genre.name + props.numberOfSelectedGenres}
                onClick={() => props.updateSelectedGenres(genre)}>
                {genre.name}
            </div>
        )}

        <div className="genre-filter-button" key={"Select All"} onClick={() => props.updateAllGenres(false)}>
            {"Unselect All"}
        </div>
    </div>
};
