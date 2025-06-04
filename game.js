class Game {
  constructor() {
    this.scoreManager = new ScoreManager();
    this.reset();
  }

  reset() {
    this.isPlaying = false;
    this.level = 1;
    this.score = 0;
    this.lives = 3;

    this.player = new Player();
    this.bullets = [];
    this.enemies = [];
    this.enemyManager = new EnemyManager();
    this.explosions = [];
    this.enemyBullets = [];

    this.stars = [];
    for (let i = 0; i < 150; i++) {
      this.stars.push({
        x: random(width),
        y: random(height),
        size: random(1, 2),
        speed: random(0.2, 0.8)
      });
    }

    this.displayTopScores();
  }

  start() {
    this.reset();
    this.isPlaying = true;
    this.enemyManager.loadLevel(this.level, this.enemies);
  }

  update() {
    if (!this.isPlaying) return;

    this.player.update();
    for (let bullet of this.bullets) bullet.update();
    for (let enemy of this.enemies) enemy.update();
    for (let explosion of this.explosions) explosion.update();
    this.explosions = this.explosions.filter(e => !e.isFinished());

    this.checkBulletEnemyCollisions();
    this.checkEnemiesPassed();
    this.checkEnemyPlayerCollisions();

    for (let enemy of this.enemies) {
      if (enemy.canShoot && enemy.canShoot()) {
        const shots = enemy.shoot();
        if (Array.isArray(shots)) {
          this.enemyBullets.push(...shots);
        } else {
          this.enemyBullets.push(shots);
        }
      }
    }

    for (let bullet of this.enemyBullets) bullet.update();
    this.checkEnemyBulletHits();

    if (this.enemies.every(e => !e.isAlive)) {
      this.nextLevel();
    }
  }

  display() {
    this.drawBackground();

    if (!this.isPlaying) {
      fill(255, 255, 0);
      textAlign(CENTER, CENTER);
      textSize(24);
      text("Presiona ESPACIO para comenzar", width / 2, height / 2);
      if (this.lives <= 0) {
        fill(255, 0, 0);
        textSize(32);
        text("GAME OVER", width / 2, height / 2 + 40);
      }
      return;
    }

    this.player.display();
    for (let bullet of this.bullets) bullet.display();
    for (let bullet of this.enemyBullets) bullet.display();
    for (let enemy of this.enemies) enemy.display();
    for (let explosion of this.explosions) explosion.display();

    this.displayHUD();
  }

  drawBackground() {
    background(0);
    noStroke();
    fill(255);
    for (let star of this.stars) {
      circle(star.x, star.y, star.size);
      star.y += star.speed;
      if (star.y > height) {
        star.y = 0;
        star.x = random(width);
      }
    }
  }

  displayHUD() {
    push();
    fill(255, 255, 0);
    textSize(16);
    textAlign(LEFT);
    text(`Puntos: ${this.score}`, 20, 25);
    textAlign(RIGHT);
    text(`Nivel: ${this.level}`, width - 20, 25);
    textAlign(CENTER);
    text(`Vidas: ${this.lives}`, width / 2, 25);
    pop();
  }

  handleInput(key) {
    if (key === 'a' || key === 'A') this.player.move(-1);
    else if (key === 'd' || key === 'D') this.player.move(1);
  }

  checkBulletEnemyCollisions() {
    for (let bullet of this.bullets) {
      for (let enemy of this.enemies) {
        if (
          enemy.isAlive &&
          dist(bullet.x, bullet.y, enemy.x, enemy.y) < (enemy.size / 2 + bullet.radius)
        ) {
          const died = enemy.takeHit?.();
          if (died) {
            this.explosions.push(new Explosion(enemy.x, enemy.y));
            if (explosionSound) explosionSound.play(); 
            this.score += 1;
          }
          bullet.y = -999;
        }
      }
    }

    this.bullets = this.bullets.filter(b => b.y > -10);
  }

  checkEnemiesPassed() {
    for (let enemy of this.enemies) {
      if (enemy.isAlive && enemy.y > height) {
        enemy.isAlive = false;
        this.lives--;
        this.explosions.push(new Explosion(enemy.x, height - 20));
        if (explosionSound) explosionSound.play();
        if (this.lives <= 0) this.endGame();
      }
    }
  }

  checkEnemyPlayerCollisions() {
    for (let enemy of this.enemies) {
      if (
        enemy.isAlive &&
        dist(enemy.x, enemy.y, this.player.x, this.player.y) < (enemy.size / 2 + this.player.size / 2)
      ) {
        enemy.isAlive = false; 
        this.explosions.push(new Explosion(enemy.x, enemy.y));
        if (explosionSound) explosionSound.play(); 
        this.lives--;
        if (this.lives <= 0) this.endGame();
        break;
      }
    }
  }

  checkEnemyBulletHits() {
    this.enemyBullets = this.enemyBullets.filter(bullet => {
      const d = dist(bullet.x, bullet.y, this.player.x, this.player.y);
      if (d < this.player.size / 2 + bullet.radius) {
        this.lives--;
        if (explosionSound) explosionSound.play(); 
        if (this.lives <= 0) {
          this.endGame();
        }
        return false;
      }
      return bullet.y < height;
    });
  }

  endGame() {
    this.isPlaying = false;
    this.scoreManager.addScore(this.score);
    this.displayTopScores();
  }

  nextLevel() {
    this.level++;
    if (this.level > 3) this.level = 1;
    this.enemyManager.loadLevel(this.level, this.enemies);
  }

  displayTopScores() {
    const topScores = this.scoreManager.getScores();
    const container = document.getElementById("top-scores");
    let html = "<h3 style='color: yellow;'>Top 5:</h3><ol>";
    for (let score of topScores) {
      html += `<li style='color: white;'>${score}</li>`;
    }
    html += "</ol>";
    container.innerHTML = html;
  }
}
