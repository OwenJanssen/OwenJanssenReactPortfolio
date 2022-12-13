import './TvRatings.css'
import '../../App.css'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SearchBox from '../SearchBox';
import { TvShow, TvRatingsList } from './TvRatingsList';
import { stringSortFunction } from '../../utilities/stringFunctions';

import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import HomeButton from '../HomeButton';
import TvShowCard from './TvShowCard';
import ChordDiagram from 'react-chord-diagram';
import { tvShowsToGenreMatrix } from '../../utilities/chordPlots';

const tvShowObjectFromTitle = (title: string, shows: TvShow[]) => {
    return shows.filter(show => show.title===title)[0];
};

const getGenres = (shows: TvShow[]) => {
    const allGenres = shows.map(show => show.genres).flat();
    return allGenres.filter((item, index) => allGenres.indexOf(item) === index);
};
const genres = getGenres(TvRatingsList).sort(stringSortFunction);

const matrixForChordDiagram = tvShowsToGenreMatrix(TvRatingsList, genres);
const chordColors = ["#300350", "#94167F", "#E93479", "#F9AC53", "#153CB4", "#01cdfe", "#05ffa1", "#fffb96", "#b967ff", "#ff71ce"];

const TVRatings = ({containerRef}) : React.ReactElement => {
    const alphabeticallySortedShows = [...TvRatingsList].sort((a, b) => stringSortFunction(a.title, b.title));
    const ratingSortedShows = [...TvRatingsList].sort((a, b) => b.rating-a.rating);
    const [ratings, setRatings] = useState<TvShow[]>(alphabeticallySortedShows);
    const [results, setResults] = useState<string[]>(alphabeticallySortedShows.map(s => s.title));

    const [showFilter, setShowFilter] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [showSort, setShowSort] = useState(false);
    const [sortMethod, setSortMethod] = useState("A to Z");
    const [chordDiagramDimensions, setChordDiagramDimensions] = useState({width: 400, height: 400, inner: 100, outer: 150});

    const updateSelectedGenres = (genre: string) => {
        if (selectedGenres.indexOf(genre) === -1) {
            setSelectedGenres([...selectedGenres, genre]);
        }
        else {
            setSelectedGenres([...selectedGenres].filter(g => g !== genre));
        }
        setRatings([...ratings]);
    };

    const updateSortMethod = (sort: string) => {
        if (sort === "A to Z") {
            setRatings(alphabeticallySortedShows);
        }
        else if (sort === "Rating") {
            setRatings(ratingSortedShows);
        }
        setSortMethod(sort);
    };

    useEffect(() => {
        const newRatings = results.map((title) => tvShowObjectFromTitle(title, ratings));
        setRatings(newRatings);
        if (JSON.stringify(newRatings) !== JSON.stringify(ratings)) {
            setSortMethod("");
        } 
    }, [results]);

    useLayoutEffect(() => {
        if (containerRef.current) {
            const height = containerRef.current.offsetHeight;

            console.log("DIMS CHANGED", {height: height/2, width: height/2, inner: 100, outer: 100+50});
            setChordDiagramDimensions({height: height/2.5, width: height/2.5, inner: height/10, outer: height/10 + 20})
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

    return (
        <div className="page-container">
            <div className="page-title">TV Ratings</div>
            <div className="flex-row" style={{marginTop: '2rem'}}>
                <HomeButton/>
                <SearchBox listToSearch={ratings} setResults={setResults} searchKey={"title"} style={{marginLeft: '36px', marginRight: '36px'}}/>
                <IconButton onClick={() => {setShowSort(b => !b); setShowFilter(false);}}>
                    <SortIcon sx={{fontSize: "40px"}}/>
                </IconButton>
            </div>
            
            {showSort && <div className="flex-row" style={{marginTop: '2rem'}}>
                {["A to Z", "Rating"].map(sort => 
                    <div className="genre-button" style={{backgroundColor: (sortMethod === sort) ? "orangered" : "cyan"}}
                                                  key={sort} onClick={() => updateSortMethod(sort)}>
                        {sort}
                    </div>
                )}
            </div>}

            <div className="flex-row" style={{marginTop: '2rem'}}>
                {genres.map((genre) => (
                    <div className="genre-button" style={{backgroundColor: selectedGenres.includes(genre) ? "orangered" : "cyan"}}
                                                  key={genre} onClick={() => updateSelectedGenres(genre)}>
                        {genre}
                    </div>
                ))}

                <div className="genre-button" key={"Select All"} onClick={() => setSelectedGenres([])}>
                    {"Unselect All"}
                </div>
            </div>

            <div className="flex-row" style={{width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "3rem", justifyContent: "space-between"}}>
                <div className={"chord-diagram-container"}>
                    <ChordDiagram matrix={matrixForChordDiagram}
                                  componentId={1}
                                  groupLabels={genres}
                                  groupColors={chordColors}
                                  height={chordDiagramDimensions.height}
                                  width={chordDiagramDimensions.width}
                                  outerRadius={chordDiagramDimensions.outer}
                                  innerRadius={chordDiagramDimensions.inner}
                                  style={chordDiagramStyle}
                                  groupOnClick={(genre_i: number) => updateSelectedGenres(genres[genre_i])}/>
                </div>
                
                <div className="tv-card-grid" style={{flex: 1, height: chordDiagramDimensions.height, marginLeft: "1.5rem"}}>
                    {ratings
                        .filter((show) => {
                            var matchingGenres = 0;
                            selectedGenres.forEach((genre) => {
                                if (show.genres.includes(genre)) { matchingGenres++; }
                            })
                            return matchingGenres === selectedGenres.length;
                        })
                        .map(show => <TvShowCard show={show} key={show.title}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default TVRatings;