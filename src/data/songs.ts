import type { Song } from '../types/songs';

export const BUILT_IN_SONGS: Song[] = [
  {
    id: 'creep',
    title: 'Creep',
    artist: 'Radiohead',
    chords: [
      { name: 'G', positions: [{ string: 6, fret: 3 }, { string: 5, fret: 10 }, { string: 4, fret: 5 }] },
      { name: 'B', positions: [{ string: 6, fret: 7 }, { string: 5, fret: 2 }, { string: 4, fret: 9 }] },
      { name: 'C', positions: [{ string: 6, fret: 8 }, { string: 5, fret: 3 }, { string: 4, fret: 10 }] },
      { name: 'Cm', positions: [{ string: 6, fret: 8 }, { string: 5, fret: 3 }, { string: 4, fret: 10 }] },
    ],
    isBuiltIn: true,
    createdAt: 0,
  },
  {
    id: 'hotel-california',
    title: 'Hotel California',
    artist: 'Eagles',
    chords: [
      { name: 'Bm', positions: [{ string: 6, fret: 7 }, { string: 5, fret: 2 }, { string: 4, fret: 9 }] },
      { name: 'F#', positions: [{ string: 6, fret: 2 }, { string: 5, fret: 9 }, { string: 4, fret: 4 }] },
      { name: 'A', positions: [{ string: 6, fret: 5 }, { string: 5, fret: 0 }, { string: 4, fret: 7 }] },
      { name: 'E', positions: [{ string: 6, fret: 0 }, { string: 5, fret: 7 }, { string: 4, fret: 2 }] },
      { name: 'G', positions: [{ string: 6, fret: 3 }, { string: 5, fret: 10 }, { string: 4, fret: 5 }] },
      { name: 'D', positions: [{ string: 6, fret: 10 }, { string: 5, fret: 5 }, { string: 4, fret: 0 }] },
      { name: 'Em', positions: [{ string: 6, fret: 0 }, { string: 5, fret: 7 }, { string: 4, fret: 2 }] },
      { name: 'F#', positions: [{ string: 6, fret: 2 }, { string: 5, fret: 9 }, { string: 4, fret: 4 }] },
    ],
    isBuiltIn: true,
    createdAt: 0,
  },
];
