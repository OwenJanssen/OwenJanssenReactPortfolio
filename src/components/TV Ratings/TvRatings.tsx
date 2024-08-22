import './TvRatings.css'
import '../../App.css'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SearchBox from '../SearchBox';
import { TvShow, TvRatingsList, Genre } from './TvRatingsList';
import { stringSortFunction } from '../../utilities/stringFunctions';

import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import HomeButton from '../HomeButton';
import TvShowCard from './TvShowCard';
import { ChordDiagram } from './ChordDiagram';

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

enum SortMethods {
    SEARCH = "Search",
    A_TO_Z = "A to Z",
    RATING = "Rating"
}

const sortAlphabetically = (shows: TvShow[]): TvShow[] => [...shows].sort((a: TvShow, b: TvShow) => stringSortFunction(a.title, b.title));
const sortByRating = (shows: TvShow[]): TvShow[] => [...shows].sort((a: TvShow, b: TvShow) => b.rating - a.rating);

const TVRatings = ({ containerRef }): React.ReactElement => {
    const [sortedShows, setSortedShows] = useState<TvShow[]>(sortAlphabetically(TvRatingsList));
    const [searchResults, setSearchResults] = useState<string[]>(sortAlphabetically(TvRatingsList).map(s => s.title));
    const [numberOfSelectedGenres, setNumberOfSelectedGenres] = useState<number>(0);

    const [showSort, setShowSort] = useState<boolean>(false);
    const [sortMethod, setSortMethod] = useState<SortMethods>(SortMethods.A_TO_Z);
    const [chordDiagramDimensions, setChordDiagramDimensions] = useState({width: 400, height: 400, inner: 100, outer: 150});

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
        setSortedShows([...sortedShows]);
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
        setSortedShows([...sortedShows]);
    }

    const updateSortMethod = (sort: SortMethods): void => {
        if (sort === SortMethods.A_TO_Z) {
            setSortedShows(sortAlphabetically(sortedShows));
        }
        else if (sort === SortMethods.RATING) {
            setSortedShows(sortByRating(sortedShows));
        }
        setSortMethod(sort);
    };

    useEffect(() => {
        const newRatings = searchResults.map((title) => tvShowObjectFromTitle(title, sortedShows));
        setSortedShows(newRatings);
    }, [searchResults]);

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
            <SearchBox listToSearch={sortedShows} setResults={setSearchResults} searchKey={"title"} style={{ marginLeft: '36px', marginRight: '36px' }} />
            <IconButton onClick={() => { setShowSort(b => !b) }}>
                <SortIcon sx={{ fontSize: "40px" }} />
            </IconButton>
        </div>
        
        {showSort && <div className="flex-row" style={{ marginTop: '2rem', flexWrap: "wrap" }}>
            {[SortMethods.A_TO_Z, SortMethods.RATING].map((sort: SortMethods) =>
                <div className="genre-button" style={{ backgroundColor: (sortMethod === sort) ? "orangered" : "cyan" }}
                    key={sort} onClick={() => updateSortMethod(sort)}>
                    {sort}
                </div>
            )}
        </div>}

        <div className="flex-row" style={{ marginTop: '2rem' }}>
            {genres.map((genre: Genre) => (
                <div className="genre-button" style={{ backgroundColor: genre.selected ? "orangered" : "cyan" }}
                    key={genre.name} onClick={() => updateSelectedGenres(genre)}>
                    {genre.name}
                </div>
            ))}

            <div className="genre-button" key={"Select All"} onClick={() => updateAllGenres(false)}>
                {"Unselect All"}
            </div>
        </div>

        <div className="flex-row" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "3rem", justifyContent: "space-between" }}>
            <div className={"chord-diagram-container"}>
                <ChordDiagram matrix={matrixForChordDiagram}
                    groupLabels={genres.map((genre: Genre) => genre.name)}
                    groupColors={chordColors}
                    height={chordDiagramDimensions.height}
                    width={chordDiagramDimensions.width}
                    outerRadius={chordDiagramDimensions.outer}
                    innerRadius={chordDiagramDimensions.inner}
                    style={chordDiagramStyle}
                    groupOnClick={(genre_i: number) => updateSelectedGenres(genres[genre_i])}/>
            </div>
            
            <div className="tv-card-grid" style={{ flex: 1, height: chordDiagramDimensions.height, marginLeft: "1.5rem" }}>
                {sortedShows
                    .filter((show: TvShow) => {
                        const numSelectedGenresForShow = show.genres.filter((genre: Genre) => genre.selected).length;
                        console.log(numSelectedGenresForShow, numberOfSelectedGenres);
                        return numSelectedGenresForShow === numberOfSelectedGenres;
                    })
                    .map((show: TvShow, i: number) => <TvShowCard show={show} key={show.title}/>)
                }
            </div>
        </div>
    </div>;
}

export default TVRatings;