import { useRef, useCallback } from 'react';
import SectionLabel from '../../shared/SectionLabel';
import { useMetronome, type TimeSignature } from '../../../hooks/useMetronome';
import styles from './Metronome.module.css';

const TIME_SIGNATURES: TimeSignature[] = ['4/4', '3/4', '6/8'];

function beatsForTS(ts: TimeSignature): number {
  switch (ts) {
    case '4/4': return 4;
    case '3/4': return 3;
    case '6/8': return 6;
  }
}

export default function MetronomeSection() {
  const { bpm, timeSignature, isPlaying, currentBeat, start, stop, setBpm, setTimeSignature } = useMetronome();
  const tapTimesRef = useRef<number[]>([]);

  const handleTap = useCallback(() => {
    const now = performance.now();
    tapTimesRef.current.push(now);
    if (tapTimesRef.current.length > 5) tapTimesRef.current.shift();
    if (tapTimesRef.current.length >= 2) {
      const times = tapTimesRef.current;
      const intervals = [];
      for (let i = 1; i < times.length; i++) {
        intervals.push(times[i] - times[i - 1]);
      }
      const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const newBpm = Math.round(60000 / avg);
      if (newBpm >= 40 && newBpm <= 220) setBpm(newBpm);
    }
  }, [setBpm]);

  const numBeats = beatsForTS(timeSignature);

  return (
    <div className={styles.section}>
      <SectionLabel text="09 — Metrónomo" />
      <h2>Metrónomo</h2>
      <div className={styles.controls}>
        <div className={styles.bpmWrap}>
          <div>
            <div className={styles.bpmValue}>{bpm}</div>
            <div className={styles.bpmLabel}>BPM</div>
          </div>
          <input
            type="range"
            className={styles.slider}
            min={40}
            max={220}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
          />
        </div>
        <button
          className={isPlaying ? styles.btnActive : styles.btn}
          onClick={isPlaying ? stop : start}
        >
          {isPlaying ? 'STOP' : 'PLAY'}
        </button>
        <div className={styles.tsWrap}>
          {TIME_SIGNATURES.map((ts) => (
            <button
              key={ts}
              className={ts === timeSignature ? styles.tsBtnActive : styles.tsBtn}
              onClick={() => setTimeSignature(ts)}
            >
              {ts}
            </button>
          ))}
        </div>
        <button className={styles.tapBtn} onClick={handleTap}>
          TAP TEMPO
        </button>
      </div>
      <div className={styles.beats}>
        {Array.from({ length: numBeats }, (_, i) => (
          <div
            key={i}
            className={isPlaying && currentBeat === i ? styles.beatDotActive : styles.beatDot}
          />
        ))}
      </div>
    </div>
  );
}
