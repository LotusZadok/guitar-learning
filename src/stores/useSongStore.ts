import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Song } from '../types/songs';
import { BUILT_IN_SONGS } from '../data/songs';

interface SongState {
  songs: Song[];
  addSong: (song: Omit<Song, 'id' | 'isBuiltIn' | 'createdAt'>) => void;
  removeSong: (id: string) => void;
}

export const useSongStore = create<SongState>()(
  persist(
    (set) => ({
      songs: BUILT_IN_SONGS,
      addSong: (song) =>
        set((state) => ({
          songs: [
            ...state.songs,
            { ...song, id: crypto.randomUUID(), isBuiltIn: false, createdAt: Date.now() },
          ],
        })),
      removeSong: (id) =>
        set((state) => ({
          songs: state.songs.filter((s) => s.id !== id || s.isBuiltIn),
        })),
    }),
    { name: 'apuntes-songs' }
  )
);
