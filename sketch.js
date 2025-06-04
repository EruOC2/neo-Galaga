let game;
let playerThrust, playerIdle;
let enemySprite1, enemySprite2;
let explosionSound;

function preload() {
  playerThrust = loadImage("assets/images/player.png");
  playerIdle = loadImage("assets/images/player1.png");
  enemySprite = loadImage("assets/images/enemy.png");
  enemySprite2 = loadImage("assets/images/enemy1.png");
  bossSprite = loadImage("assets/images/boss.png");

  soundFormats('mp3', 'wav');
  explosionSound = loadSound("assets/sounds/explosion.mp3");
}

function setup() {
  createCanvas(600, 600);
  game = new Game();
}

function draw() {
  background(0);
  if (game.isPlaying) {
    if (keyIsDown(65)) game.player.move(-1); // A
    if (keyIsDown(68)) game.player.move(1);  // D

    if (keyIsDown(32)) { // espacio
      const bullets = game.player.shoot();
      if (bullets) {
        for (let b of bullets) {
          game.bullets.push(b);
        }
      }
    }
  }

  game.update();
  game.display();
}

function keyPressed() {
  if (key === ' ') {
    if (!game.isPlaying) {
      game.start();
    }
  }
}

