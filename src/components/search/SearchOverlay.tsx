import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL, NOTE_ES } from '../../data/notes';
import { SCALE_PATTERNS } from '../../data/scales';
import { useSongStore } from '../../stores/useSongStore';
import { noteShort } from '../../utils/noteCalculations';
import styles from './SearchOverlay.module.css';

interface SearchResult {
  label: string;
  section: string;
  path: string;
}

const SECTION_RESULTS: SearchResult[] = [
  { label: 'Cuerdas — Afinación Estándar', section: '01', path: '/cuerdas' },
  { label: 'Ritmo — Figuras Rítmicas', section: '02', path: '/ritmo' },
  { label: 'Notas — Círculo Cromático', section: '03', path: '/cromatico' },
  { label: 'Sistema — CAGED', section: '04', path: '/caged' },
  { label: 'Intervalos — Patrón Interválico', section: '05', path: '/intervalos' },
  { label: 'Acordes — Tríadas', section: '06', path: '/triadas' },
  { label: 'Mástil — Notas en el Mástil', section: '07', path: '/mastil' },
  { label: 'Canciones', section: '08', path: '/canciones' },
  { label: 'Metrónomo', section: '09', path: '/metronomo' },
];

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const songs = useSongStore((s) => s.songs);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery('');
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const allResults = useMemo<SearchResult[]>(() => {
    const results = [...SECTION_RESULTS];
    ALL.forEach((note) => {
      results.push({
        label: `${noteShort(note)} — ${NOTE_ES[note]}`,
        section: 'Nota',
        path: '/cromatico',
      });
    });
    SCALE_PATTERNS.forEach((s) => {
      results.push({ label: `Escala ${s.name}`, section: 'Escala', path: '/mastil' });
    });
    songs.forEach((s) => {
      results.push({ label: `${s.title} — ${s.artist}`, section: 'Canción', path: '/canciones' });
    });
    return results;
  }, [songs]);

  const filtered = useMemo(() => {
    if (!query.trim()) return SECTION_RESULTS;
    const q = query.toLowerCase();
    return allResults.filter((r) => r.label.toLowerCase().includes(q));
  }, [query, allResults]);

  const handleSelect = useCallback((path: string) => {
    navigate(path);
    setOpen(false);
  }, [navigate]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={() => setOpen(false)}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <input
          className={styles.input}
          placeholder="Buscar notas, escalas, secciones..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <div className={styles.results}>
          {filtered.slice(0, 12).map((r, i) => (
            <div key={i} className={styles.item} onClick={() => handleSelect(r.path)}>
              <span>{r.label}</span>
              <span className={styles.itemSection}>{r.section}</span>
            </div>
          ))}
        </div>
        <div className={styles.hint}>Ctrl+K para abrir · Esc para cerrar</div>
      </div>
    </div>
  );
}
