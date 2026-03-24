import SectionLabel from '../../shared/SectionLabel';
import CagedCard from './CagedCard';
import CagedIndividualDiagram from './CagedIndividualDiagram';
import CagedConnectedNeck from './CagedConnectedNeck';
import CagedKeySelector from './CagedKeySelector';
import { CAGED_SHAPES } from '../../../data/caged';
import { useCagedStore } from '../../../stores/useCagedStore';
import styles from './Caged.module.css';

export default function CagedSection() {
  const { view, setView, activeShapeIndex, setActiveShape } = useCagedStore();

  const handleCardClick = (i: number) => {
    setActiveShape(activeShapeIndex === i ? null : i);
  };

  return (
    <div className={styles.section}>
      <SectionLabel text="04 — Sistema" />
      <h2>Sistema CAGED</h2>
      <p style={{ marginBottom: 20 }}>5 formas de acordes que cubren todo el mástil.</p>

      <div className={styles.row}>
        {CAGED_SHAPES.map((s, i) => (
          <CagedCard
            key={s.letter}
            shape={s}
            active={activeShapeIndex === i}
            onClick={() => handleCardClick(i)}
          />
        ))}
      </div>

      <div className={styles.viewToggle}>
        <button
          className={view === 'individual' ? styles.viewBtnActive : styles.viewBtn}
          onClick={() => setView('individual')}
        >
          Individual
        </button>
        <button
          className={view === 'connected' ? styles.viewBtnActive : styles.viewBtn}
          onClick={() => setView('connected')}
        >
          Conectadas (5 formas)
        </button>
      </div>

      <CagedKeySelector />

      <div className={styles.fbWrap}>
        {view === 'connected' ? (
          <CagedConnectedNeck />
        ) : activeShapeIndex !== null ? (
          <CagedIndividualDiagram shape={CAGED_SHAPES[activeShapeIndex]} />
        ) : (
          <p className={styles.prompt}>
            Hacé click en una forma CAGED arriba para ver el diagrama individual.
          </p>
        )}
      </div>
    </div>
  );
}
