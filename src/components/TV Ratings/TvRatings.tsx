import './TvRatings.css'
import '../../App.css'
import React, { useEffect, useRef, useState } from 'react';
import SearchBox from '../SearchBox';
import { TvShow, TvRatingsList } from './TvRatingsList';
import { rankedSearchResults, stringSortFunction } from '../../utilities/stringFunctions';

import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HomeButton from '../HomeButton';
import TvShowCard from './TvShowCard';

const tvShowObjectFromTitle = (title: string, shows: TvShow[]) => {
    return shows.filter(show => show.title===title)[0];
};

const getGenres = (shows: TvShow[]) => {
    const allGenres = shows.map(show => show.genres).flat();
    return allGenres.filter((item, index) => allGenres.indexOf(item) === index);
};

const TVRatings = () : React.ReactElement => {
    const alphabeticallySortedShows = [...TvRatingsList].sort((a, b) => stringSortFunction(a.title, b.title));
    const ratingSortedShows = [...TvRatingsList].sort((a, b) => b.rating-a.rating);
    const [ratings, setRatings] = useState<TvShow[]>(alphabeticallySortedShows);
    const [results, setResults] = useState<string[]>(alphabeticallySortedShows.map(s => s.title));

    const [showFilter, setShowFilter] = useState(false);
    const genres = getGenres(ratings);
    const [selectedGenres, setSelectedGenres] = useState(genres);
    const [showSort, setShowSort] = useState(false);
    const [sortMethod, setSortMethod] = useState("A to Z");

    const updateSelectedGenres = (genre: string) => {
        if (selectedGenres.indexOf(genre) === -1) {
            setSelectedGenres([...selectedGenres, genre]);
        }
        else {
            setSelectedGenres([...selectedGenres].filter(g => g !== genre));
        }
        setRatings([...ratings]);
    };

    useEffect(() => {
        const newRatings = results.map((title) => tvShowObjectFromTitle(title, ratings));
        setRatings(newRatings);
        if (JSON.stringify(newRatings) !== JSON.stringify(ratings)) {
            setSortMethod("");
        } 
    }, [results])

    return (
        <div className="page-container">
            <div className="page-title">TV Ratings</div>
            <div className="flex-row" style={{marginTop: '2rem'}}>
                <HomeButton/>
                <SearchBox listToSearch={ratings} setResults={setResults} searchKey={"title"} style={{marginLeft: '36px', marginRight: '36px'}}/>
                <IconButton style={{ marginRight: "18px"}} onClick={() => {setShowFilter(b => !b); setShowSort(false);}}>
                    <FilterAltIcon sx={{fontSize: "40px"}}/>
                </IconButton>
                <IconButton onClick={() => {setShowSort(b => !b); setShowFilter(false);}}>
                    <SortIcon sx={{fontSize: "40px"}}/>
                </IconButton>
            </div>
            
            {showFilter && <div className="flex-row" style={{marginTop: '2rem'}}>
                {genres.map((genre) => (
                    <div className="genre-button" onClick={() => updateSelectedGenres(genre)} style={{backgroundColor: selectedGenres.includes(genre) ? "orangered" : "cyan"}}>{genre}</div>
                ))}
            </div>}
            {showSort && <div className="flex-row" style={{marginTop: '2rem'}}>
                {["A to Z", "Rating"].map(sort => 
                    <div className="genre-button" style={{backgroundColor: (sortMethod === sort) ? "orangered" : "cyan"}}
                                                  onClick={() => {
                                                    if (sort === "A to Z") {
                                                        setRatings(alphabeticallySortedShows);
                                                    }
                                                    else if (sort === "Rating") {
                                                        setRatings(ratingSortedShows);
                                                    }
                                                    setSortMethod(sort);
                                                  }}>
                        {sort}
                    </div>
                )}
            </div>}
            
            <div className="tv-card-grid">
                {ratings
                    .filter((show) => {
                        const showInGenres = show.genres.filter(x => selectedGenres.indexOf(x) !== -1).length > 0;
                        return showInGenres;
                    })
                    .map(show => <TvShowCard show={show}/>)
                }
            </div>
        </div>
    )
}

export default TVRatings;