import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { GameService, Tile } from '../../services/game.service';
import { LeaderboardService } from '../../services/leaderboard-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  currentHand: Tile[] = [];
  previousValue = 0;
  gameOver = false;
  finalScore = 0;
 previousHand: any[] = [];
  constructor(
    private gameService: GameService,
    private leaderboardService: LeaderboardService,
    private router: Router
  ) {}
  ngOnInit() {
    this.startGame(); // <-- start the first hand automatically
  }

  startGame() {
    this.gameOver = false;
    this.currentHand = [];
    this.previousValue = 0;
    this.finalScore = 0;
    this.gameService.initGame();
    this.currentHand = this.gameService.drawHand();
    this.previousValue = this.getTotal(this.currentHand);
  }

  betHigher() { this.playRound('higher'); }
  betLower() { this.playRound('lower'); }

  playRound(type: 'higher' | 'lower') {
    const newHand = this.gameService.drawHand();
    const newTotal = this.getTotal(newHand);
    const win = (type === 'higher' && newTotal > this.previousValue)
             || (type === 'lower' && newTotal < this.previousValue);

    this.updateTileValues(newHand, win);

   this.previousHand = [...this.currentHand];
   this.currentHand = newHand;

    if (newHand.some(t => t.value <= 0 || t.value >= 10)) {
      this.endGame(newTotal);
    }
  }

  getTotal(hand: Tile[]) {
    return hand.reduce((sum, t) => sum + t.value, 0);
  }

  updateTileValues(hand: Tile[], isWinningHand: boolean) {
    hand.forEach(tile => {
      if (tile.type === 'number') return;
      tile.value += isWinningHand ? 1 : -1;
      if (tile.value < 0) tile.value = 0;
      if (tile.value > 10) tile.value = 10;
    });
  }

  endGame(finalScore: number) {
    this.finalScore = finalScore;
    this.gameOver = true;
    this.leaderboardService.addScore(finalScore);
    this.router.navigate(['/result']);
  }
}