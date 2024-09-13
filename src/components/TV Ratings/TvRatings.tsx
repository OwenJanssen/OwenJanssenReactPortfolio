import './TvRatings.css'
import '../../App.css'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TvShow, TvRatingsList, Genre } from './TvRatingsList';
import { stringSortFunction } from '../../utilities/stringFunctions';

import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import HomeButton from '../HomeButton';
import { ChordDiagram, chordDiagramDimensions } from './ChordDiagram';
import { TvShowCardGrid } from './TvShowCardGrid';
import { GenresFilterBar } from './GenresFilterBar';
import { TextFilterBar } from './TextFilterBar';
import { Tooltip } from '@mui/material';

const tvShowObjectFromTitle = (title: string, shows: TvShow[]) => {
    return shows.filter(show => show.title===title)[0];
};

const getGenres = (shows: TvShow[]): Genre[] => {
    const allGenres: Genre[] = shows.map(show => show.genres).flat();
    // Remove duplicates and sort by genre name (alphabetically)
    return allGenres.filter((item, index) => allGenres.indexOf(item) === index);
};

const tvShowsToGenreMatrix = (shows: TvShow[], genres: Genre[]): number[][] => {
    let matrix: number[][] = (new Array(genres.length)).fill(0).map(_ => (new Array(genres.length)).fill(0));

    for (let primaryGenre = 0; primaryGenre < genres.length; primaryGenre++) {
        for (let secondaryGenre = 0; secondaryGenre < genres.length; secondaryGenre++) {
            let showsWithBothGenres: number = 0;

            shows.forEach(show => {
                if (!(show.genres.includes(genres[primaryGenre]) && show.genres.includes(genres[secondaryGenre]))) {
                    return;
                }

                if (primaryGenre !== secondaryGenre) {
                    showsWithBothGenres++;
                }

                else {
                    // only add a chord from a genre to itself if the show is just that one genre
                    if (show.genres.length === 1) {
                        showsWithBothGenres++;
                    }
                }
            })

            matrix[primaryGenre][secondaryGenre] = showsWithBothGenres;
        }   
    }

    return matrix;
};

const genres: Genre[] = getGenres(TvRatingsList).sort((a: Genre, b: Genre) => stringSortFunction(a.name, b.name));
const matrixForChordDiagram: number[][] = tvShowsToGenreMatrix(TvRatingsList, genres);

const sortAlphabetically = (shows: TvShow[]): TvShow[] => [...shows].sort((a: TvShow, b: TvShow) => stringSortFunction(a.title, b.title));
const sortByRating = (shows: TvShow[]): TvShow[] => [...shows].sort((a: TvShow, b: TvShow) => b.rating - a.rating);
const sortByFilterString = (shows: TvShow[], searchString: string): TvShow[] => [...shows].sort((a: TvShow, b: TvShow) => a.title.indexOf(searchString) - b.title.indexOf(searchString));

enum SortMethods {
    A_TO_Z = "A to Z",
    RATING = "Rating",
    SEARCH = "Search"
}

const TVRatings = ({ containerRef }): React.ReactElement => {
    const [filterText, setFilterText] = useState<string>("");
    const [shows, setShows] = useState<TvShow[]>(sortAlphabetically(TvRatingsList));
    const [numberOfSelectedGenres, setNumberOfSelectedGenres] = useState<number>(0);

    const [sortMethod, setSortMethod] = useState<SortMethods>(SortMethods.A_TO_Z);

    const chordDiagramContainerRef = useRef<HTMLDivElement>(null);
    
    const updateSelectedGenres = (genre: Genre): void => {
        if (genre.selected)
        {
            genre.selected = false;
            setNumberOfSelectedGenres(n => n - 1);
        }
        else
        {
            genre.selected = true;
            setNumberOfSelectedGenres(n => n + 1);
        }
        setShows([...shows]);
    };

    const updateAllGenres = (select: boolean): void => {
        if (select)
        {
            genres.forEach(genre => genre.selected = true);
            setNumberOfSelectedGenres(genres.length);
        }
        else
        {
            genres.forEach(genre => genre.selected = false);
            setNumberOfSelectedGenres(0);
        }
        setShows([...shows]);
    }

    const updateSortMethod = (sort: SortMethods): void => {
        if (sort === SortMethods.A_TO_Z) {
            setShows(sortAlphabetically(shows));
        }
        else if (sort === SortMethods.RATING) {
            setShows(sortByRating(shows));
        }
        setSortMethod(sort);
    };

    const filterOnText = (value: string): void => {
        setFilterText(value);
        const filteredShows = TvRatingsList.filter((show: TvShow) => show.title.indexOf(value) >= 0);
        setShows(sortByFilterString(filteredShows, value));
        setSortMethod(SortMethods.SEARCH);
    };

    const chordOnClick = (genre1: Genre, genre2: Genre) => {
        updateAllGenres(false);
        updateSelectedGenres(genre1);
        if (genre1.name !== genre2.name) {
            updateSelectedGenres(genre2);
        }
    }

    const chordTooltipFunction = (genre1: Genre, genre2: Genre) => {
        if (genre1.name === genre2.name) {
            return `Click to see ${genre1.name.toLocaleLowerCase()} shows`;
        }
        return `Click to see ${genre1.name.toLocaleLowerCase()} and ${genre2.name.toLocaleLowerCase()} shows`;
    }

    return <div className="page-container tv-ratings">
        <div className="page-title">TV Ratings</div>
        <div className="flex-row top-level-button-container">
            <HomeButton />
            <TextFilterBar text={filterText} setText={filterOnText} />
        </div>

        <div className={"tv-show-data-container"}>
            <div className={"left-side-container"}>
                <div className={"button-bars-container"}>
                    <div className={"buttons-bar sort"}>
                        <div className={"label"}>Sort:</div>
                        <div className={"button-grid"}>
                            {[SortMethods.A_TO_Z, SortMethods.RATING].map((sort: SortMethods) =>
                                <div className={"selectable-button " + (sortMethod === sort ? "selected" : "unselected")}
                                    key={sort}
                                    onClick={() => updateSortMethod(sort)}>
                                    {sort}
                                </div>
                            )}
                        </div>
                    </div>
                
                    <GenresFilterBar genres={genres}
                        numberOfSelectedGenres={numberOfSelectedGenres}
                        updateSelectedGenres={updateSelectedGenres}
                        updateAllGenres={updateAllGenres}/>
                </div>

                <div className={"genres-diagram-section"}>
                    <Tooltip title={"Each arc represents a genre, and chords between genres show TV shows that belong to both."}>
                        <div className={"label"}>Genre Relationships:</div>
                    </Tooltip>
                    <div className={"chord-diagram-container"} ref={chordDiagramContainerRef}>
                        <ChordDiagram
                            matrix={matrixForChordDiagram}
                            items={genres}
                            labelFunction={(genre: Genre) => genre.name}
                            colorFunction={(genre: Genre) => genre.selected ? genre.selectedColor : genre.color}
                            selectedFunction={(genre: Genre) => genre.selected}
                            groupOnClick={(genre: Genre) => updateSelectedGenres(genre)}
                            chordOnClick={chordOnClick}
                            chordTooltipFunction={chordTooltipFunction}
                            containerRef={chordDiagramContainerRef} />
                    </div>
                </div>
            </div>
            
            <div className={"tv-card-grid-container"}>
                <TvShowCardGrid
                    filterText={filterText}
                    numberOfSelectedGenres={numberOfSelectedGenres}
                    shows={shows}/>
            </div>
        </div>
    </div>;
}

export default TVRatings;