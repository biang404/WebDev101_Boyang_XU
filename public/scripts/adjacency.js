import { getValue, setValue } from './value_and_color.js';
export function isCorrectAdjacency(i, j) {
    const directions = [
        { di: -1, dj: 0 },
        { di: 1, dj: 0 },
        { di: 0, dj: -1 },
        { di: 0, dj: 1 },
        { di: -1, dj: -1 },
        { di: -1, dj: 1 },
        { di: 1, dj: -1 },
        { di: 1, dj: 1 }
    ];
    for (const { di, dj } of directions) {
        const ni = i + di;
        const nj = j + dj;
        if (ni >= 0 && ni < 11 && nj >= 0 && nj < 11) {
            if (getValue(ni, nj) !== null) {
                return true;
            }
        }
    }
    return false;
}
export function testIsCorrectAdjacency() {
    setValue(0, 1, 5);
    setValue(0, 2, 5);
    console.log(`(0, 0) is connect adjacency: ${isCorrectAdjacency(0, 0)}`);
    console.log(`(1, 2) is connect adjacency: ${isCorrectAdjacency(1, 2)}`);
    console.log(`(0, 4) is connect adjacency: ${isCorrectAdjacency(0, 4)}`);
}
