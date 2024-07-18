document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const scoreDisplay = document.getElementById('score');
    const restartButton = document.getElementById('restartButton');
    const gameOverDisplay = document.getElementById('gameOver');
    const size = 4;
    let tiles = [];
    let score = 0;
    let startX, startY, endX, endY;

    // Initialize board with empty tiles
    function initBoard() {
        board.innerHTML = '';
        gameOverDisplay.style.display = 'none';
        tiles = [];
        for (let i = 0; i < size * size; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.value = 0;
            board.appendChild(tile);
            tiles.push(tile);
        }
        score = 0;
        updateScore();
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
    restartButton.addEventListener('click', initBoard);

    // Handle touch events for mobile devices
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    }

    function handleTouchEnd(event) {
        endX = event.changedTouches[0].clientX;
        endY = event.changedTouches[0].clientY;
        handleTouchMove();
    }

    function handleTouchMove() {
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Left or right swipe
            if (deltaX > 0) {
                moveRight();
            } else {
                moveLeft();
            }
        } else {
            // Up or down swipe
            if (deltaY > 0) {
                moveDown();
            } else {
                moveUp();
            }
        }
    }

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
        let moved = false;
        for (let i = 0; i < size; i++) {
            let column = [];
            for (let j = 0; j < size; j++) {
                column.push(parseInt(tiles[j * size + i].dataset.value));
            }
            let newColumn = mergeTiles(column);
            for (let j = 0; j < size; j++) {
                if (tiles[j * size + i].dataset.value != newColumn[j]) moved = true;
                tiles[j * size + i].dataset.value = newColumn[j];
                tiles[j * size + i].textContent = newColumn[j] != 0 ? newColumn[j] : '';
            }
        }
        if (moved) {
            addNewTile();
            checkGameOver();
        }
    }

    // Move tiles down
    function moveDown() {
        let moved = false;
        for (let i = 0; i < size; i++) {
            let column = [];
            for (let j = 0; j < size; j++) {
                column.push(parseInt(tiles[j * size + i].dataset.value));
            }
            let newColumn = mergeTiles(column.reverse()).reverse();
            for (let j = 0; j < size; j++) {
                if (tiles[j * size + i].dataset.value != newColumn[j]) moved = true;
                tiles[j * size + i].dataset.value = newColumn[j];
                tiles[j * size + i].textContent = newColumn[j] != 0 ? newColumn[j] : '';
            }
        }
        if (moved) {
            addNewTile();
            checkGameOver();
        }
    }

    // Move tiles left
    function moveLeft() {
        let moved = false;
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(parseInt(tiles[i * size + j].dataset.value));
            }
            let newRow = mergeTiles(row);
            for (let j = 0; j < size; j++) {
                if (tiles[i * size + j].dataset.value != newRow[j]) moved = true;
                tiles[i * size + j].dataset.value = newRow[j];
                tiles[i * size + j].textContent = newRow[j] != 0 ? newRow[j] : '';
            }
        }
        if (moved) {
            addNewTile();
            checkGameOver();
        }
    }

    // Move tiles right
    function moveRight() {
        let moved = false;
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(parseInt(tiles[i * size + j].dataset.value));
            }
            let newRow = mergeTiles(row.reverse()).reverse();
            for (let j = 0; j < size; j++) {
                if (tiles[i * size + j].dataset.value != newRow[j]) moved = true;
                tiles[i * size + j].dataset.value = newRow[j];
                tiles[i * size + j].textContent = newRow[j] != 0 ? newRow[j] : '';
            }
        }
        if (moved) {
            addNewTile();
            checkGameOver();
        }
    }

    // Merge tiles
    function mergeTiles(tiles) {
        let newTiles = tiles.filter(value => value != 0);
        for (let i = 0; i < newTiles.length - 1; i++) {
            if (newTiles[i] == newTiles[i + 1]) {
                newTiles[i] *= 2;
                score += newTiles[i];
                newTiles[i + 1] = 0;
            }
        }
        newTiles = newTiles.filter(value => value != 0);
        while (newTiles.length < size) {
            newTiles.push(0);
        }
        updateScore();
        return newTiles;
    }

    // Update score display
    function updateScore() {
        scoreDisplay.textContent = `分數: ${score}`;
    }

    // Check if game is over
    function checkGameOver() {
        let gameOver = true;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let current = parseInt(tiles[i * size + j].dataset.value);
                if (current == 0) {
                    gameOver = false;
                }
                if (i > 0 && current == parseInt(tiles[(i - 1) * size + j].dataset.value)) {
                    gameOver = false;
                }
                if (i < size - 1 && current == parseInt(tiles[(i + 1) * size + j].dataset.value)) {
                    gameOver = false;
                }
                if (j > 0 && current == parseInt(tiles[i * size + (j - 1)].dataset.value)) {
                    gameOver = false;
                }
                if (j < size - 1 && current == parseInt(tiles[i * size + (j + 1)].dataset.value)) {
                    gameOver = false;
                }
            }
        }
        if (gameOver) {
            gameOverDisplay.style.display = 'block';
        }
    }

    // Start game
    initBoard();
});
