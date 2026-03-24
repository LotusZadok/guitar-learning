import { useState, useCallback } from 'react';
import SectionLabel from '../../shared/SectionLabel';
import ToggleSwitch from '../../shared/ToggleSwitch';
import FretCell from './FretCell';
import ScaleSelector from './ScaleSelector';
import { STRINGS_OPEN } from '../../../data/strings';
import { SCALE_PATTERNS } from '../../../data/scales';
import { useFretboardStore } from '../../../stores/useFretboardStore';
import { noteAtFret } from '../../../utils/noteCalculations';
import { getScaleNotes } from '../../../utils/scaleCalculations';
import type { PinKey } from '../../../types/fretboard';
import styles from './Fretboard.module.css';

const FRETS = 13;
const DOT_FRETS: Record<number, number> = { 3: 1, 5: 1, 7: 1, 9: 1, 12: 2 };

export default function FretboardSection() {
  const {
    pinnedNotes, showAllNotes, selectedScale, selectedRoot,
    togglePin, clearPins, setShowAllNotes, setScale, setRoot,
  } = useFretboardStore();

  const [hoverInfo, setHoverInfo] = useState('');

  const scalePattern = SCALE_PATTERNS.find((s) => s.id === selectedScale);
  const scaleNotes = scalePattern ? getScaleNotes(selectedRoot, scalePattern.intervals) : null;

  const handleHoverInfo = useCallback((text: string) => setHoverInfo(text), []);
  const handleHoverClear = useCallback(() => setHoverInfo(''), []);
  const handleTogglePin = useCallback((key: PinKey) => togglePin(key), [togglePin]);

  return (
    <div className={styles.section}>
      <SectionLabel text="07 — Mástil" />
      <h2>Notas en el Mástil (Trastes 0–12)</h2>
      <div className={styles.controls}>
        <ToggleSwitch
          label="Mostrar notas"
          on={showAllNotes}
          onToggle={() => setShowAllNotes(!showAllNotes)}
        />
        <button className={styles.btn} onClick={clearPins}>Limpiar marcas</button>
        <ScaleSelector
          selectedScale={selectedScale}
          selectedRoot={selectedRoot}
          onScaleChange={setScale}
          onRootChange={setRoot}
        />
        <div className={styles.hoverInfo}>{hoverInfo}</div>
      </div>
      <div className={styles.fbWrap}>
        <div className={styles.fretboard}>
          {/* Fret markers */}
          <div className={styles.fretMarkers}>
            {Array.from({ length: FRETS }, (_, f) => (
              <div key={f} className={f === 12 ? styles.fretCol12 : styles.fretCol}>
                {f === 0 ? 'Aire' : f}
              </div>
            ))}
          </div>
          {/* Dot markers */}
          <div className={styles.fretDots}>
            {Array.from({ length: FRETS }, (_, f) => (
              <div key={f} className={styles.fretDotCol}>
                {DOT_FRETS[f] === 1 && <div className={styles.dotMark} />}
                {DOT_FRETS[f] === 2 && <div className={styles.dotMarkDouble} />}
              </div>
            ))}
          </div>
          {/* Strings */}
          {STRINGS_OPEN.map((str, si) => (
            <div key={si} className={styles.stringRow}>
              <div className={styles.stringLabel}>{str.label}</div>
              <div style={{
                position: 'absolute', left: 62, right: 48, top: '50%',
                height: str.thickness, background: si < 3 ? '#d4c090' : '#b8a060', opacity: 0.5, zIndex: 0,
              }} />
              {Array.from({ length: FRETS }, (_, f) => {
                const info = noteAtFret(str.note, str.octave, f);
                const pinKey: PinKey = `${si}-${f}`;
                const isScaleNote = scaleNotes ? scaleNotes.has(info.note) : false;
                return (
                  <FretCell
                    key={f}
                    stringIndex={si}
                    fret={f}
                    note={info.note}
                    octave={info.octave}
                    isPinned={pinnedNotes.has(pinKey)}
                    showAllNotes={showAllNotes}
                    isScaleNote={isScaleNote}
                    onTogglePin={handleTogglePin}
                    onHoverInfo={handleHoverInfo}
                    onHoverClear={handleHoverClear}
                  />
                );
              })}
              <div className={styles.stringEnd} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.noSharpNote}>
        <strong>Recordá:</strong> No hay sostenido entre <strong>B (Si) → C (Do)</strong> ni entre <strong>E (Mi) → F (Fa)</strong>. Son semitonos naturales.
      </div>
    </div>
  );
}
