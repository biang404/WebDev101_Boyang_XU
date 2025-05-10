
var currentNummber = 0;
var currentColor = "red";
var hasPlayed = false;
var gameFinished = false;

const gameContainer = document.getElementById('game-container')!;

//Ajoute un titre h1 avec le texte "Puissance 4" centré sur la page
let title = document.createElement("h1");
title.innerHTML = "Punto";
title.style.textAlign = "center";
gameContainer.appendChild(title);


let player = document.createElement("h2");
player.innerHTML = "Player : Rouge";
player.style.textAlign = "center";
// mettre le texte en rouge
player.style.color = "red";
gameContainer.appendChild(player);

let numero = document.createElement("h2");
numero.innerHTML = "Number : 0";
numero.style.textAlign = "center";
gameContainer.appendChild(numero);

// fond gris foncé pour le body
// gameContainer.style.backgroundColor = "darkgrey";




//affiche une grille 11x11 avec <table> et <tr> et <td>, chaque case est de forme carré avec une bordure noire
//fond legerement gris pour les cases autour de la case centrale qui elle reste blanche

let table = document.createElement("table");

//boucle for pour les lignes
for (let i = 0; i < 11; i++) {
    let row = document.createElement("tr");
    //boucle for pour les colonnes
    for (let j = 0; j < 11; j++) {
        let cell = document.createElement("td");
        cell.style.width = "40px";
        cell.style.height = "40px";
        cell.style.border = "1px solid black";
        cell.style.backgroundColor = "lightgrey";
        // centré le texte dans la case
        cell.style.textAlign = "center";
        if (i === 5 && j === 5) {
            cell.style.backgroundColor = "white";
        }
        row.appendChild(cell);
    }
    table.appendChild(row);
}
gameContainer.appendChild(table);

// Centrer le tableau sur l'écran
table.style.margin = "auto";





function setValue(i:number,j:number,value:number){
    let cell = table.rows[i].cells[j];
    cell.innerHTML = value.toString();
}

function getValue(i:number,j:number):number{
    let cell = table.rows[i].cells[j];
    return parseInt(cell.innerHTML);
}

function setColor(i:number, j:number, color:string){
    let cell = table.rows[i].cells[j];
    cell.style.backgroundColor = color;
}

function getColor(i:number, j:number):string{
    let cell = table.rows[i].cells[j];
    return cell.style.backgroundColor;
}


function setListeners(){
    //ecouteur d'evenement du click qui gere chaque clic de souris par la fonction clickedOnCell
    for (let i = 0; i<11; i++){
        for(let j = 0; j<11; j++){
            table.rows[i].cells[j].addEventListener("click", function(){
                if(!gameFinished){
                    clickedOnCell(i,j);
                }
                
            });
        }
    }
}



function clickedOnCell(i:number, j:number){

    let value = getValue(i,j);
    // console.log("Coordonnées de la case cliquée : (" + i + "," + j + ")");
    if(isCorrectPlacement(i,j,currentNummber) && isWithinLimits(i,j)){
        setValue(i,j,currentNummber);
        setColor(i,j,currentColor);
        hasPlayed = true;
    }else{
        console.log("Placement incorrect");
    }
}

function isEmpty(i:number,j:number):boolean{
    return isNaN(getValue(i,j));
}

function testIsEmpty(){
    setValue(5,5,42);
    console.log(getValue(5,5));
    console.log(isEmpty(5,5));
    console.log(getValue(0,0));
    console.log(isEmpty(0,0));
}

function isCorrectAdjacency(i:number, j:number):boolean{

    if(i>0 && i< 10 && j > 0 && j< 10){
        for (let k = -1; k<=1; k++){
            for (let l = -1; l<=1; l++){
                if (!isEmpty(i+k,j+l)){
                    return true;
                }
            }
        }
    }
    //the corners
    if(i === 0 && j === 0){
        if (!isEmpty(i+1,j) || !isEmpty(i,j+1) || !isEmpty(i+1,j+1)){
            return true;
        }
    }
    if(i === 0 && j === 10){
        if (!isEmpty(i+1,j) || !isEmpty(i,j-1) || !isEmpty(i+1,j-1)){
            return true;
        }
    }
    if(i === 10 && j === 0){
        if (!isEmpty(i-1,j) || !isEmpty(i,j+1) || !isEmpty(i-1,j+1)){
            return true;
        }
    }
    if(i === 10 && j === 10){
        if (!isEmpty(i-1,j) || !isEmpty(i,j-1) || !isEmpty(i-1,j-1)){
            return true;
        }
    }
    //the sides
    if(i === 0 && j > 0 && j < 10){
        for (let k = 0; k<=1; k++){
            for (let l = -1; l<=1; l++){
                if (!isEmpty(i+k,j+l)){
                    return true;
                }
            }
        }
    }
    if(i === 10 && j > 0 && j < 10){
        for (let k = 0; k<=1; k++){
            for (let l = -1; l<=1; l++){
                if (!isEmpty(i-k,j+l)){
                    return true;
                }
            }
        }
    }
    if(j === 0 && i > 0 && i < 10){
        for (let k = -1; k<=1; k++){
            for (let l = 0; l<=1; l++){
                if (!isEmpty(i+k,j+l)){
                    return true;
                }
            }
        }
    }
    if(j === 10 && i > 0 && i < 10){
        for (let k = -1; k<=1; k++){
            for (let l = 0; l<=1; l++){
                if (!isEmpty(i+k,j-l)){
                    return true;
                }
            }
        }
    }

    return false;
}



function testAdjacency(){
    // test of adjacency
    setValue(2,1,1);
    setValue(3,1,2);
    setValue(3,2,3);
    for (let i = 0; i<11; i++){
        for(let j = 0; j<11; j++){
            console.log("Coordonnées de la case : (" + i + "," + j + ")");
            console.log(isCorrectAdjacency(i,j));
        }
    }
  
    console.log()
    
    
}

function isCorrectPlacement(i:number, j:number, value:number):boolean{
    if (isEmpty(i,j)){
        if (isCorrectAdjacency(i,j)){
            return true;
        }else{
            return false;
        }
    }
    if(value > getValue(i,j)){
        return true;
    }
    return false;
}

function testIsCorrectPlacement(){
    setValue(2,1,1);
    setValue(3,1,2);
    setValue(3,2,3);
    for (let i = 0; i<11; i++){
        for(let j = 0; j<11; j++){
            if(isCorrectPlacement(i,j,4)){
                console.log("Coordonnées de la case : (" + i + "," + j + ")");
        }
    }
}
    
}

//ecrit une liste de nombres de 1 à 9
const redList = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
const greenList = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
const blueList = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
const yellowList = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];

function getAndRemoveRandomCard(list:number[]):number{
    //cherche un nombre entre 0 et la longueur de la liste -1
    let index = Math.floor(Math.random()*list.length);
    //enregistre la valeur de la liste à l'index trouvé
    let value = list[index];
    //supprime la valeur de la liste
    list.splice(index,1);
    return value;
}

function testGetAndRemoveRandomCard(){
    // for (let i = 0; i<18; i++){
    //     console.log(getAndRemoveRandomCard(redList));
    // }
    for (let i = 0; i<5; i++){
        console.log(getAndRemoveRandomCard(redList));
    }
    console.log(redList);
}


// la couleur gagne si elle a 4 cartes d'affillée (horizontalement, verticalement ou diagonalement)
function hasWin(color:string):boolean{
    for (let i = 0; i<11; i++){
        for (let j = 0; j<11; j++){
            if (getColor(i,j) === color){
                //horizontal
                if (j<8){
                    if (getColor(i,j+1) === color && getColor(i,j+2) === color && getColor(i,j+3) === color){
                        return true;
                    }
                }
                //vertical
                if (i<8){
                    if (getColor(i+1,j) === color && getColor(i+2,j) === color && getColor(i+3,j) === color){
                        return true;
                    }
                }
                //diagonal
                if (i<8 && j<8){
                    if (getColor(i+1,j+1) === color && getColor(i+2,j+2) === color && getColor(i+3,j+3) === color){
                        return true;
                    }
                }
                if (i<8 && j>2){
                    if (getColor(i+1,j-1) === color && getColor(i+2,j-2) === color && getColor(i+3,j-3) === color){
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function testHasWin(){
    setColor(0,5,"red");
    setColor(0,6,"red");
    setColor(0,7,"red");
    setColor(0,8,"red");
    console.log(hasWin("red"));
    setColor(5,5,"green");
    setColor(6,5,"green");
    setColor(7,5,"green");
    console.log(hasWin("green"));
    setColor(5,5,"blue");
    setColor(6,6,"blue");
    setColor(7,7,"blue");
    console.log(hasWin("blue"));
    setColor(5,5,"yellow");
    setColor(6,4,"yellow");
    setColor(7,3,"yellow");
    console.log(hasWin("yellow"));
}

function isWithinLimits(k:number, l:number):boolean{
    for(let i = 0; i<11; i++){
        for(let j = 0; j<11; j++){
            if(!isEmpty(i,j)){
                if(Math.abs(i-k) <= 5 && Math.abs(j-l) <= 5){
                    
                }else{
                    return false;
                }
            }
        }
    }
    return true;
}


async function game(){
    setListeners();
    let listColor = ["red","green","blue","yellow"];
    let listList = [redList,greenList,blueList,yellowList];
    let firstNumbnber = getAndRemoveRandomCard(listList[0]);
    let firstColor = listColor[0];
    console.log("The first number is " + firstNumbnber);
    console.log("The first color is " + firstColor);
    setValue(5,5,firstNumbnber);
    setColor(5,5,firstColor);
    let turn = 1;
    while(true){
        if(hasWin("red")){
            console.log("Red wins!");
            gameFinished = true;
            break;
        }
        if(hasWin("green")){
            console.log("Green wins!");
            gameFinished = true;
            break;
        }
        if(hasWin("blue")){
            console.log("Blue wins!");
            gameFinished = true;
            break;
        }
        if(hasWin("yellow")){
            console.log("Yellow wins!");
            gameFinished = true;
            break;
        }
        currentNummber = getAndRemoveRandomCard(listList[turn]);
        currentColor = listColor[turn];
        player.innerHTML = "Player : " + currentColor;
        numero.innerHTML = "Number : " + currentNummber;
        player.style.color = currentColor;
        console.log("It's " + currentColor + " turn!");
        console.log("The number is " + currentNummber);
        hasPlayed = false;
        await waitForPlayerMove();
        turn = (turn + 1) % 4;



    }
    // sleep 1s
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    finishScreen();
}

function finishScreen(){
    gameContainer.innerHTML = "";
    let end = document.createElement("h1");
    end.innerHTML = "Game over! Ctrl+R to restart :)";
    end.style.textAlign = "center";
    let winner = document.createElement("h2");
    if(hasWin("red")){
        winner.innerHTML = "Le Player rouge a gagné!";
        winner.style.color = "red";
    }
    if(hasWin("green")){
        winner.innerHTML = "Le Player vert a gagné!";
        winner.style.color = "green";
    }
    if(hasWin("blue")){
        winner.innerHTML = "Le Player bleu a gagné!";
        winner.style.color = "blue";
    }
    if(hasWin("yellow")){
        winner.innerHTML = "Le Player jaune a gagné!";
        winner.style.color = "yellow";
    }
    winner.style.textAlign = "center";
    gameContainer.appendChild(end);
    gameContainer.appendChild(winner);
}

function waitForPlayerMove() {
    return new Promise<void>((resolve) => {
        let checkInterval = setInterval(() => {
            if (hasPlayed) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100); // Vérifie toutes les 100ms si le Player a joué
    });
}


function main(){
    // setValue(5,5,42);
    // console.log(getValue(5,5));
    // setColor(5,5,"red");
    // console.log(getColor(5,5));
    // setListeners();
    // testIsEmpty();
    // testAdjacency();
    // testIsCorrectPlacement();
    // testGetAndRemoveRandomCard();
    // testHasWin();
    game();

}


main();