import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LeaderboardService } from '../../services/leaderboard-service.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule,CommonModule,],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  scores: number[] = [];

  constructor(private leaderboardService: LeaderboardService) {
    this.scores = leaderboardService.getScores();
  }
}