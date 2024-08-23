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
const chordColors: string[] = ["#300350", "#94167F", "#E93479", "#F9AC53", "#153CB4", "#01cdfe", "#05ffa1", "#fffb96", "#b967ff", "#ff71ce"];

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

    const [showSort, setShowSort] = useState<boolean>(false);
    const [sortMethod, setSortMethod] = useState<SortMethods>(SortMethods.A_TO_Z);
    const [chordDiagramDimensions, setChordDiagramDimensions] = useState<chordDiagramDimensions>({
        width: 400, height: 400, innerRadius: 100, outerRadius: 150
    });

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

    useLayoutEffect(() => {
        if (containerRef.current) {
            const height = containerRef.current.offsetHeight;
            const sideArea = height - 575;

            setChordDiagramDimensions({height: Math.max(sideArea, 210), width: Math.max(sideArea, 210), inner: sideArea/4, outer: sideArea/4 + 20});
        }
    }, [containerRef.current, containerRef.current]);

    const chordDiagramStyle = {
        fontSize: 1 * (containerRef.current?.offsetHeight/1080) + "rem",
        fontWeight: "600",
        fontFamily: "Monaco, monospace",
        letterSpacing: "-1px",
        lineHeight: "1rem",
        color: "black",
    };

    return <div className="page-container">
        <div className="page-title">TV Ratings</div>
        <div className="flex-row" style={{ marginTop: '2rem' }}>
            <HomeButton />
            <TextFilterBar text={filterText} setText={filterOnText} />
            <IconButton onClick={() => { setShowSort(b => !b) }}>
                <SortIcon sx={{ fontSize: "40px" }} />
            </IconButton>
        </div>
        
        {showSort && <div className="flex-row" style={{ marginTop: '2rem', flexWrap: "wrap" }}>
            {[SortMethods.A_TO_Z, SortMethods.RATING].map((sort: SortMethods) =>
                <div className={"genre-filter-button " + (sortMethod === sort ? "selected" : "unselected")}
                    key={sort}
                    onClick={() => updateSortMethod(sort)}>
                    {sort}
                </div>
            )}
        </div>}

        <GenresFilterBar genres={genres}
            numberOfSelectedGenres={numberOfSelectedGenres}
            updateSelectedGenres={updateSelectedGenres}
            updateAllGenres={updateAllGenres}/>

        <div className={"tv-show-data-container"}>
            <div className={"chord-diagram-container"}>
                <ChordDiagram
                    matrix={matrixForChordDiagram}
                    groupLabels={genres.map((genre: Genre) => genre.name)}
                    groupColors={chordColors}
                    dimensions={chordDiagramDimensions}
                    style={chordDiagramStyle}
                    groupOnClick={(genre_i: number) => updateSelectedGenres(genres[genre_i])}/>
            </div>
            
            <TvShowCardGrid
                chordDiagramDimensions={chordDiagramDimensions}
                filterText={filterText}
                numberOfSelectedGenres={numberOfSelectedGenres}
                shows={shows}/>
        </div>
    </div>;
}

export default TVRatings;