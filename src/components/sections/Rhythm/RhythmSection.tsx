import SectionLabel from '../../shared/SectionLabel';
import RhythmCard from './RhythmCard';
import { RHYTHM_FIGURES } from '../../../data/rhythms';
import styles from './Rhythm.module.css';

export default function RhythmSection() {
  return (
    <div className={styles.section}>
      <SectionLabel text="02 — Ritmo" />
      <h2>Figuras Rítmicas</h2>
      <div className={styles.grid}>
        {RHYTHM_FIGURES.map((f) => (
          <RhythmCard key={f.name} figure={f} />
        ))}
      </div>
    </div>
  );
}
