import { memo, useState, useCallback } from 'react';
import { useAudioEngine } from '../../../hooks/useAudioEngine';
import { NOTE_COLORS } from '../../../data/notes';
import { noteShort, noteDisplay, noteNameES } from '../../../utils/noteCalculations';
import type { ChromaticNote } from '../../../types/music';
import type { PinKey } from '../../../types/fretboard';
import styles from './Fretboard.module.css';

interface FretCellProps {
  stringIndex: number;
  fret: number;
  note: ChromaticNote;
  octave: number;
  isPinned: boolean;
  showAllNotes: boolean;
  isScaleNote: boolean;
  onTogglePin: (key: PinKey) => void;
  onHoverInfo: (text: string) => void;
  onHoverClear: () => void;
}

function FretCellInner({
  stringIndex, fret, note, octave,
  isPinned, showAllNotes, isScaleNote,
  onTogglePin, onHoverInfo, onHoverClear,
}: FretCellProps) {
  const [hovered, setHovered] = useState(false);
  const { playNoteIfNew, resetLastPlayed } = useAudioEngine();

  const key: PinKey = `${stringIndex}-${fret}`;
  const show = showAllNotes || isPinned || hovered || isScaleNote;

  const handleEnter = useCallback(() => {
    setHovered(true);
    playNoteIfNew(note, octave, stringIndex, fret);
    onHoverInfo(`${noteDisplay(note)} (${noteNameES(note)}) · Oct ${octave}`);
  }, [note, octave, stringIndex, fret, playNoteIfNew, onHoverInfo]);

  const handleLeave = useCallback(() => {
    setHovered(false);
    resetLastPlayed();
    onHoverClear();
  }, [resetLastPlayed, onHoverClear]);

  const handleClick = useCallback(() => {
    onTogglePin(key);
  }, [key, onTogglePin]);

  const dotClasses = [
    styles.noteDot,
    hovered ? styles.noteDotHovered : '',
    isPinned ? styles.noteDotPinned : '',
    isScaleNote && !isPinned ? styles.noteDotScale : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={fret === 0 ? styles.fretCellFirst : styles.fretCell}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      {show ? (
        <div className={dotClasses} style={{ background: NOTE_COLORS[note] }}>
          {noteShort(note)}
        </div>
      ) : (
        <div style={{ width: 26, height: 26 }} />
      )}
    </div>
  );
}

export default memo(FretCellInner, (prev, next) =>
  prev.isPinned === next.isPinned &&
  prev.showAllNotes === next.showAllNotes &&
  prev.isScaleNote === next.isScaleNote &&
  prev.note === next.note &&
  prev.octave === next.octave
);
