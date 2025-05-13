import { isEmpty } from './check_empty.js';
export function isWithinLimits(i, j) {
    // vérifier si la cellule est dans les limites du plateau
    if (i < 0 || i >= 11 || j < 0 || j >= 11) {
        return false;
    }
    // trouver les coordonnées des cartes existantes
    let minX = 11, maxX = -1, minY = 11, maxY = -1;
    for (let x = 0; x < 11; x++) {
        for (let y = 0; y < 11; y++) {
            if (!isEmpty(x, y)) {
                if (x < minX)
                    minX = x;
                if (x > maxX)
                    maxX = x;
                if (y < minY)
                    minY = y;
                if (y > maxY)
                    maxY = y;
            }
        }
    }
    // Si les cartes existantes sur le plateau ne peuvent pas atteindre les exigences de 6x6, tant que les coordonnées de cette nouvelle carte et la distance maximale verticale et horizontale des cartes existantes sont toutes deux inférieures à 6, (i, j) est valide.
    if (maxX - minX < 6 && maxY - minY < 6) {
        return Math.abs(i - minX) < 6 && Math.abs(i - maxX) < 6 && Math.abs(j - minY) < 6 && Math.abs(j - maxY) < 6;
    }
    // vérifier si la cellule est dans les limites du carré 6x6
    return i >= minX && i <= maxX && j >= minY && j <= maxY;
}
// fonction de test
export function testIsWithinLimits() {
    console.log(`(0, 0) is within limits: ${isWithinLimits(0, 0)}`); // false
    console.log(`(4, 8) is within limits: ${isWithinLimits(4, 8)}`); // true
    console.log(`(5, 3) is within limits: ${isWithinLimits(5, 3)}`); // false
}
