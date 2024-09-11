export type Maze = MazeRow[]

export type MazeRow = MazeTile[];

export type MazeTile = {
    north: boolean,
    east: boolean,
    south: boolean,
    west: boolean
};

export enum MazeDirection {
    North,
    East,
    South,
    West
};

// Generate either true or false randomly
export const randomBoolean = (): boolean => {
    return Math.random() >= 0.5;
}

export const generateMazeTile = (northTile?: MazeTile, eastTile?: MazeTile, southTile?: MazeTile, westTile?: MazeTile): MazeTile => {
    const returnTile = { north: randomBoolean(), east: randomBoolean(), south: randomBoolean(), west: randomBoolean() };

    // check the surrounding tiles to determine which sides need to connect
    if (northTile != null) {
        // console.log("north" + northTile);
        returnTile.north = northTile.south;
    }
    if (eastTile != null) {
        // console.log("east" + eastTile);
        returnTile.west = eastTile.east;
    }
    if (southTile != null) {
        // console.log("south" + southTile);
        returnTile.south = southTile.north;
    }
    if (westTile != null) {
        // console.log("west" + westTile);
        returnTile.east = westTile.west;
    }

    return returnTile;
};

export const generateMaze = (rows: number, columns: number): Maze => {
    let maze: Maze = [[]];
    
    for (let row = 0; row < rows; row++) {
        maze[row] = [];
        for (let column = 0; column < columns; column++) {
            // maze is being generated from the north east down to the south west, so we will only ever have nort and east tiles generated already
            const nortTile: MazeTile | undefined = row > 0 ? maze[row - 1][column] : undefined;
            console.log("north");
            console.log(nortTile);
            const eastTile: MazeTile | undefined = column > 0 ? maze[row][column - 1] : undefined;
            console.log("east");
            console.log(eastTile);
            const newTile: MazeTile = generateMazeTile(nortTile, eastTile);;
            console.log("new");
            console.log(newTile);

            maze[row][column] = newTile;
        }
    }

    return maze;
}

export const generateNewTiles = (maze: Maze, direction: MazeDirection): Maze => {
    return maze;
}