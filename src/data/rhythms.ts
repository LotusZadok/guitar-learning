export interface RhythmFigure {
  name: string;
  value: string;
  beats: string;
  symbol: string;
  count: number;
  totalBeats: number;
  dots: number;
  description: string;
}

export const RHYTHM_FIGURES: RhythmFigure[] = [
  { name: 'Redonda', value: '1', beats: '4 tiempos', symbol: '𝅝', count: 1, totalBeats: 4, dots: 4, description: 'Duración de compás completo' },
  { name: 'Blanca', value: '1/2', beats: '2 tiempos', symbol: '𝅗𝅥', count: 1, totalBeats: 2, dots: 2, description: 'Mitad de la redonda' },
  { name: 'Negra', value: '1/4', beats: '1 tiempo', symbol: '♩', count: 1, totalBeats: 1, dots: 1, description: '1 golpe por tiempo' },
  { name: 'Corchea', value: '1/8', beats: '½ tiempo', symbol: '♪', count: 2, totalBeats: 1, dots: 2, description: '2 golpes por tiempo' },
  { name: 'Tresillo', value: '1/12', beats: '⅓ tiempo', symbol: '♪³', count: 3, totalBeats: 2, dots: 3, description: '3 golpes en 2 negras' },
  { name: 'Semicorchea', value: '1/16', beats: '¼ tiempo', symbol: '𝅘𝅥𝅯', count: 4, totalBeats: 1, dots: 4, description: '4 golpes por tiempo' },
];
