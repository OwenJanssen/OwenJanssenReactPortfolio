import "./InfiniteMaze.css";

import React from "react";
import { generateMaze, Maze, MazeRow, MazeTile } from "./InfiniteMazeUtils";

export const InfiniteMaze = ({ containerRef }): React.ReactElement => {
    return <div className="page-container">
        <div className="page-title">Infinite Maze</div>
        <div className="maze-container">
            <MazeComponent maze={generateMaze(10, 10)} />
        </div>
    </div>;
};

const MazeComponent = (props: { maze: Maze }): React.ReactElement => {
    const maze: Maze = props.maze;

    return <div className={"maze"}>
        {maze.map((mazeRow: MazeRow, row: number) => <MazeRowComponent mazeRow={mazeRow} row={row} key={row} />)}
    </div>;
};

const MazeRowComponent = (props: { mazeRow: MazeRow, row: number }): React.ReactElement => {
    const mazeRow: MazeRow = props.mazeRow;
    const key = `maze-row-${props.row}`;

    return <div className={"maze-row"} data-test-id={key} key={key}>
        {mazeRow.map((mazeTile: MazeTile, column: number) =>
            <MazeTileComponent
                mazeTile={mazeTile}
                row={props.row}
                column={column}
                key={`row-${props.row}-col-${column}`}/>)}
    </div>;
}

const MazeTileComponent = (props: { mazeTile: MazeTile, row: number, column: number }): React.ReactElement => {
    const mazeTile: MazeTile = props.mazeTile;
    const key = `maze-tile-row-${props.row}-col-${props.column}`;
    
    return <div className={"maze-tile"} data-test-id={key} key={key}>
        {mazeTile.north && <div className={"north-path"} />}
        {mazeTile.east && <div className={"east-path"} />}
        {mazeTile.south && <div className={"south-path"} />}
        {mazeTile.west && <div className={"west-path"} />}
    </div>;
};