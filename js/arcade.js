// Enemies our player must avoid
// Variables applied to each of our instances go here,
const Enemy = function(x, y) { 
    this.x = x;
    this.y = y;
    this.speed = 100 + Math.random() * 222; // random speed to start
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png'; 
};
// Update the enemy's position, 
// required method for game Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
Enemy.prototype.update = function(dt) { 
    this.x += Math.floor(this.speed * dt); 
    if (this.x > 500) {
        this.x = -50;
        this.speed = 100 + Math.random() * 222; 
    }
    // collision with bug, player goes back to starting point
    if (player.x < this.x + 80 && 
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
            player.x = 202;
            player.y = 405;
        }
};        

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() { 
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
};

// Now write your own player class
class Player { 
    constructor() {
    this.x = 202;
    this.y = 405; 
    this.sprite = 'images/char-cat-girl.png'; 
    }
// This class requires an update(), render() and
// a handleInput() method.
    update() {

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(keyPress) {
        if (keyPress == 'left' && this.x > 0) {
            this.x -= 102;
        }
        if (keyPress == 'right' && this.x < 405) {
            this.x += 102; 
        }
        if (keyPress == 'up' && this.y > 0) {
            this.y -= 83; 
        }
        if (keyPress == 'down' && this.y < 405) {
            this.y += 83;
        }
        if (this.y < 0) {
            setTimeout(function () {
                player.x = 202;
                player.y = 405; 
            }, 600);

        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const enemyLocation = [63, 147, 230];


enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY);
    allEnemies.push(enemy);
});

const player = new Player(); 


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
