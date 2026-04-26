import IntroSection from './sections/IntroSection';
import HerramientaSection from './sections/HerramientaSection';
import ProcesoSostenidosSection from './sections/ProcesoSostenidosSection';
import ProcesoBemolesSection from './sections/ProcesoBemolesSection';
import TablaMaestraSection from './sections/TablaMaestraSection';
import ModoClaseSection from './sections/ModoClaseSection';
import styles from './PocTonalidadesApp.module.css';

export default function PocTonalidadesApp() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tonalidades y Armaduras</h1>
        <p className={styles.subtitle}>Un recorrido por el método de Josué Barquero</p>
      </header>

      <main className={styles.main}>
        <IntroSection />
        <HerramientaSection />
        <ProcesoSostenidosSection />
        <ProcesoBemolesSection />
        <TablaMaestraSection />
        <ModoClaseSection />
      </main>

      <footer className={styles.footer}>
        <span>Apuntes de Guitarra</span>
      </footer>
    </div>
  );
}
