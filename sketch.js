let snake;
let rez = 20;
let food;
let w;
let h;
var scoreElem;
var ver;
var gameOverSound;
var eatSound;
var grass;

function preload() {
  gameOverSound = loadSound('GameOver.wav');
  eatSound = loadSound('Eating.wav');
  grass = loadImage('grass.png');          //background image
}

function setup() {
  ver = createDiv('Version 3.0');
  ver.position(400, 20);
  ver.id = 'version';
  ver.style('color', 'white');
  
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');
  
  createCanvas(500, 500);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(10);
  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
  
}

function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
  	snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
  	snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
  	snake.setDir(0, -1);
  } else if (key == 'w') {
    snake.setDir(0, -1);
  } else if (key == 's') {
    snake.setDir(0, 1);
  } else if (key == 'a') {
    snake.setDir(-1, 0);
  } else if (key == 'd') {
    snake.setDir(1, 0);
  }

}

function draw() {
  scale(rez);
  background(150);
  
  if (snake.eat(food)) {
    //score
    var prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Score = ' + (prevScore + 1));
    
    eatSound.play();
    foodLocation();
  }
  snake.update();
  snake.show();
  
  
  if (snake.endGame()) {
    //final score
    var scoreVal = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Game ended! Your score was: ' + scoreVal);
    
    alert('Refresh page to play again!');
    
    gameOverSound.play();
  	print("END GAME");
    print("Refresh page to play again!");
    background(255, 0, 0);
    noLoop();
  }
  
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}

class Snake {
  
  constructor() {
  	this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }
  
  setDir(x, y) {
  	this.xdir = x;
    this.ydir = y;
  }
  
  update() {
  	let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }
  
  grow() {
  	let head = this.body[this.body.length-1].copy();
    this.len++;
    this.body.push(head);
  }
  
  endGame() {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x > w-1 || x < 0 || y > h-1 || y < 0) {
      return true;
    }
    for(let i = 0; i < this.body.length-1; i++) {
    	let part = this.body[i];
      if(part.x == x && part.y == y) {
      	return true;
      }
    }
    return false;
  }
  
  eat(pos) {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x == pos.x && y == pos.y) {
      this.grow();
      return true;
    }
    return false;
  }
  
  show() {
  	for(let i = 0; i < this.body.length; i++) {
    	fill(255);                         //snake color
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1)
    }
  }

}