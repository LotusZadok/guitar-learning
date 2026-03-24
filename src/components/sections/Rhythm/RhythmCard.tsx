import { useAudioEngine } from '../../../hooks/useAudioEngine';
import type { RhythmFigure } from '../../../data/rhythms';
import styles from './Rhythm.module.css';

interface RhythmCardProps {
  figure: RhythmFigure;
}

export default function RhythmCard({ figure }: RhythmCardProps) {
  const { playRhythm } = useAudioEngine();

  const handlePlay = () => playRhythm(figure.count, figure.totalBeats);

  return (
    <div
      className={styles.card}
      data-beats={figure.count}
      onMouseEnter={handlePlay}
      onClick={handlePlay}
    >
      <div className={styles.symbol}>{figure.symbol}</div>
      <div className={styles.name}>{figure.name}</div>
      <div className={styles.desc}>{figure.value} · {figure.beats}</div>
      <div className={styles.beatsVisual}>
        {Array.from({ length: figure.dots }, (_, i) => (
          <div key={i} className={i === 0 ? styles.beatDotAccent : styles.beatDot} />
        ))}
      </div>
      <div className={styles.desc} style={{ marginTop: 4 }}>{figure.description}</div>
      <div className={styles.hint}>hover / click → escuchar</div>
    </div>
  );
}
