document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const size = 4;
    let tiles = [];
    
    // Initialize board with empty tiles
    function initBoard() {
        for (let i = 0; i < size * size; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.value = 0;
            board.appendChild(tile);
            tiles.push(tile);
        }
        addNewTile();
        addNewTile();
    }

    // Add new tile with value 2 or 4
    function addNewTile() {
        let emptyTiles = tiles.filter(tile => tile.dataset.value == 0);
        if (emptyTiles.length == 0) return;
        let newTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        newTile.dataset.value = Math.random() < 0.9 ? 2 : 4;
        newTile.textContent = newTile.dataset.value;
    }

    // Handle key events for tile movements
    document.addEventListener('keydown', handleKeyPress);

    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                moveUp();
                break;
            case 'ArrowDown':
                moveDown();
                break;
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowRight':
                moveRight();
                break;
        }
    }

    // Move tiles up
    function moveUp() {
        for (let i = 0; i < size; i++) {
            let column = [];
            for (let j = 0; j < size; j++) {
                column.push(parseInt(tiles[j * size + i].dataset.value));
            }
            let newColumn = mergeTiles(column);
            for (let j = 0; j < size; j++) {
                tiles[j * size + i].dataset.value = newColumn[j];
                tiles[j * size + i].textContent = newColumn[j] != 0 ? newColumn[j] : '';
            }
        }
        addNewTile();
    }

    // Move tiles down
    function moveDown() {
        for (let i = 0; i < size; i++) {
            let column = [];
            for (let j = 0; j < size; j++) {
                column.push(parseInt(tiles[j * size + i].dataset.value));
            }
            let newColumn = mergeTiles(column.reverse()).reverse();
            for (let j = 0; j < size; j++) {
                tiles[j * size + i].dataset.value = newColumn[j];
                tiles[j * size + i].textContent = newColumn[j] != 0 ? newColumn[j] : '';
            }
        }
        addNewTile();
    }

    // Move tiles left
    function moveLeft() {
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(parseInt(tiles[i * size + j].dataset.value));
            }
            let newRow = mergeTiles(row);
            for (let j = 0; j < size; j++) {
                tiles[i * size + j].dataset.value = newRow[j];
                tiles[i * size + j].textContent = newRow[j] != 0 ? newRow[j] : '';
            }
        }
        addNewTile();
    }

    // Move tiles right
    function moveRight() {
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(parseInt(tiles[i * size + j].dataset.value));
            }
            let newRow = mergeTiles(row.reverse()).reverse();
            for (let j = 0; j < size; j++) {
                tiles[i * size + j].dataset.value = newRow[j];
                tiles[i * size + j].textContent = newRow[j] != 0 ? newRow[j] : '';
            }
        }
        addNewTile();
    }

    // Merge tiles
    function mergeTiles(line) {
        let newLine = line.filter(value => value != 0);
        for (let i = 0; i < newLine.length - 1; i++) {
            if (newLine[i] == newLine[i + 1]) {
                newLine[i] *= 2;
                newLine.splice(i + 1, 1);
            }
        }
        while (newLine.length < size) {
            newLine.push(0);
        }
        return newLine;
    }

    initBoard();
});
