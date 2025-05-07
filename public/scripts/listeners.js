import { setValue, setColor } from './value_and_color.js';
import { isCorrectPlacement } from './placement.js';
import { isWithinLimits } from './check_limit.js';
import { updateBoard } from './app.js';
let currentTurnColor = 'red';
let currentTurnValue = 0;
let hasPlayed = false;
export function setListeners() {
    const boardElement = document.getElementById('board');
    if (!boardElement)
        return;
    boardElement.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'TD') {
            const { i, j } = clickedOnCell(target);
            handleCellClick(i, j);
        }
    });
}
export function clickedOnCell(cell) {
    const id = cell.id;
    const [_, i, j] = id.split('-').map(Number);
    console.log(`Clicked on cell: (${i}, ${j})`);
    return { i, j };
}
function handleCellClick(i, j) {
    if (isCorrectPlacement(i, j, currentTurnValue) && isWithinLimits(i, j)) {
        setValue(i, j, currentTurnValue);
        setColor(i, j, currentTurnColor);
        hasPlayed = true;
        updateBoard();
    }
    else {
        console.log(`Invalid move at (${i}, ${j})`);
    }
}
export function setCurrentTurn(color, value) {
    currentTurnColor = color;
    currentTurnValue = value;
}
export function resetHasPlayed() {
    hasPlayed = false;
}
export function getHasPlayed() {
    return hasPlayed;
}
