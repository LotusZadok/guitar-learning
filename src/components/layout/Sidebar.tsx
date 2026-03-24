import { useNavigate, useLocation } from 'react-router-dom';
import { useUIStore } from '../../stores/useUIStore';
import ThemeToggle from './ThemeToggle';
import styles from './Sidebar.module.css';

const SECTIONS = [
  { id: 'cuerdas', path: '/cuerdas', label: '01 — Cuerdas' },
  { id: 'ritmo', path: '/ritmo', label: '02 — Ritmo' },
  { id: 'cromatico', path: '/cromatico', label: '03 — Notas' },
  { id: 'caged', path: '/caged', label: '04 — Sistema' },
  { id: 'intervalos', path: '/intervalos', label: '05 — Intervalos' },
  { id: 'triadas', path: '/triadas', label: '06 — Acordes' },
  { id: 'mastil', path: '/mastil', label: '07 — Mástil' },
  { id: 'canciones', path: '/canciones', label: '08 — Canciones' },
  { id: 'metronomo', path: '/metronomo', label: '09 — Metrónomo' },
] as const;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  const handleNav = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <>
      <button
        className={styles.hamburger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      <nav className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logo}>
          Apuntes de <span>Guitarra</span>
        </div>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={location.pathname === s.path ? styles.linkActive : styles.link}
            onClick={() => handleNav(s.path)}
          >
            {s.label}
          </button>
        ))}
        <div className={styles.themeArea}>
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}

export { SECTIONS };
