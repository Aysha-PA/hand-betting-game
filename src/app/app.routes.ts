import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { GameComponent } from './pages/game/game.component';
import { ResultComponent } from './pages/result/result.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'game', component: GameComponent },
  { path: 'result', component: ResultComponent }
];