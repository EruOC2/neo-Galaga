class ScoreManager {
  constructor(limit = 5) {
    this.limit = limit;
    this.key = "topScores";
  }

  getScores() {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }

  saveScores(scores) {
    localStorage.setItem(this.key, JSON.stringify(scores));
  }

  addScore(score) {
    let scores = this.getScores();

    
    if (!scores.includes(score)) {
      scores.push(score);
      scores.sort((a, b) => b - a);

      
      scores = [...new Set(scores)];

      
      scores = scores.slice(0, this.limit);

      this.saveScores(scores);
    }
  }

  renderScores() {
    const container = document.getElementById("top-scores");
    const scores = this.getScores();

    let html = "<h3 style='color: yellow;'>Top 5:</h3><ol>";
    for (let s of scores) {
      html += `<li style='color: white;'>${s}</li>`;
    }
    html += "</ol>";

    container.innerHTML = html;
  }

  clearScores() {
    localStorage.removeItem(this.key);
  }
}
