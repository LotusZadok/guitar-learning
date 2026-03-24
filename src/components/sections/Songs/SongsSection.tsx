import SectionLabel from '../../shared/SectionLabel';
import SongCard from './SongCard';
import AddSongForm from './AddSongForm';
import { useSongStore } from '../../../stores/useSongStore';
import styles from './Songs.module.css';

export default function SongsSection() {
  const songs = useSongStore((s) => s.songs);

  return (
    <div className={styles.section}>
      <SectionLabel text="08 — Canciones" />
      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
      <AddSongForm />
    </div>
  );
}
