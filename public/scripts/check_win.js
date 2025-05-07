import { getColor } from './value_and_color.js';
export function hasWin(color) {
    const directions = [
        { di: 0, dj: 1 }, // horizontal
        { di: 1, dj: 0 }, // vertical
        { di: 1, dj: 1 }, // diagonal
        { di: 1, dj: -1 } // diagonal
    ];
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            if (getColor(i, j) === color) {
                for (const { di, dj } of directions) {
                    let count = 1;
                    for (let k = 1; k < 4; k++) {
                        const ni = i + k * di;
                        const nj = j + k * dj;
                        if (ni >= 0 && ni < 11 && nj >= 0 && nj < 11 && getColor(ni, nj) === color) {
                            count++;
                        }
                        else {
                            break;
                        }
                    }
                    if (count === 4) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
// fonction de test
export function testHasWin(color) {
    console.log(`Has ${color} won: ${hasWin(color)}`);
}
