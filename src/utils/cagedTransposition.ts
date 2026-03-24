import { ALL } from '../data/notes';
import { CAGED_CONNECTED_C } from '../data/caged';
import type { ChromaticNote, CagedLetter, CagedConnectedPosition } from '../types/music';

export function transposeCagedShapes(
  toKey: ChromaticNote
): Record<CagedLetter, CagedConnectedPosition[]> {
  const offset = (ALL.indexOf(toKey) - ALL.indexOf('C') + 12) % 12;
  const result = {} as Record<CagedLetter, CagedConnectedPosition[]>;

  for (const [letter, positions] of Object.entries(CAGED_CONNECTED_C)) {
    result[letter as CagedLetter] = positions.map((p) => ({
      stringIndex: p.stringIndex,
      fret: p.fret + offset,
    }));
  }

  return result;
}
