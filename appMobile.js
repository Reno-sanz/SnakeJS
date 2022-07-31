let boxButtons = document.getElementById('buttonsMobile');

let btnUp = document.getElementById('goUp');
let btnDown = document.getElementById('goDown');
let btnLeft = document.getElementById('goLeft');
let btnRight = document.getElementById('goRight');

btnUp.addEventListener("click",moveUp,false);
btnDown.addEventListener("click",moveDown,false);
btnRight.addEventListener("click",moveRight,false);
btnLeft.addEventListener("click",moveLeft,false);

function moveUp() {
  if (gameStatus==true   && snake[1].coorY!=snake[0].coorY-1) {
    clearInterval(intervalor);
    intervalor=setInterval(snakeMovingUp,speedSnake)
  }
}
function moveDown() {
  if (gameStatus==true   && snake[1].coorY!=snake[0].coorY+1) {
    clearInterval(intervalor);
    intervalor=setInterval(snakeMovingDown,speedSnake)
  }
}
function moveRight() {
  if (gameStatus==true   && snake[1].coorX!=snake[0].coorX+1) {
    clearInterval(intervalor);
    intervalor=setInterval(snakeMovingRight,speedSnake)
  }
}
function moveLeft() {
  if (gameStatus==true   && snake[1].coorX!=snake[0].coorX-1) {
    clearInterval(intervalor);
    intervalor=setInterval(snakeMovingLeft,speedSnake)
  }
}
