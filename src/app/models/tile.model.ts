export type TileType = 'number' | 'dragon' | 'wind';

export interface Tile {
  id: string;
  type: TileType;
  value: number;
  label: string;
}