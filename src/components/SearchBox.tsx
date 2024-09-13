import '../App.css'
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { rankedSearchResults } from '../utilities/stringFunctions';

const SearchBox = ({listToSearch, setResults, searchKey, style}) : React.ReactElement => {
    const [searchText, setSearchText] = useState("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setResults(rankedSearchResults(searchText, listToSearch, searchKey));
        }
    }

    return <input
        className={"search-box"}
        placeholder={"Search..."}
        value={searchText}
        onChange={onChange}
        onKeyDown={keyDownHandler} />;
}

export default SearchBox;