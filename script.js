let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

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

function drawBoard() {

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

setInterval(drawBoard, 300);

