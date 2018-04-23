
// Enemies our player must avoid
let allEnemies = [];
let canvasWidth = 1110;
let canvasHeight = 930;


const Enemy = function(x, y, speed, sprite) {
    this.x = x;
    this.y = y;
    this.speed = getRandomInt(50, 220);

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

(function createEnemies() {
    const bug1 = new Enemy (20, 470);
    const bug2 = new Enemy (10, 390);
    const bug3 = new Enemy (80, 390);
    const bug4 = new Enemy (80, 260);
    allEnemies.push(bug1, bug2, bug3, bug4);

})();



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {


  this.x += this.speed * dt;

    // When enemy goes off the canvas, bring it back on the other side
    if (this.x <= - 50) {
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

const Player = function(x,y, width, height,sprite) {
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png";
    this.width = 101;
    this.height = 171;

};

const player = new Player (450,700);

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite),
  this.x ,
  this.y
);
}



Player.prototype.update = function(dt) {
  // Check for collisions

    allEnemies.forEach(function(enemy) {

let differenceY = enemy.y - player.y;
let differenceX = enemy.x - player.x;

      if ( differenceY > 0 && differenceY < 50) {

        // Actual enemy collision
        if (player.x > enemy.x && differenceX  < 35 || player.x < enemy.x &&  differenceX < 52) {

                     console.log("you lost")
     }
      }
    });
  }

Player.prototype.handleInput = function(key){
  switch (key) {
      case 'up':
          this.y -= 80;
          break;
      case 'down':
          this.y += 80;

          break;
      case 'left':
          this.x -= 100;

          break;
      case 'right':
          this.x += 100;

          break;
};

}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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




// test for collision player and enemey

// Check collision between player and enemies


// random integer from MDN
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
