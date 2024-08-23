import './TvRatings.css'
import React from 'react';

export type TextFilterBarProps = {
    text: string,
    setText: (value: string) => void,
};

export const TextFilterBar = (props: TextFilterBarProps): React.ReactElement => {
    return <input className={"searchbox text-filter-bar"}
        placeholder={"Search..."}
        value={props.text}
        onChange={(e) => props.setText(e.target.value)} />;
};
