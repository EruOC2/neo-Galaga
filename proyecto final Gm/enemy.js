class Enemy {
  constructor(x, y, type = 'normal') {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.speed = 1.5;
    this.isAlive = true;
    this.type = type;
    this.hp = (type === 'resistant') ? 3 : 1;
    this.angle = 0;
    this.cooldown = int(random(60, 120));
    this.frameCount = 0;
  }

  update() {
    if (!this.isAlive) return;

    this.frameCount++;

    if (this.type === 'zigzag' || this.type === 'resistant') {
      this.angle += 0.1;
      this.x += Math.sin(this.angle) * 2;
      this.y += this.speed + Math.cos(this.angle * 2) * 0.5;
      this.speed += 0.002;

      if (this.x < this.size / 2 || this.x > width - this.size / 2) {
        this.angle += PI;
      }
    } else {
      this.y += this.speed;
    }

    if (this.cooldown > 0) this.cooldown--;
  }

  display() {
    if (!this.isAlive) return;

    push();
    imageMode(CENTER);

    const currentSprite = (this.frameCount % 60 < 40) ? enemySprite : enemySprite2;

    if (this.type === 'resistant') {
      tint(200, 100, 255);
    } else if (this.type === 'zigzag') {
      tint(255, 255, 100);
    } else {
      noTint();
    }

    image(currentSprite, this.x, this.y, 60, 60);
    pop();
  }

  takeHit() {
    this.hp--;
    if (this.hp <= 0) {
      this.isAlive = false;
      if (typeof explosionSound !== 'undefined') {
        explosionSound.play();
      }
      return true;
    }
    return false;
  }

  canShoot() {
    return this.cooldown === 0 && (this.type === 'zigzag' || this.type === 'resistant');
  }

  shoot() {
    this.cooldown = 120;
    return new Bullet(this.x, this.y + this.size / 2, 4);
  }
}
