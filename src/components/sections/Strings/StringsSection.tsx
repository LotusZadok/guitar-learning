import SectionLabel from '../../shared/SectionLabel';
import RuleNote from '../../shared/RuleNote';
import styles from './StringsSection.module.css';

const STRINGS = [
  { num: '1ª', color: 'var(--string1)', name: 'Mi', en: 'E · aguda', height: 3 },
  { num: '2ª', color: 'var(--string2)', name: 'Si', en: 'B', height: 2 },
  { num: '3ª', color: 'var(--string3)', name: 'Sol', en: 'G', height: 2 },
  { num: '4ª', color: 'var(--string4)', name: 'Re', en: 'D', height: 3 },
  { num: '5ª', color: 'var(--string5)', name: 'La', en: 'A', height: 3 },
  { num: '6ª', color: 'var(--string6)', name: 'Mi', en: 'E · grave', height: 4 },
];

export default function StringsSection() {
  return (
    <div className={styles.section}>
      <SectionLabel text="01 — Cuerdas" />
      <h2>Afinación Estándar</h2>
      <div className={styles.grid}>
        {STRINGS.map((s) => (
          <div key={s.num} className={styles.row}>
            <span className={styles.num}>{s.num}</span>
            <div
              className={styles.bar}
              style={{ background: s.color, height: `${s.height}px` }}
            />
            <span className={styles.name} style={{ color: s.color }}>{s.name}</span>
            <span className={styles.noteEn}>{s.en}</span>
          </div>
        ))}
      </div>
      <RuleNote>
        Orden EADGBE de aguda a grave.<br />
        <strong>No hay sostenido entre B–C ni entre E–F.</strong>
      </RuleNote>
    </div>
  );
}
