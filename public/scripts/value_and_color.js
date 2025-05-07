const board = Array.from({ length: 11 }, () => Array.from({ length: 11 }, () => ({ value: null, color: null })));
export function setValue(i, j, value) {
    if (isValidCell(i, j)) {
        board[i][j].value = value;
    }
}
export function getValue(i, j) {
    if (isValidCell(i, j)) {
        return board[i][j].value;
    }
    return null;
}
export function setColor(i, j, color) {
    if (isValidCell(i, j)) {
        board[i][j].color = color;
    }
}
export function getColor(i, j) {
    if (isValidCell(i, j)) {
        return board[i][j].color;
    }
    return null;
}
function isValidCell(i, j) {
    return i >= 0 && i < 11 && j >= 0 && j < 11;
}
// fonction de test
export function test_setValue() {
    setValue(0, 0, 5);
    console.log(`Value at (0, 0) should be 5: ${getValue(0, 0)}`);
}
export function test_getValue() {
    setValue(1, 1, 10);
    console.log(`Value at (1, 1) should be 10: ${getValue(1, 1)}`);
}
export function test_setColor() {
    setColor(2, 2, 'red');
    console.log(`Color at (2, 2) should be red: ${getColor(2, 2)}`);
}
export function test_getColor() {
    setColor(3, 3, 'blue');
    console.log(`Color at (3, 3) should be blue: ${getColor(3, 3)}`);
}
