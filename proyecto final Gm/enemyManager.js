class EnemyManager {
  loadLevel(level, enemyArray) {
    enemyArray.length = 0;

    if (level === 3) {
      enemyArray.push(new BossEnemy(width / 2, 100, game.player));
      return; 
    }

    if (level === 1) {
      for (let i = 0; i < 10; i++) {
        const x = 50 + i * 50;
        const y = random(-200, -50);
        enemyArray.push(new Enemy(x, y));
      }
    }

    if (level === 2) {
      for (let i = 0; i < 8; i++) {
        const x = 60 + i * 60;
        const y = random(-200, -50);
        enemyArray.push(new Enemy(x, y, 'zigzag'));
      }

      const rx = random(100, 500);
      const ry = random(-300, -100);
      enemyArray.push(new Enemy(rx, ry, 'resistant'));
    }
  }
}
