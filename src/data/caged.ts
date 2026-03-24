import type { CagedShape, CagedLetter, CagedConnectedPosition } from '../types/music';

export const CAGED_SHAPES: CagedShape[] = [
  { letter: 'C', name: 'Do', description: 'Posición abierta y desplazable', frets: [null, 3, 2, 0, 1, 0] },
  { letter: 'A', name: 'La', description: 'Acorde en forma de barra', frets: [null, 0, 2, 2, 2, 0] },
  { letter: 'G', name: 'Sol', description: 'Ideal para posiciones avanzadas', frets: [3, 2, 0, 0, 0, 3] },
  { letter: 'E', name: 'Mi', description: 'Forma clásica mayor en 6ª cuerda', frets: [0, 2, 2, 1, 0, 0] },
  { letter: 'D', name: 'Re', description: 'Forma abierta en 4ª cuerda', frets: [null, null, 0, 2, 3, 2] },
];

export const CAGED_CONNECTED_C: Record<CagedLetter, CagedConnectedPosition[]> = {
  'C': [
    { stringIndex: 4, fret: 3 }, { stringIndex: 3, fret: 2 },
    { stringIndex: 2, fret: 0 }, { stringIndex: 1, fret: 1 }, { stringIndex: 0, fret: 0 },
  ],
  'A': [
    { stringIndex: 5, fret: 3 }, { stringIndex: 4, fret: 3 },
    { stringIndex: 3, fret: 5 }, { stringIndex: 2, fret: 5 },
    { stringIndex: 1, fret: 5 }, { stringIndex: 0, fret: 3 },
  ],
  'G': [
    { stringIndex: 5, fret: 8 }, { stringIndex: 4, fret: 7 },
    { stringIndex: 3, fret: 5 }, { stringIndex: 2, fret: 5 },
    { stringIndex: 1, fret: 5 }, { stringIndex: 0, fret: 8 },
  ],
  'E': [
    { stringIndex: 5, fret: 8 }, { stringIndex: 4, fret: 10 },
    { stringIndex: 3, fret: 10 }, { stringIndex: 2, fret: 9 },
    { stringIndex: 1, fret: 8 }, { stringIndex: 0, fret: 8 },
  ],
  'D': [
    { stringIndex: 3, fret: 10 }, { stringIndex: 2, fret: 12 },
    { stringIndex: 1, fret: 13 }, { stringIndex: 0, fret: 12 },
  ],
};

export const CAGED_COLORS: Record<CagedLetter, string> = {
  'C': '#c0392b',
  'A': '#8e44ad',
  'G': '#2980b9',
  'E': '#f1c40f',
  'D': '#e67e22',
};
