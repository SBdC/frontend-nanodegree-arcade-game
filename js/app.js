// Enemies our player must avoid
let allEnemies = [];
let allGems = [];
let canvasWidth = 1110;
let canvasHeight = 930;

const health = document.querySelector("#health");
const bonus = document.querySelector(".bonus");
const timer = document.querySelector(".timer h2");


const Enemy = function(x, y, speed, width, height, sprite) {
  this.x = x;
  this.y = y;
  this.speed = getRandomInt(50, 220);
  this.width = 101;
  this.height = 69;

  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

(function createEnemies() {
  const bug1 = new Enemy(80, 100);
  const bug2 = new Enemy(80, 410);
  const bug3 = new Enemy(80, 190);
  const bug4 = new Enemy(80, 260);
  allEnemies.push(bug1, bug2, bug3, bug4);

})();



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {


  this.x += this.speed * dt;

  // When enemy goes off the canvas, bring it back on the other side
  if (this.x <= -50) {
    this.x = canvasWidth + 50;
  } else if (this.x >= canvasWidth + 50) {
    this.x = -50;
  }
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//PLayer

const Player = function(x, y, width, height, startX, startY, sprite) {
  this.x = x;
  this.y = y;

  this.width = 71;
  this.height = 74;

  this.startX = 450;
  this.startY = 570;

  this.sprite = "images/char-boy.png";

};


const player = new Player(450, 570);

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite),
    this.x,
    this.y
  );
}





Player.prototype.update = function() {

  if (this.x <= 0) {
    this.x = 0;
  } else if (this.x >= 900) {
    this.x = 900;
  }
  if (this.y <= 10) {
    this.y = 570;
  } else if (this.y >= 580) {
    this.y = 570;
  }




}




  // Check for collisions
function  checkCollisions() {
allEnemies.forEach(function(enemy) {


  if (player.x + player.width >= enemy.x &&
    player.x <= enemy.x + enemy.width &&
    player.y + player.height >= enemy.y &&
    player.y <= enemy.y + enemy.height
  ) {
    player.x = player.startX;
    player.y = player.startY;
    lives();

  }

});

}




Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'up':
      this.y -= 80;
      break;
    case 'down':
      this.y += 80;

      break;
    case 'left':
      this.x -= 90;

      break;
    case 'right':
      this.x += 90;

      break;
  };

}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function lives(){
health.innerHTML="";



}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});


const Gem = function(x, y, sprite) {
  this.x = 250;
  this.y = 250;


  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/Gem-Blue.png';
};

Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

(function createGems() {
  const gem1 = new Gem();

  allGems.push(gem1);

})();


// test for collision player and enemey

// Check collision between player and enemies


// random integer from MDN
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
