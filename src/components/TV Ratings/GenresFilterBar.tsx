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

    return <div className="buttons-bar">
        <div className="label">Filter By Genre: </div>
        <div className="button-grid">
            {props.genres.map((genre: Genre) =>
                // use numberOfSelectedGenres in key because its observable and will update will the genre is selected so it will cause a rerender
                <div className={"selectable-button " + (genre.selected ? "selected" : "unselected")}
                    key={genre.name + props.numberOfSelectedGenres}
                    onClick={() => props.updateSelectedGenres(genre)}>
                    {genre.name}
                </div>
            )}

            <div className="selectable-button unselected"
                key={"Unselect All"}
                onClick={() => props.updateAllGenres(false)}>
                {"Unselect All"}
            </div>
        </div>
    </div>
};
