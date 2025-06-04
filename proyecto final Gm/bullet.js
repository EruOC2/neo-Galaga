class Bullet {
  constructor(x, y, speed, dx = 0, dy = 1) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.speed = speed;
    this.dx = dx;
    this.dy = dy;
  }

  update() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
  }

  display() {
    fill(255, 255, 0);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }
}