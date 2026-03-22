import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LeaderboardService } from '../../services/leaderboard-service.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  scores: number[] = [];
  finalScore = 0;

  constructor(private leaderboardService: LeaderboardService) {
    this.scores = leaderboardService.getScores();
    this.finalScore = this.scores[0] || 0; // latest score
  }
}