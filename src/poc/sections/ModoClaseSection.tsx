import SectionLabel from '../../components/shared/SectionLabel';
import ChromaticCircleAnimated from '../components/ChromaticCircleAnimated';
import type { CircleNoteData } from '../data/processSteps';
import styles from './ModoClaseSection.module.css';

const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const FREE_NOTES: CircleNoteData[] = CHROMATIC.map(label => ({
  label,
  state: 'natural',
}));

export default function ModoClaseSection() {
  return (
    <section className={styles.section}>
      <SectionLabel text="06 — Modo clase" />
      <h2>Espacio del profesor</h2>

      <p className={styles.intro}>
        Las secciones anteriores son para que sus estudiantes aprendan por su cuenta.
        Esta es para usted: una pizarra interactiva con audio para usar en clase.
        Marque, escuche, compare. No hay flujo guiado aquí — usted manda.
      </p>

      <div className={styles.circleWrap}>
        <ChromaticCircleAnimated
          notes={FREE_NOTES}
          playOnClick
          inlineClearButton
        />
      </div>
    </section>
  );
}
