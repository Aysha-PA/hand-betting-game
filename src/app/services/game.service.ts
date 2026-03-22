import { Injectable } from '@angular/core';

export interface Tile {
  name: string;
  type: 'number' | 'dragon' | 'wind';
  value: number;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  drawPile: Tile[] = [];
  discardPile: Tile[] = [];

  initGame() {
    this.drawPile = this.generateTiles();
    this.discardPile = [];
  }

  generateTiles(): Tile[] {
    const tiles: Tile[] = [];
    // Number tiles 1-9 Bamboo (example)
    for (let i = 1; i <= 9; i++) {
      tiles.push({ name: i + ' Bamboo', type: 'number', value: i });
    }
    // Dragons
    ['Red', 'Green', 'White'].forEach(d => {
      tiles.push({ name: d + ' Dragon', type: 'dragon', value: 5 });
    });
    // Winds
    ['East', 'South', 'West', 'North'].forEach(w => {
      tiles.push({ name: w + ' Wind', type: 'wind', value: 5 });
    });
    return tiles.sort(() => Math.random() - 0.5);
  }

  drawHand(): Tile[] {
  if (this.drawPile.length === 0) {
    this.drawPile = [...this.discardPile];
    this.discardPile = [];
    this.drawPile.sort(() => Math.random() - 0.5);
  }

  const hand = this.drawPile.splice(0, 4);
  this.discardPile.push(...hand);
  return hand;
}
}