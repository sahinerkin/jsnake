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
snakeHead = snakeParts[0];
let snakeLength = 6;
let snakeDirection = directions.RIGHT;
let newDirection = snakeDirection;

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

    for (let k = 0; k < snakeParts.length; k++) {
        if (k == 0)
            continue;

        if (snakeHead.i == snakeParts[k].i && snakeHead.j == snakeParts[k].j)
            return true;
    }

    return false;
}

let interval;

function drawBoard() {

    checkDirections();

    if (isDead()) {
        clearInterval(interval);

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

    ctx.beginPath();
    ctx.moveTo(0, 0);
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

    ctx.fillStyle = "#6be9ff";
    ctx.fillRect(snakeHead.i*22, snakeHead.j*22, 20, 20);
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

    ctx.font = "italic bold 40px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over.", canvas.width/2, 200);
}


interval = setInterval(drawBoard, 300);

