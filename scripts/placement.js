import { isCorrectAdjacency } from "./adjacency.js";
import { getValue, setValue } from "./value_and_color.js";
export function isCorrectPlacement(i, j, value) {
    const currentValue = getValue(i, j);
    if (currentValue === null) {
        if (isCorrectAdjacency(i, j)) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (currentValue !== null && currentValue < value) {
        return true;
    }
    else {
        return false;
    }
}
// fonction de test
export function testIsCorrectPlacement() {
    setValue(0, 1, 5);
    setValue(0, 2, 5);
    console.log(`(0, 0) is correct placement for 6: ${isCorrectPlacement(0, 0, 6)}`); // true
    console.log(`(0, 1) is correct placement for 4: ${isCorrectPlacement(0, 1, 4)}`); // false
    console.log(`(0, 2) is correct placement for 6: ${isCorrectPlacement(0, 2, 6)}`); // true
    console.log(`(0, 4) is correct placement for 5: ${isCorrectPlacement(0, 4, 5)}`); // false
}
