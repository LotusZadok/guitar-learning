import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import SearchOverlay from './components/search/SearchOverlay';
import StringsSection from './components/sections/Strings/StringsSection';
import RhythmSection from './components/sections/Rhythm/RhythmSection';
import ChromaticCircleSection from './components/sections/ChromaticCircle/ChromaticCircleSection';
import CagedSection from './components/sections/Caged/CagedSection';
import IntervalsSection from './components/sections/Intervals/IntervalsSection';
import TriadsSection from './components/sections/Triads/TriadsSection';
import FretboardSection from './components/sections/Fretboard/FretboardSection';
import SongsSection from './components/sections/Songs/SongsSection';
import MetronomeSection from './components/sections/Metronome/MetronomeSection';
import PocTonalidadesApp from './poc/PocTonalidadesApp';

export default function App() {
  return (
    <Routes>
      <Route path="/poc" element={<PocTonalidadesApp />} />
      <Route
        path="*"
        element={
          <>
            <SearchOverlay />
            <AppShell>
              <Routes>
                <Route path="/cuerdas" element={<StringsSection />} />
                <Route path="/ritmo" element={<RhythmSection />} />
                <Route path="/cromatico" element={<ChromaticCircleSection />} />
                <Route path="/caged" element={<CagedSection />} />
                <Route path="/intervalos" element={<IntervalsSection />} />
                <Route path="/triadas" element={<TriadsSection />} />
                <Route path="/mastil" element={<FretboardSection />} />
                <Route path="/canciones" element={<SongsSection />} />
                <Route path="/metronomo" element={<MetronomeSection />} />
                <Route path="*" element={<Navigate to="/cuerdas" replace />} />
              </Routes>
            </AppShell>
          </>
        }
      />
    </Routes>
  );
}
