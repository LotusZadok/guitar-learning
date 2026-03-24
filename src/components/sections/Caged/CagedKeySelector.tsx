import { ALL } from '../../../data/notes';
import { useCagedStore } from '../../../stores/useCagedStore';
import { noteShort } from '../../../utils/noteCalculations';
import type { ChromaticNote } from '../../../types/music';
import styles from './Caged.module.css';

export default function CagedKeySelector() {
  const { selectedKey, setKey } = useCagedStore();

  return (
    <div className={styles.keySelector}>
      <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, alignSelf: 'center', marginRight: 4 }}>
        Tonalidad:
      </span>
      {ALL.map((note) => (
        <button
          key={note}
          className={note === selectedKey ? styles.keyBtnActive : styles.keyBtn}
          onClick={() => setKey(note as ChromaticNote)}
        >
          {noteShort(note)}
        </button>
      ))}
    </div>
  );
}
