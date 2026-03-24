import { CAGED_COLORS } from '../../../data/caged';
import { STRINGS_OPEN } from '../../../data/strings';
import { noteAtFret, noteShort } from '../../../utils/noteCalculations';
import type { CagedShape } from '../../../types/music';

interface Props {
  shape: CagedShape;
}

export default function CagedIndividualDiagram({ shape }: Props) {
  const color = CAGED_COLORS[shape.letter];
  const maxFret = Math.max(...shape.frets.filter((f): f is number => f !== null));
  const showFrets = Math.max(4, maxFret + 1);
  const stringLabels = ['1ª E', '2ª B', '3ª G', '4ª D', '5ª A', '6ª E'];
  const displayFrets = [...shape.frets].reverse();

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: 280, maxWidth: 400, background: '#110e06', border: '1px solid var(--rule)', padding: '14px 8px', borderRadius: 4 }}>
        <div style={{ textAlign: 'center', marginBottom: 8, fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color }}>
          {shape.letter} — {shape.name}
        </div>
        <div style={{ display: 'flex', marginLeft: 50, marginBottom: 4 }}>
          {Array.from({ length: showFrets }, (_, f) => (
            <div key={f} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: 'var(--muted)' }}>{f}</div>
          ))}
        </div>
        {Array.from({ length: 6 }, (_, si) => {
          const fretVal = displayFrets[si];
          return (
            <div key={si} style={{ display: 'flex', alignItems: 'center', height: 28 }}>
              <div style={{ width: 46, textAlign: 'right', paddingRight: 6, fontSize: 9, color: 'var(--muted)', flexShrink: 0 }}>
                {stringLabels[si]}
              </div>
              <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: si < 3 ? 1 : 1.5, background: '#b8a060', opacity: 0.3 }} />
                {Array.from({ length: showFrets }, (_, f) => {
                  const isPressed = fretVal === f;
                  const isMuted = fretVal === null && f === 0;
                  return (
                    <div key={f} style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      height: 28, borderRight: '2px solid #5c4a2a',
                      ...(f === 0 ? { borderLeft: '4px solid #e0d0a0' } : {}),
                      position: 'relative',
                    }}>
                      {isPressed && (() => {
                        const info = noteAtFret(STRINGS_OPEN[si].note, STRINGS_OPEN[si].octave, f);
                        return (
                          <div style={{
                            width: 22, height: 22, borderRadius: '50%', background: color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 8, fontWeight: 700, color: '#fff', zIndex: 2,
                            boxShadow: `0 0 6px ${color}80`,
                          }}>
                            {noteShort(info.note)}
                          </div>
                        );
                      })()}
                      {isMuted && <div style={{ fontSize: 12, color: 'var(--muted)', zIndex: 2 }}>✕</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
