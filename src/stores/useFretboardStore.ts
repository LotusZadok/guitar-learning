import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PinKey } from '../types/fretboard';
import type { ChromaticNote } from '../types/music';

interface FretboardState {
  pinnedNotes: Set<PinKey>;
  showAllNotes: boolean;
  selectedScale: string | null;
  selectedRoot: ChromaticNote;

  togglePin: (key: PinKey) => void;
  clearPins: () => void;
  setShowAllNotes: (show: boolean) => void;
  setScale: (scaleId: string | null) => void;
  setRoot: (root: ChromaticNote) => void;
}

export const useFretboardStore = create<FretboardState>()(
  persist(
    (set) => ({
      pinnedNotes: new Set(),
      showAllNotes: false,
      selectedScale: null,
      selectedRoot: 'C',

      togglePin: (key) =>
        set((state) => {
          const next = new Set(state.pinnedNotes);
          next.has(key) ? next.delete(key) : next.add(key);
          return { pinnedNotes: next };
        }),
      clearPins: () => set({ pinnedNotes: new Set() }),
      setShowAllNotes: (show) => set({ showAllNotes: show }),
      setScale: (scaleId) => set({ selectedScale: scaleId }),
      setRoot: (root) => set({ selectedRoot: root }),
    }),
    {
      name: 'apuntes-fretboard',
      storage: {
        getItem: (name) => {
          const raw = localStorage.getItem(name);
          if (!raw) return null;
          const parsed = JSON.parse(raw);
          if (parsed?.state?.pinnedNotes) {
            parsed.state.pinnedNotes = new Set(parsed.state.pinnedNotes);
          }
          return parsed;
        },
        setItem: (name, value) => {
          const serializable = {
            ...value,
            state: {
              ...value.state,
              pinnedNotes: [...value.state.pinnedNotes],
            },
          };
          localStorage.setItem(name, JSON.stringify(serializable));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
