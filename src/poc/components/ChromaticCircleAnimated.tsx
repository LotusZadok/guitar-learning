import { useMemo, useState, useCallback } from 'react';
import type { CircleNoteData } from '../data/processSteps';
import styles from './ChromaticCircleAnimated.module.css';

interface Props {
  notes: CircleNoteData[];
  arrow?: { fromPos: number; toPos: number };
  compact?: boolean;
}

const RADIUS = 140;
const CENTER = 200;
const NODE_R = 22;

function posToXY(pos: number) {
  const angle = ((pos * 30) - 90) * (Math.PI / 180);
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) };
}

const STATE_COLORS: Record<string, { fill: string; text: string }> = {
  neutral:     { fill: '#1a1a1a', text: '#6b6560' },
  tonica:      { fill: '#c0392b', text: '#f5f0e8' },
  highlighted: { fill: '#d4a017', text: '#1a1a1a' },
  natural:     { fill: 'rgba(245,240,232,0.12)', text: '#f5f0e8' },
  userPicked:  { fill: '#2980b9', text: '#f5f0e8' },
};

function arcPath(fromPos: number, toPos: number): string {
  const from = posToXY(fromPos);
  const to = posToXY(toPos);
  const midR = RADIUS * 0.6;
  const midAngle = (((fromPos + toPos) / 2) * 30 - 90) * (Math.PI / 180);
  const cx = CENTER + midR * Math.cos(midAngle);
  const cy = CENTER + midR * Math.sin(midAngle);
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

export default function ChromaticCircleAnimated({ notes, arrow, compact }: Props) {
  const size = compact ? 280 : 400;
  const [picked, setPicked] = useState<Set<number>>(new Set());

  const toggleNote = useCallback((pos: number) => {
    setPicked(prev => {
      const next = new Set(prev);
      if (next.has(pos)) next.delete(pos);
      else next.add(pos);
      return next;
    });
  }, []);

  const clearPicked = useCallback(() => setPicked(new Set()), []);

  const arrowPath = useMemo(() => {
    if (!arrow) return null;
    return arcPath(arrow.fromPos, arrow.toPos);
  }, [arrow]);

  return (
    <div className={styles.wrap}>
      <svg
        viewBox="0 0 400 400"
        width={size}
        height={size}
        className={styles.svg}
      >
        {/* center circle */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS - 35} fill="none" stroke="#2a2a2a" strokeWidth={1} />

        {/* arrow arc */}
        {arrowPath && (
          <path
            d={arrowPath}
            fill="none"
            stroke="var(--amber)"
            strokeWidth={2}
            markerEnd="url(#arrowhead)"
            className={styles.arrowPath}
          />
        )}

        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="var(--amber)" />
          </marker>
        </defs>

        {/* note nodes */}
        {notes.map((note, i) => {
          const { x, y } = posToXY(i);
          const isPicked = picked.has(i);
          const effectiveState = isPicked ? 'userPicked' : note.state;
          const colors = STATE_COLORS[effectiveState] || STATE_COLORS.neutral;
          return (
            <g
              key={i}
              className={styles.node}
              onClick={() => toggleNote(i)}
            >
              {/* hover/picked ring */}
              <circle
                cx={x}
                cy={y}
                r={NODE_R + 4}
                fill="none"
                stroke={isPicked ? '#2980b9' : 'transparent'}
                strokeWidth={2}
                className={styles.ring}
              />
              <circle
                cx={x}
                cy={y}
                r={NODE_R}
                fill={colors.fill}
                stroke={note.state === 'natural' && !isPicked ? '#f5f0e8' : 'none'}
                strokeWidth={note.state === 'natural' && !isPicked ? 1 : 0}
                className={styles.nodeCircle}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={colors.text}
                fontSize={note.label.length > 2 ? 11 : 13}
                fontFamily="'Bebas Neue', sans-serif"
                className={styles.nodeText}
              >
                {note.label}
              </text>
            </g>
          );
        })}
      </svg>

      {picked.size > 0 && (
        <button className={styles.clearBtn} onClick={clearPicked}>
          Limpiar
        </button>
      )}
    </div>
  );
}
