import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LeaderboardService {
  getScores(): number[] {
    return JSON.parse(localStorage.getItem('scores') || '[]');
  }

  addScore(score: number) {
    const scores = this.getScores();
    scores.push(score);
    scores.sort((a, b) => b - a);
    localStorage.setItem('scores', JSON.stringify(scores.slice(0, 5)));
  }
}