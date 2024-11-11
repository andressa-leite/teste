const findSnakeOnGrid = grid => {
    const directions = {
        '>': [1, 0],
        '<': [-1, 0],
        '^': [0, -1],
        'v': [0, 1]
    };

    const findHead = () => {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === 'h') return [x, y];
            }
        }
    };

    const getNextCoord = ([x, y], dir) => [x + dir[0], y + dir[1]];

    const isValidPosition = ([x, y]) => 
        y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;

    let position = findHead();
    let path = [position];
    let visited = new Set();
    visited.add(`${position[0]},${position[1]}`);

    while (true) {
        let [x, y] = position;
        let foundNext = false;

        for (let [char, dir] of Object.entries(directions)) {
            let [nextX, nextY] = getNextCoord([x, y], dir);
            if (
                isValidPosition([nextX, nextY]) &&
                !visited.has(`${nextX},${nextY}`) &&
                (grid[nextY][nextX] !== ' ' && grid[nextY][nextX] !== 'h')
            ) {
                position = [nextX, nextY];
                path.push(position);
                visited.add(`${nextX},${nextY}`);
                foundNext = true;
                break;
            }
        }

        if (!foundNext) break;
    }

    return path;
};