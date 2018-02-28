// Sets an initial player score of 0.
let score = 0;
document.getElementById('playerScore').innerHTML = score;

// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {

    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;

    // Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
      this.x = -50;
      this.speed = 100 + Math.floor(Math.random() * 222);
    };

    // Checks for collisions between the player and the enemies
    if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && 60 + player.y > this.y) {
      player.x = 202;
      player.y = 405; {
        score = 0;
        document.getElementById('playerScore').innerHTML = score;
        player.reset();
      }
    };
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 320;
  }

  // Is called every time the player position is updated
  update() {

    // If the player reaches the water
    if (this.y < 20) {
      score++;
      document.getElementById('playerScore').innerHTML = score;
      this.reset();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(direction) {
    if (direction == 'left' && this.x > 0) {
      this.x -= 50;
    }
    if (direction == 'right' && this.x < 400) {
      this.x += 50;
    }
    if (direction == 'up' && this.y > 3) {
      this.y -= 50;
    }
    if (direction == 'down' && this.y < 400) {
      this.y += 50;
    }
  }

  // Is called when the player is reset to the starting point
  reset() {
    this.x = 200;
    this.y = 320;
  }
}

// All enemies are placed in an array
const allEnemies = [];

// Location of the 3 enemies on the y axis located on the stone road
const enemyLocation = [63, 147, 230];

// For each enemy located on the y axis from 0 on the x axis move at a speed of 200
// Until randomly regenerated in the enemy update function above
enemyLocation.forEach(locationY => {
  enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});

// The starting location of the player
var player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
