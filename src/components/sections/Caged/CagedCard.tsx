import { useAudioEngine } from '../../../hooks/useAudioEngine';
import { CAGED_COLORS } from '../../../data/caged';
import type { CagedShape } from '../../../types/music';
import styles from './Caged.module.css';

interface CagedCardProps {
  shape: CagedShape;
  active: boolean;
  onClick: () => void;
}

export default function CagedCard({ shape, active, onClick }: CagedCardProps) {
  const { playNote } = useAudioEngine();
  const color = CAGED_COLORS[shape.letter];

  return (
    <div
      className={active ? styles.cardActive : styles.card}
      style={{ borderColor: color, background: active ? `${color}18` : undefined }}
      onClick={onClick}
      onMouseEnter={() => playNote(shape.letter, 3, 2)}
    >
      <div className={styles.letter} style={{ color }}>{shape.letter}</div>
      <div className={styles.note} style={{ color }}>{shape.name}</div>
      <div className={styles.desc}>{shape.description}</div>
    </div>
  );
}
