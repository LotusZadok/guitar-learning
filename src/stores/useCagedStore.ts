import { create } from 'zustand';
import type { ChromaticNote } from '../types/music';

type CagedView = 'individual' | 'connected';

interface CagedState {
  view: CagedView;
  activeShapeIndex: number | null;
  selectedKey: ChromaticNote;

  setView: (view: CagedView) => void;
  setActiveShape: (index: number | null) => void;
  setKey: (key: ChromaticNote) => void;
}

export const useCagedStore = create<CagedState>((set) => ({
  view: 'individual',
  activeShapeIndex: null,
  selectedKey: 'C',

  setView: (view) => set({ view }),
  setActiveShape: (index) => set({ activeShapeIndex: index }),
  setKey: (key) => set({ selectedKey: key }),
}));
