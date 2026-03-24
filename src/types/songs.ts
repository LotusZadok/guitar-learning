export interface ChordEntry {
  name: string;
  positions: {
    string: number;
    fret: number;
  }[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  chords: ChordEntry[];
  isBuiltIn: boolean;
  createdAt: number;
}
