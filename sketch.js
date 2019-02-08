//game website: https://petrsearles.github.io/


var snake;
var scl = 20;
var apple;
var food;
var grass;
var eatSound;
var gameOverSound;
var scoreElem;
var ver;

function preload() {
  gameOverSound = loadSound('GameOver.wav');
  eatSound = loadSound('Eating.wav');
  grass = loadImage('grass.png');      //background image
  //apple = loadImage('apple.png');
}
  

function setup() {
  ver = createDiv('Version 2.0');
  ver.position(400, 20);
  ver.id = 'version';
  ver.style('color', 'white');
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');
  
  createCanvas(500, 500)
  resetSketch();          //start over option
  frameRate(10);
  var button = createButton("click here to reset or press R");
  button.mousePressed(resetSketch);
}

function resetSketch() {
  snake = new Snake();
  pickLocation();          //spawn location
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}


function draw() {
  background(150);     //background color
  imageMode(CENTER);         
  image(grass, width/2, height/2);          
  
  //image(apple, food.x, food.y, scl, scl);
  
  //var score = function() {
    //fill(0);
    //textSize(50);
    //text("Score: ", 10, 10);
  //}
  
  if (snake.eat(food)) {    //what happens when snake eats food
    //score
    var prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Score = ' + (prevScore + 1));
    
    eatSound.play();       //sound when you eat food
    pickLocation();
  }
  
  snake.death();
  snake.update();
  snake.show();
  

  //food body
  fill(255, 0, 0);     //food color
  noStroke();     //no outline
  rect(food.x, food.y, scl, scl)    
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  } else if(keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  } else if(keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  } else if(key == 'w') {
    snake.dir(0, -1);
  } else if(key == 's') {
    snake.dir(0, 1);
  } else if(key == 'a') {
    snake.dir(-1, 0);
  } else if(key == 'd') {
    snake.dir(1,0);
  } else if(key == 'r') {
    resetSketch();
  }
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  
  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }
  
  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;      //if snake eats food -> it grows
      return true;
    } else {
      return false;
    }
  }
  
  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        //final score
        var scoreVal = parseInt(scoreElem.html().substring(8));
        scoreElem.html('Game ended! Your score was: ' + scoreVal);
        
        gameOverSound.play();                  //game over sound
        alert('You died. Start over. After pressing OK reset page please. Its bugged, it wont show correct score.');        //shows up when snake dies
        this.total = 0;
        this.tail = [];
      }
    }
  }
  
  this.update = function() {
    for (var i = 0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
        this.tail[this.total - 1] = createVector(this.x, this.y);
    }
      
    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;
    
    this.x = constrain(this.x, 0, width-scl);   //makes the sides solid
    this.y = constrain(this.y, 0, height-scl);  //makes the sides solid
  }
    
  //snake body
  this.show = function() {
    noStroke();    //no outline
    fill(255);      //snake color
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    noStroke();
    rect(this.x, this.y, scl, scl)
  
 }
}