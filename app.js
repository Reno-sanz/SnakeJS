/*
    Table creation
*/

function AppendElements(){
  let grid = document.getElementById("grid");
  for (let i = 0;i < 100;++i){
    var div = document.createElement('div');
    var rowNumber = Math.floor(i/10);
    div.classList.add("cell")
    div.classList.add("row"+rowNumber)
    grid.appendChild(div);
  }
  let row0 = document.getElementsByClassName("row0");
  let row1 = document.getElementsByClassName("row1");
  let row2 = document.getElementsByClassName("row2");
  let row3 = document.getElementsByClassName("row3");
  let row4 = document.getElementsByClassName("row4");
  let row5 = document.getElementsByClassName("row5");
  let row6 = document.getElementsByClassName("row6");
  let row7 = document.getElementsByClassName("row7");
  let row8 = document.getElementsByClassName("row8");
  let row9 = document.getElementsByClassName("row9");
  table = [row0,row1,row2,row3,row4,row5,row6,row7,row8,row9];
}

let startButton = document.querySelector("#startButton");
let reFreshButton = document.querySelector('#reFresh');
let scoreLabel = document.querySelector('#score');

let actMove = null;
let table;
let snake;
let numSnakePieces = 4;
let score;
let speedSnake = 150;
let gameStatus = false;

function coor(x,y) {
  this.coorX = x;
  this.coorY = y;
}

let intervalor;

AppendElements();


/*Moves and start game*/


startButton.addEventListener("click",startGame,false);
reFreshButton.addEventListener("click",()=>{
  document.location.reload(true);
},false)

function startGame(){
  score = 0;
  snake = [];
  intervalor = null;
  gameStatus=true;
  for (var i = numSnakePieces-1; i>=0; i--) {
    let snakeCoords = new coor(i,0);
    table[snakeCoords.coorY][snakeCoords.coorX].classList.add("activeSnake");
    if (i==numSnakePieces-1) {
      table[snakeCoords.coorY][snakeCoords.coorX].classList.add("snakeHead");
    }
    snake.push(snakeCoords);
  }
  actMove = snakeMovingRight;
  intervalor = setInterval(actMove,speedSnake);
  startButton.style.display = "none";
  randApples();
}


function move(lcX, lcY) {
  let tempX = lcX, tempY = lcY;
  let auxX,auxY;
  for (var i = 1; i < snake.length; i++) {
    
    auxX = snake[i].coorX;
    auxY = snake[i].coorY

    snake[i].coorX = tempX;
    snake[i].coorY = tempY;

    tempX = auxX;
    tempY = auxY;
  }
}
function reColor() {
  for (var i = 0; i < snake.length; i++) {
    if (i==0) {
      table[snake[i].coorY][snake[i].coorX].classList.add("snakeHead");
    }else{
      table[snake[i].coorY][snake[i].coorX].classList.add("activeSnake");
    }
  }
}
function unColor() {
  for (var i = 0; i < snake.length; i++) {
    if (i==0) {
      table[snake[i].coorY][snake[i].coorX].classList.remove("snakeHead");
    }else{
      table[snake[i].coorY][snake[i].coorX].classList.remove("activeSnake");
    }
  }
}

function snakeMovingRight() {
    unColor();
    let auxCoorX = snake[0].coorX;
    snake[0].coorX+=1;
    if (endGame()!=false) {
      move(auxCoorX, snake[0].coorY);
      snakeGrowChecker(newApple);
      reColor();
    }
}
function snakeMovingLeft() {
    unColor();
    let auxCoorX = snake[0].coorX;
    snake[0].coorX-=1;
    if (endGame()!=false) {
      move(auxCoorX, snake[0].coorY);
      snakeGrowChecker(newApple);
      reColor();
    }
}
function snakeMovingDown() {
    unColor();
    let auxCoorY = snake[0].coorY;
    snake[0].coorY+=1;
    if (endGame()!=false) {
      move(snake[0].coorX,auxCoorY);
      snakeGrowChecker(newApple);
      reColor();
    }
}
function snakeMovingUp() {
    unColor();
    let auxCoorY = snake[0].coorY;
    snake[0].coorY-=1;
    if (endGame()!=false) {
      move(snake[0].coorX,auxCoorY);
      snakeGrowChecker(newApple);
      reColor();
    }
}

// controls

let goUp = 'ArrowUp';
let goDown = 'ArrowDown';
let goLeft = 'ArrowLeft';
let goRight = 'ArrowRight';
let enter = 'Enter';
document.addEventListener('keydown', (event) => {
    if (gameStatus==true && event.key == goRight && snake[1].coorX!=snake[0].coorX+1 && actMove!=snakeMovingRight) {
      actMove = snakeMovingRight;
      clearInterval(intervalor);
      intervalor = setInterval(actMove,speedSnake);
    }else if (gameStatus==true && event.key == goLeft && snake[1].coorX!=snake[0].coorX-1 && actMove!=snakeMovingLeft) {
      actMove = snakeMovingLeft;
      clearInterval(intervalor);
      intervalor = setInterval(actMove,speedSnake);
    }else if (gameStatus==true && event.key == goDown && snake[1].coorY!=snake[0].coorY+1 && actMove!=snakeMovingDown) {
      actMove = snakeMovingDown;
      clearInterval(intervalor);
      intervalor = setInterval(actMove,speedSnake);
    }else if (gameStatus==true && event.key == goUp && snake[1].coorY!=snake[0].coorY-1 && actMove!=snakeMovingUp) {
      actMove = snakeMovingUp;
      clearInterval(intervalor);
      intervalor = setInterval(actMove,speedSnake);
    }else if(event.key == enter && gameStatus==false){
      startGame();
    }
}, false);

//game system

    /*
  Random apple generator
    */
let newApple;

function apple(a,b) {
  this.appleRow = a;
  this.appleColumn = b;
}
function randNum() {
  let min=0,max=9;
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + min;
    return rand;
}

function randApples() {
  let x=randNum(),y=randNum();
  newApple = new apple(x,y);
  table[newApple.appleColumn][newApple.appleRow].classList.add("appleBG");
}
    /*
  Long Snake system
    */
function snakeGrowChecker(newApple) {
  if (snake[0].coorX == newApple.appleRow && snake[0].coorY == newApple.appleColumn) {
    table[newApple.appleColumn][newApple.appleRow].classList.remove("appleBG");
    score++;
    scoreLabel.innerText = "score: "+score;
    let snakeNewPiece=new coor(newApple.appleColumn,newApple.appleRow);
    snake.push(snakeNewPiece);
    randApples();
  }
}

function autoCrash() {
  for (var i = 1; i < snake.length; i++) {
    if (snake[0].coorX == snake[i].coorX && snake[0].coorY == snake[i].coorY) {
      return true;
    }
  }
}

function endGame() {
  if (snake[0].coorX>=10 ||
      snake[0].coorX<0   ||
      snake[0].coorY>=10 ||
      snake[0].coorY<0   ||
      autoCrash()) {
        
        table[newApple.appleColumn][newApple.appleRow].classList.remove("appleBG");
        clearInterval(intervalor);
        startButton.style.display = "flex";
        console.log("endGame --> score: "+score);
        gameStatus=false;
        return false;
      }
}
