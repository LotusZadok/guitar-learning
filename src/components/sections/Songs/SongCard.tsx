import type { Song } from '../../../types/songs';
import { useSongStore } from '../../../stores/useSongStore';
import styles from './Songs.module.css';

interface Props {
  song: Song;
}

export default function SongCard({ song }: Props) {
  const removeSong = useSongStore((s) => s.removeSong);
  const strings = [6, 5, 4];

  return (
    <div className={styles.songCard}>
      <h2>{song.title} — {song.artist}</h2>
      <div className={styles.songTitle}>
        {song.chords.map((c) => c.name).join(' · ')}
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cuerda</th>
              {song.chords.map((c, i) => <th key={i}>{c.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {strings.map((str) => (
              <tr key={str}>
                <td>{str}ª</td>
                {song.chords.map((c, ci) => {
                  const pos = c.positions.find((p) => p.string === str);
                  return (
                    <td key={ci} className="highlight" style={{ color: 'var(--amber)', fontWeight: 600 }}>
                      {pos ? pos.fret : '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!song.isBuiltIn && (
        <button className={styles.removeBtn} onClick={() => removeSong(song.id)}>
          Eliminar
        </button>
      )}
    </div>
  );
}
