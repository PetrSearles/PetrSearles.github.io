var snake;
var scl = 20;
var apple;
var food;
var grass;

function preload() {
  grass = loadImage('grass.png');
  //apple = loadImage('apple.png');
}
  

function setup() {
  createCanvas(500, 500)
  resetSketch();
  frameRate(10);
  var button = createButton("click here to reset or press R");
  button.mousePressed(resetSketch);
}

function resetSketch() {
  snake = new Snake();
  pickLocation();
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}


function draw() {
  background(150);
  imageMode(CENTER);
  image(grass, width/2, height/2);
  
  //image(apple, food.x, food.y, scl, scl);
  
  //var score = function() {
    //fill(0);
    //textSize(50);
    //text("Score: ", 10, 10);
  //}
  
  if (snake.eat(food)) {
    pickLocation();
  }
  snake.death();
  snake.update();
  snake.show();
  

  //food
  //image(apple, food.x, food.y);
  fill(255, 0, 0);
  noStroke();
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
  
  
  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }
  
  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }
  
  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        alert('You died. Start over.');
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
    
    this.x = constrain(this.x, 0, width-scl);
    this.y = constrain(this.y, 0, height-scl);
  }
    
  //snake body
  this.show = function() {
    noStroke();
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl)
  
 }
}