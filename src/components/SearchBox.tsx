import '../App.css'
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { rankedSearchResults } from '../utilities/stringFunctions';

const SearchBox = (props: {listToSearch: any[], setResults: (results: any[]) => void, searchKey: string}): React.ReactElement => {
    const [searchText, setSearchText] = useState("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.setResults(rankedSearchResults(searchText, props.listToSearch, props.searchKey));
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