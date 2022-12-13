import '../App.css'
import React, { useState, KeyboardEvent } from 'react';
import { rankedSearchResults } from '../utilities/stringFunctions';

const SearchBox = ({listToSearch, setResults, searchKey, style}) : React.ReactElement => {
    const [searchText, setSearchText] = useState("");

    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key)
        if (e.key === "Enter") {
            const searchResults = rankedSearchResults(searchText, listToSearch, searchKey);
            console.log(searchResults);
            setResults(searchResults);
        }
    }

    return (
        <input className='searchbox' 
               placeholder='Search...'
               value={searchText}
               onChange={(e) => setSearchText(e.target.value)}
               onKeyDown={keyDownHandler}
               style={style}/>
    )
}

export default SearchBox;