import { useState } from 'react';
import { useSongStore } from '../../../stores/useSongStore';
import type { ChordEntry } from '../../../types/songs';
import styles from './Songs.module.css';

interface ChordInput {
  name: string;
  fret6: string;
  fret5: string;
  fret4: string;
}

export default function AddSongForm() {
  const addSong = useSongStore((s) => s.addSong);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [chords, setChords] = useState<ChordInput[]>([
    { name: '', fret6: '', fret5: '', fret4: '' },
  ]);

  const updateChord = (i: number, field: keyof ChordInput, value: string) => {
    const next = [...chords];
    next[i] = { ...next[i], [field]: value };
    setChords(next);
  };

  const addChordCol = () => {
    setChords([...chords, { name: '', fret6: '', fret5: '', fret4: '' }]);
  };

  const removeChordCol = (i: number) => {
    if (chords.length > 1) setChords(chords.filter((_, idx) => idx !== i));
  };

  const handleSubmit = () => {
    if (!title.trim() || !artist.trim()) return;
    const entries: ChordEntry[] = chords
      .filter((c) => c.name.trim())
      .map((c) => ({
        name: c.name,
        positions: [
          ...(c.fret6 !== '' ? [{ string: 6, fret: Number(c.fret6) }] : []),
          ...(c.fret5 !== '' ? [{ string: 5, fret: Number(c.fret5) }] : []),
          ...(c.fret4 !== '' ? [{ string: 4, fret: Number(c.fret4) }] : []),
        ],
      }));
    if (entries.length === 0) return;
    addSong({ title: title.trim(), artist: artist.trim(), chords: entries });
    setTitle('');
    setArtist('');
    setChords([{ name: '', fret6: '', fret5: '', fret4: '' }]);
  };

  return (
    <div className={styles.addForm}>
      <h2 style={{ fontSize: 20, marginBottom: 12 }}>Agregar Canción</h2>
      <div className={styles.formRow}>
        <input
          className={styles.input}
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Artista"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>
        Acordes (nombre + trastes en cuerdas 6ª, 5ª, 4ª):
      </div>
      {chords.map((c, i) => (
        <div key={i} className={styles.chordInputWrap}>
          <input className={styles.chordInput} placeholder="Acorde" value={c.name} onChange={(e) => updateChord(i, 'name', e.target.value)} />
          <input className={styles.chordInput} placeholder="6ª" value={c.fret6} onChange={(e) => updateChord(i, 'fret6', e.target.value)} type="number" />
          <input className={styles.chordInput} placeholder="5ª" value={c.fret5} onChange={(e) => updateChord(i, 'fret5', e.target.value)} type="number" />
          <input className={styles.chordInput} placeholder="4ª" value={c.fret4} onChange={(e) => updateChord(i, 'fret4', e.target.value)} type="number" />
          <button className={styles.smallBtn} onClick={() => removeChordCol(i)}>✕</button>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button className={styles.smallBtn} onClick={addChordCol}>+ Acorde</button>
        <button className={styles.addBtn} onClick={handleSubmit}>Guardar Canción</button>
      </div>
    </div>
  );
}
