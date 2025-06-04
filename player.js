class Player {
  constructor() {
    this.size = 40;
    this.width = 60;
    this.height = 60;
    this.x = width / 2;
    this.y = height - 40;
    this.speed = 5;
    this.cooldown = 0;

    this.idleImage = playerIdle;
    this.thrustImage = playerThrust;
    this.currentImage = this.idleImage;

    this.thrustTimer = 0;
    this.thrustInterval = 20;
    this.yOffset = 0;
  }

  move(direction) {
    this.x += direction * this.speed;
    this.x = constrain(this.x, this.width / 2, width - this.width / 2);
  }

  shoot() {
    if (this.cooldown === 0) {
      this.cooldown = 15;

      const offset = this.width / 3;

      const leftBullet = new Bullet(this.x - offset, this.y - this.height / 2, -7);
      const rightBullet = new Bullet(this.x + offset, this.y - this.height / 2, -7);

      return [leftBullet, rightBullet];
    }
    return null;
  }

  update() {
    if (this.cooldown > 0) this.cooldown--;

    this.yOffset = sin(frameCount * 0.1) * 1.5;

    this.thrustTimer++;

    if (this.currentImage === this.idleImage && this.thrustTimer >= 10) {
      this.currentImage = this.thrustImage;
      this.thrustTimer = 0;
    } else if (this.currentImage === this.thrustImage && this.thrustTimer >= 80) {
      this.currentImage = this.idleImage;
      this.thrustTimer = 0;
    }
  }

  display() {
    imageMode(CENTER);
    image(this.currentImage, this.x, this.y + this.yOffset, this.width, this.height);
  }
}
