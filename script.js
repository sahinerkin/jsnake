let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let canvasWidth = 35;
let canvasHeight = 25;

class Index {
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }
}

const directions = {
	UP: "up",
	RIGHT: "right",
	DOWN: "down",
	LEFT: "left",
}

let snakeParts = [new Index(5, 5)];
let snakeHead;
let snakeLength;
const scorePerLengthIncInc = 15;
let snakeDirection;
let newDirection;
let score;
const initialTimeOutTime = 340;
let timeoutTime;

let appleIdx;

function checkDirections() {
    switch (newDirection) {
        case directions.UP:
            if (snakeDirection != directions.DOWN) {
                snakeDirection = newDirection;
            }
            break;
        case directions.RIGHT:
            if (snakeDirection != directions.LEFT) {
                snakeDirection = newDirection;
            }  
            break;
        case directions.DOWN:
            if (snakeDirection != directions.UP) {
                snakeDirection = newDirection;
            }
            break;
        case directions.LEFT:
            if (snakeDirection != directions.RIGHT) {
                snakeDirection = newDirection;
            }
            break;
        default:
            break;
    }

    switch (snakeDirection) {
        case directions.UP:
            snakeHead = new Index(snakeHead.i, snakeHead.j-1);
            break;
        case directions.RIGHT:
            snakeHead = new Index(snakeHead.i+1, snakeHead.j);
            break;
        case directions.DOWN:
            snakeHead = new Index(snakeHead.i, snakeHead.j+1);
            break;
        case directions.LEFT:
            snakeHead = new Index(snakeHead.i-1, snakeHead.j);
            break;
        default:
            break;
    }

    newDirection = snakeDirection;
}

function isDead() {
    if (snakeHead.i < 0 || snakeHead.i >= canvasWidth)
        return true;
    if (snakeHead.j < 0 || snakeHead.j >= canvasHeight)
        return true;

    return checkSnakeCollision(snakeHead);
}

function checkSnakeCollision(idx, checkHead=false) {
    for (let k = 0; k < snakeParts.length; k++) {
        if (!checkHead && k == 0)
            continue;

        if (idx.i == snakeParts[k].i && idx.j == snakeParts[k].j)
            return true;
    }

    return false;
}

function generateAppleIndex() {
    let appleIdx;

    do {
        let i = Math.floor(Math.random() * canvasWidth);
        let j = Math.floor(Math.random() * canvasHeight);
        appleIdx = new Index(i, j);
    } while(checkSnakeCollision(appleIdx));

    return appleIdx;
}

function drawBoard() {

    checkDirections();

    if (isDead()) {
        ctx.fillStyle = "red";
        snakeParts.forEach(element => {
            ctx.fillRect(element.i*22, element.j*22, 20, 20);
        });

        setTimeout(endGame, 1000);
        return;
    }

    snakeParts.push(snakeHead);

    while (snakeLength < snakeParts.length) {
        snakeParts.shift();
    }

    let appleEaten = checkSnakeCollision(appleIdx, checkHead=true);

    if (appleEaten) {
        appleIdx = generateAppleIndex();
        score++;
        snakeLength += Math.floor(score/scorePerLengthIncInc)+1;
        console.log(Math.floor(score/scorePerLengthIncInc)+1);
        timeoutTime = Math.ceil(initialTimeOutTime * Math.exp(-0.07*score));
        // console.log(timeoutTime);
        // alert("Apple eaten!");
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, 0);

    ctx.font = "bold 330px Arial";
    ctx.fillStyle = "#3d3d3d";
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillText(score, canvas.width/2, canvas.height/2);


    ctx.fillStyle = "#202020";

    for (let i = 0; i < 35; i++) {
        for (let j = 0; j < 25; j++) {      
            ctx.fillRect(i*22, j*22, 20, 20); 
        }
    }

    ctx.fillStyle = "#03d7fc";
    snakeParts.forEach(element => {
        ctx.fillRect(element.i*22, element.j*22, 20, 20);
    });

    ctx.fillStyle = "IndianRed";
    ctx.fillRect(appleIdx.i*22, appleIdx.j*22, 20, 20);

    ctx.fillStyle = "#6be9ff";
    ctx.fillRect(snakeHead.i*22, snakeHead.j*22, 20, 20);

    setTimeout(drawBoard, timeoutTime);
}

function initializeAndStart() {
    snakeParts = [new Index(5, 5)];
    snakeHead = snakeParts[0];
    snakeLength = 2;
    snakeDirection = directions.RIGHT;
    newDirection = snakeDirection;
    score = 0;
    appleIdx = generateAppleIndex();
    timeoutTime = initialTimeOutTime;
    // console.log(timeoutTime);

    setTimeout(drawBoard, timeoutTime);
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case "Up":
        case "ArrowUp":
        case "W":
        case "w":
            newDirection = directions.UP;
            break;
        case "Right":
        case "ArrowRight":
        case "D":
        case "d":
            newDirection = directions.RIGHT;
            break;
        case "Down":
        case "ArrowDown":
        case "S":
        case "s":
            newDirection = directions.DOWN;
            break;
        case "Left":
        case "ArrowLeft":
        case "A":
        case "a":
            newDirection = directions.LEFT;
            break;
        default:
            break;
    }
});


function endGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let textY = 200;
    let fontSize = 40;
    ctx.font = "italic bold " + fontSize + "px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over.", canvas.width/2, textY);
    ctx.fillText("Your score is " + score + ".", canvas.width/2, textY+fontSize+20);

    setTimeout(initializeAndStart, 1000);
}


initializeAndStart();

