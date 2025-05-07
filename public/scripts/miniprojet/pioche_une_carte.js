export const redlist = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
export const greenlist = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
export const yellowlist = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
export const bluelist = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
export function getAndRemoveCard(liste) {
    if (liste.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * liste.length);
    const card = liste[randomIndex];
    liste.splice(randomIndex, 1);
    return card;
}
export function testGetAndRemoveCard() {
    console.log(`Card drawn from redlist: ${getAndRemoveCard(redlist)}`);
    console.log(`Redlist after drawing a card: ${redlist}`);
}
