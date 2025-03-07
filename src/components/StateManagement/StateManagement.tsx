import React from 'react';
import { UseStateExample } from './UseStateExample';
import './StateManagement.css';

export function StateManagement() {
    return <div className={"state-management page-container"}>
        <UseStateExample/>
        <UseStateExample/>
        <UseStateExample/>
        <UseStateExample/>
    </div>;
}

export function Balloon(props: BalloonProps): React.ReactElement {
    const { length, setLength, size, setSize, color, setColor } = props;

    return <div className={"balloon-container"}>
        <div className={"balloon"} style={{ color: color }}>
            {`length: ${length}, size: ${size}, color: ${color}`}
        </div>
        <form className={"inputs"}>
            <label htmlFor={"length"}>Length:</label>
            <input id={"length"} type="number" min="1" max="100" value={props.length} onChange={(e) => setLength(parseInt(e.target.value))} />
            <label htmlFor={"size"}>Size:</label>
            <input id={"size"} type="number" min="1" max="100" value={props.size} onChange={(e) => setSize(parseInt(e.target.value))} />
            <label htmlFor={"color"}>Color:</label>
            <input id={"color"} type="color" value={props.color} onChange={(e) => setColor(e.target.value)} />
        </form>
    </div>
}

export interface BalloonProps {
    length: number;
    setLength: (length: number) => void;
    size: number;
    setSize: (length: number) => void;
    color: string;
    setColor: (color: string) => void;
}