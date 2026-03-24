import type { ChromaticNote } from './music';

export interface StringConfig {
  note: ChromaticNote;
  octave: number;
  label: string;
  color: string;
  thickness: number;
}

export interface FretPosition {
  stringIndex: number;
  fret: number;
}

export type PinKey = `${number}-${number}`;
