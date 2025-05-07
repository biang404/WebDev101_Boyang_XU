var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { setValue, getValue, setColor, getColor } from './value_and_color.js';
import { setListeners, setCurrentTurn, resetHasPlayed, getHasPlayed } from './listeners.js';
import { getAndRemoveCard, redlist, greenlist, yellowlist, bluelist } from './pioche_une_carte.js';
import { hasWin } from './check_win.js';
console.log('app.ts loaded');
export function updateBoard() {
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            if (cell) {
                const value = getValue(i, j);
                const color = getColor(i, j);
                if (value !== null) {
                    cell.innerText = value.toString();
                    cell.style.textAlign = 'center'; // Centrer le texte
                    cell.style.verticalAlign = 'middle'; // Centrer verticalement
                }
                else {
                    cell.innerText = '';
                }
                if (color !== null) {
                    cell.style.backgroundColor = color;
                }
                else {
                    cell.style.backgroundColor = (i === 5 && j === 5) ? 'white' : '#adacac';
                }
            }
        }
    }
}
function createBoard() {
    const boardElement = document.getElementById('board');
    if (!boardElement)
        return;
    // Défi 1: Créer un plateau de 11x11
    for (let i = 0; i < 11; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 11; j++) {
            const cell = document.createElement('td');
            cell.id = `cell-${i}-${j}`;
            cell.style.width = '55px';
            cell.style.height = '55px';
            cell.style.border = '1px solid black';
            // Définir la case centrale comme blanche, les autres cases comme grises
            if (i === 5 && j === 5) {
                cell.style.backgroundColor = 'white';
            }
            else {
                cell.style.backgroundColor = '#adacac';
            }
            row.appendChild(cell);
        }
        boardElement.appendChild(row);
    }
}
function game() {
    return __awaiter(this, void 0, void 0, function* () {
        setListeners();
        let listColor = ["red", "green", "blue", "yellow"];
        let listList = [redlist, greenlist, bluelist, yellowlist];
        let firstNumber = getAndRemoveCard(listList[0]);
        let firstColor = listColor[0];
        console.log("The first number is " + firstNumber);
        console.log("The first color is " + firstColor);
        setValue(5, 5, firstNumber);
        setColor(5, 5, firstColor);
        updateBoard();
        let turn = 1;
        while (true) {
            if (hasWin("red")) {
                console.log("Red wins!");
                break;
            }
            if (hasWin("green")) {
                console.log("Green wins!");
                break;
            }
            if (hasWin("blue")) {
                console.log("Blue wins!");
                break;
            }
            if (hasWin("yellow")) {
                console.log("Yellow wins!");
                break;
            }
            let currentNumber = getAndRemoveCard(listList[turn]);
            let currentColor = listColor[turn];
            console.log("It's " + currentColor + " turn!");
            console.log("The number is " + currentNumber);
            if (currentNumber !== null) {
                setCurrentTurn(currentColor, currentNumber);
            }
            else {
                console.error("Failed to get a valid card number.");
            }
            resetHasPlayed();
            while (!getHasPlayed()) {
                // Wait for player to make a move
                yield new Promise((resolve) => setTimeout(resolve, 100));
            }
            turn = (turn + 1) % 4;
            updateBoard();
        }
        // sleep 1s
        yield new Promise((resolve) => setTimeout(resolve, 1000));
        finishScreen();
    });
}
function finishScreen() {
    document.body.innerHTML = "";
    let end = document.createElement("h1");
    end.innerHTML = "Fin de la partie!";
    end.style.textAlign = "center";
    let winner = document.createElement("h2");
    if (hasWin("red")) {
        winner.innerHTML = "Le joueur rouge a gagné!";
        winner.style.color = "red";
    }
    if (hasWin("green")) {
        winner.innerHTML = "Le joueur vert a gagné!";
        winner.style.color = "green";
    }
    if (hasWin("blue")) {
        winner.innerHTML = "Le joueur bleu a gagné!";
        winner.style.color = "blue";
    }
    if (hasWin("yellow")) {
        winner.innerHTML = "Le joueur jaune a gagné!";
        winner.style.color = "yellow";
    }
    winner.style.textAlign = "center";
    document.body.appendChild(end);
    document.body.appendChild(winner);
    let replay = document.createElement("h2");
    replay.innerHTML = "Ctrl + R pour rejouer";
    replay.style.textAlign = "center";
    document.body.appendChild(replay);
}
function main() {
    createBoard();
    setListeners();
    game();
}
// Défi 2: Appeler les fonctions de test et mettre à jour le plateau
// createBoard();
// test_setValue();
// test_getValue();
// test_setColor();
// test_getColor();
// updateBoard();
// Défi 3: Définir les écouteurs d'événements
// createBoard();
// setListeners();
// Défi 4: Appeler la fonction de test isEmpty
// createBoard();
// testIsEmpty();
// updateBoard();
// Défi 5: Appeler la fonction de test isConnectAdjacency
// createBoard();
// testIsCorrectAdjacency();
// updateBoard();
// Défi 6: Appeler la fonction de test isCorrectPlacement
// createBoard();
// testIsCorrectPlacement();
// updateBoard();
// Défi 7: Appeler la fonction de test getAndRemoveCard
// createBoard();
// testGetAndRemoveCard(); 
// updateBoard();
// Défi 8: Appeler la fonction de test hasWin
// createBoard();
// setColor(5, 5, 'red');
// setColor(5, 6, 'red');
// setColor(5, 7, 'red');
// setColor(5, 8, 'red');
// testHasWin('red');
// setColor(4, 5, 'blue');
// setColor(3, 5, 'blue');
// setColor(2, 5, 'blue');
// setColor(1, 5, 'blue');
// testHasWin('blue');
// setColor(0, 0, 'yellow');
// setColor(1, 1, 'yellow');
// setColor(2, 2, 'yellow');
// setColor(3, 3, 'yellow');
// testHasWin('yellow');
// setColor(0, 10, 'green');
// setColor(1, 9, 'green');
// setColor(2, 8, 'green');
// setColor(3, 7, 'green');
// testHasWin('green');
// updateBoard();
// Défi 9: Appeler la fonction de test isWithinLimits
// createBoard();
// setValue(6, 4, 5);
// setValue(7, 4, 5);
// setValue(5, 5, 5);
// setValue(5, 6, 5);
// setValue(5, 7, 5);
// setValue(5, 8, 5);
// setValue(5, 9, 5);
// setValue(4, 5, 5);
// setValue(3, 6, 5);
// setValue(2, 5, 5);
// testIsWithinLimits();
// updateBoard();
// Lancer le jeu    
main();
