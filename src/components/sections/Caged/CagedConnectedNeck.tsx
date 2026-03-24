import { useAudioEngine } from '../../../hooks/useAudioEngine';
import { CAGED_COLORS } from '../../../data/caged';
import { STRINGS_OPEN } from '../../../data/strings';
import { useCagedStore } from '../../../stores/useCagedStore';
import { transposeCagedShapes } from '../../../utils/cagedTransposition';
import { noteAtFret, noteShort } from '../../../utils/noteCalculations';
import type { CagedLetter } from '../../../types/music';
import styles from './Caged.module.css';

const TOTAL_FRETS = 15;
const DOT_FRETS: Record<number, number> = { 3: 1, 5: 1, 7: 1, 9: 1, 12: 2 };
const STRING_LABELS = ['1ª Mi', '2ª Si', '3ª Sol', '4ª Re', '5ª La', '6ª Mi'];

export default function CagedConnectedNeck() {
  const { playNote } = useAudioEngine();
  const { selectedKey } = useCagedStore();
  const shapes = transposeCagedShapes(selectedKey);

  const grid: (CagedLetter | null)[][] = Array.from({ length: 6 }, () => Array(TOTAL_FRETS).fill(null));
  for (const [letter, positions] of Object.entries(shapes)) {
    positions.forEach((p) => {
      if (p.fret >= 0 && p.fret < TOTAL_FRETS) {
        grid[p.stringIndex][p.fret] = letter as CagedLetter;
      }
    });
  }

  return (
    <>
      <div style={{ overflowX: 'auto', paddingBottom: 8, marginTop: 16 }}>
        <div style={{ minWidth: 1100, background: '#110e06', border: '1px solid var(--rule)', padding: '16px 0 24px', position: 'relative' }}>
          {/* Fret markers */}
          <div style={{ display: 'flex', padding: '0 52px 0 62px', marginBottom: 4 }}>
            {Array.from({ length: TOTAL_FRETS }, (_, f) => (
              <div key={f} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: f === 12 ? 'var(--amber)' : 'var(--muted)', fontWeight: f === 12 ? 700 : 400 }}>
                {f === 0 ? 'Aire' : f}
              </div>
            ))}
          </div>
          {/* Dot markers */}
          <div style={{ display: 'flex', padding: '0 52px 0 62px', marginBottom: 4, height: 10 }}>
            {Array.from({ length: TOTAL_FRETS }, (_, f) => (
              <div key={f} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {DOT_FRETS[f] === 1 && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5c4a2a' }} />}
                {DOT_FRETS[f] === 2 && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5c4a2a', boxShadow: '10px 0 0 #5c4a2a' }} />}
              </div>
            ))}
          </div>
          {/* Strings */}
          {Array.from({ length: 6 }, (_, si) => (
            <div key={si} style={{ display: 'flex', alignItems: 'center', height: 34, position: 'relative' }}>
              <div style={{ width: 58, textAlign: 'right', paddingRight: 8, fontSize: 10, color: 'var(--muted)', flexShrink: 0, fontWeight: 600 }}>
                {STRING_LABELS[si]}
              </div>
              <div style={{ position: 'absolute', left: 62, right: 48, top: '50%', height: si < 3 ? 1 : 2, background: si < 3 ? '#d4c090' : '#b8a060', opacity: 0.4, zIndex: 0 }} />
              {Array.from({ length: TOTAL_FRETS }, (_, f) => {
                const shapeLetter = grid[si][f];
                const info = noteAtFret(STRINGS_OPEN[si].note, STRINGS_OPEN[si].octave, f);
                return (
                  <div key={f} style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: 34, position: 'relative', zIndex: 1,
                    borderRight: '2px solid #3a2e18',
                    ...(f === 0 ? { borderLeft: '4px solid #e0d0a0', borderRight: '2px solid #5c4a2a' } : {}),
                  }}>
                    {shapeLetter && (() => {
                      const col = CAGED_COLORS[shapeLetter];
                      return (
                        <div
                          style={{
                            width: 26, height: 26, borderRadius: '50%', background: col,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 8, fontWeight: 700, color: shapeLetter === 'E' ? '#000' : '#fff',
                            zIndex: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.5)', cursor: 'pointer',
                            transition: 'transform 0.12s',
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.transform = 'scale(1.2)';
                            playNote(info.note, info.octave, 2);
                          }}
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = ''; }}
                        >
                          {noteShort(info.note)}
                          <span style={{ fontSize: 5, opacity: 0.7, marginLeft: 1 }}>{shapeLetter}</span>
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
              <div style={{ width: 44, flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className={styles.legend}>
        {(['C', 'A', 'G', 'E', 'D'] as const).map((l) => (
          <div key={l} className={styles.legendItem}>
            <div className={styles.legendSwatch} style={{ background: CAGED_COLORS[l] }}>{l}</div>
            <span>Forma {l}</span>
          </div>
        ))}
      </div>
    </>
  );
}
