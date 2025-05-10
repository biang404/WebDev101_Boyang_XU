import { getValue, setValue } from './value_and_color.js';
export function isEmpty(i, j) {
    const value = getValue(i, j);
    return value === null;
}
export function testIsEmpty() {
    setValue(0, 0, 5);
    console.log(`The value at (0, 0) is ${getValue(0, 0)}. (0, 0) is empty is: ${isEmpty(0, 0)}`);
    setValue(1, 1, null);
    console.log(`The value at (1, 1) is ${getValue(1, 1)}. (1, 1) is empty is: ${isEmpty(1, 1)}`);
}
