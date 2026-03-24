import { ALL } from '../../../data/notes';
import { SCALE_PATTERNS } from '../../../data/scales';
import { noteShort } from '../../../utils/noteCalculations';
import type { ChromaticNote } from '../../../types/music';
import styles from './Fretboard.module.css';

interface Props {
  selectedScale: string | null;
  selectedRoot: ChromaticNote;
  onScaleChange: (id: string | null) => void;
  onRootChange: (root: ChromaticNote) => void;
}

export default function ScaleSelector({ selectedScale, selectedRoot, onScaleChange, onRootChange }: Props) {
  return (
    <div className={styles.scaleSelector}>
      <select
        className={styles.scaleSelect}
        value={selectedScale || ''}
        onChange={(e) => onScaleChange(e.target.value || null)}
      >
        <option value="">Sin escala</option>
        {SCALE_PATTERNS.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      {selectedScale && (
        <select
          className={styles.scaleSelect}
          value={selectedRoot}
          onChange={(e) => onRootChange(e.target.value as ChromaticNote)}
        >
          {ALL.map((n) => (
            <option key={n} value={n}>{noteShort(n)}</option>
          ))}
        </select>
      )}
    </div>
  );
}
