class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.maxRadius = 40;
    this.alpha = 255;
  }

  update() {
    this.radius += 2;
    this.alpha -= 15;
  }

  display() {
    push(); 
    noFill();
    stroke(255, this.alpha, 0, this.alpha);
    strokeWeight(2);
    ellipse(this.x, this.y, this.radius);
    pop(); 
  }

  isFinished() {
    return this.alpha <= 0;
  }
}
