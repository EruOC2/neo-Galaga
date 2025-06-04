class BossEnemy {
  constructor(x, y, player) {
    this.x = x;
    this.y = y;
    this.initialY = y;
    this.size = 100;
    this.hp = 20;
    this.maxHp = 20;
    this.isAlive = true;
    this.player = player;

    this.cooldown = 90;
    this.cooldownTime = 90;

    this.horizontalAngle = 0;
    this.verticalAngle = 0;
    this.horizontalAmplitude = width / 2.5;
    this.verticalAmplitude = 40;
    this.horizontalSpeed = 0.01;
    this.verticalSpeed = 0.03;
  }

  update() {
    if (!this.isAlive) return;

    this.horizontalAngle += this.horizontalSpeed;
    this.x = width / 2 + Math.sin(this.horizontalAngle) * this.horizontalAmplitude;

    const targetY = this.player.y < height / 2 ? this.player.y : this.initialY;
    this.y = targetY + Math.sin(this.verticalAngle) * this.verticalAmplitude;
    this.verticalAngle += this.verticalSpeed;

    if (this.cooldown > 0) this.cooldown--;
  }

  display() {
    if (!this.isAlive) return;

    push();
    translate(this.x, this.y);
    imageMode(CENTER);


    if (bossSprite) {
      image(bossSprite, 0, 0, this.size + 40, this.size + 40);
    } else {
      fill(255, 100, 0);
      stroke(255);
      strokeWeight(2);
      ellipse(0, 0, this.size, this.size);
    }


    noStroke();
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(0, -this.size / 1.5, map(this.hp, 0, this.maxHp, 0, this.size), 8);
    pop();
  }

  takeHit() {
    this.hp--;
    if (this.hp <= 0) {
      this.isAlive = false;
      return true;
    }
    return false;
  }

  canShoot() {
    return this.cooldown <= 0;
  }

  shoot() {
    this.cooldown = this.cooldownTime;

    return [
      new Bullet(this.x, this.y + this.size / 2, 4),
      new Bullet(this.x - this.size / 3, this.y + this.size / 2, 4),
      new Bullet(this.x + this.size / 3, this.y + this.size / 2, 4)
    ];
  }
}
