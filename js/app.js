// Enemies our player must avoid
let allEnemies = [];

let win = 0;

let allLives = [];
let allStars = [];
let canvasWidth = 1110;
let canvasHeight = 930;


const tileWidth = 101;
const tileHeight = 83;


const elModal = document.getElementById('myModal');
const elModalText = document.getElementById('modal-text');
const btn = document.getElementById("restart");
const elImg = document.getElementById("modal-image");


//function constructor for enemy

const Enemy = function(x, y, speed, width, height, sprite) {
  this.x = x;
  this.y = y;
  this.speed = getRandomInt(100, 220);
  this.width = 101;
  this.height = 69;
  this.sprite = 'images/enemy-bug.png';
};

(function createEnemies() {
  const bug1 = new Enemy(80, 100);
  const bug2 = new Enemy(200, 410);
  const bug3 = new Enemy(320, 190);
  const bug4 = new Enemy(80, 260);
  const bug5 = new Enemy(160, 340);
  const bug6 = new Enemy(400, 190);
  const bug7 = new Enemy(600, 260);
  const bug8 = new Enemy(660, 190);

allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6, bug7, bug8);

})();



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {


  this.x += this.speed * dt;

  // When enemy goes off the canvas, bring it back on the other side
  if (this.x <= -(this.width * .5)) {
    this.x = canvasWidth + (this.width * .5);
  } else if (this.x >= canvasWidth + (this.width * .5)) {
    this.x = -(this.width * .5);
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//function constructor for player

const Player = function(x, y, width, height, startX, startY, sprite, wins) {
  this.x = x;
  this.y = y;

  this.width = 81;
  this.height = 137;

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


  //keep player in canvas borders


Player.prototype.update = function() {


  if (this.x <= 0) {
    this.x = 0;
  } else if (this.x >= 900) {
     this.x = 925;

  }
  if (this.y <= 45) {
    //player goes back to original position
    this.y = this.startY;
    this.x = this.startX;
      //keep track of stars and victory
    win += 1;
    createStars();

  } else if (this.y >= 580) {
    this.y = 570;
  }



}



// Check for collisions


function checkCollisions() {
  allEnemies.forEach(function(enemy) {


    if (Math.abs(enemy.x - player.x) < 87 &&
      Math.abs(enemy.y - player.y) < 60) {
      player.x = player.startX;
      player.y = player.startY;
      allLives.pop();
// check for game over
      if (allLives.length === 0) {
        player.defeat();
        allEnemies=[];
        delete player.sprite;

      }
    }



  });

}

//function constructor for you lost modal

Player.prototype.defeat = function() {

  "use strict";

  // Get the modal

  elModal.setAttribute("style", "display:block;");
  elImg.setAttribute("src", "images/lose.png");
  elModalText.innerHTML = "<p>You were runned over by Bugs!!</p><p>Do you wish to try again?</p>";

  // When the user clicks on the button, restartGame
  btn.onclick = function() {
    window.location.reload();

  }

}

// movements of player, keyboard event
Player.prototype.handleInput = function(key) {

  switch (key) {
    case 'up':
      this.y -= 75;
      break;
    case 'down':
      this.y += 75;

      break;
    case 'left':
      this.x -= 95;

      break;
    case 'right':
      this.x += 95;

      break;
  };

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




//function constructor for lives
const Live = function(x, y, sprite, width, height) {

  this.x = x;
  this.y = y;

  this.sprite = 'images/Heart.png';

  this.width = 40;
  this.height = 60;

};

Live.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);

};

(function createLives() {


  const live1 = new Live(860, 50);
  const live2 = new Live(910, 50);
  const live3 = new Live(960, 50);


  allLives.push(live1, live2, live3);

})();


//function constructor for stars

const Star = function(x, y, sprite, width, height) {

  this.x = x;
  this.y = y;

  this.sprite = 'images/Star.png';

  this.width = 71;
  this.height = 120;

};

Star.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);

};

//function to add stars to each win and add enemies for difficulty

function createStars() {

  const star1 = new Star(20, 20);
  const star2 = new Star(90, 20);
  const star3 = new Star(160, 20);

  if (win === 1) {
    allStars.push(star1);
    const bug9 = new Enemy(80, 100);
    const bug10 = new Enemy(200, 410);
    const bug11= new Enemy(320, 190);
    const bug12= new Enemy(80, 260);

    allEnemies.push(bug9, bug10, bug11, bug12);


  } else if (win === 2) {
    allStars.push(star2);
    const bug13 = new Enemy(160, 340);
    const bug14 = new Enemy(400, 190);
    const bug15= new Enemy(600, 260);
    const bug16= new Enemy(660, 190);
    allEnemies.push(bug13, bug14, bug15, bug16);

  } else if (win === 3) {
    allStars.push(star3);

    player.win();

    allEnemies=[];
    delete player.sprite;


  }
};



Player.prototype.win = function() {

  "use strict";
  // Get the modal

  elModal.setAttribute("style", "display:block;");
  elImg.setAttribute("src", "images/win.png");
  elModalText.innerHTML = "<p>You have skipped all the bugs! You Won!</p><p>Do you wish to play again?</p>";


  // When the user clicks on the button, restarGame
  btn.onclick = function() {
    window.location.reload();
  }

}

// random integer from MDN
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
