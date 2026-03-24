import { useState, useRef, useCallback } from 'react';

export type TimeSignature = '4/4' | '3/4' | '6/8';

function beatsPerMeasure(ts: TimeSignature): number {
  switch (ts) {
    case '4/4': return 4;
    case '3/4': return 3;
    case '6/8': return 6;
  }
}

export const useMetronome = () => {
  const [bpm, setBpmState] = useState(100);
  const [timeSignature, setTimeSignatureState] = useState<TimeSignature>('4/4');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const bpmRef = useRef(bpm);
  const tsRef = useRef(timeSignature);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  const scheduleClick = useCallback((time: number, isAccent: boolean) => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isAccent ? 880 : 660, time);
    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.12);
  }, [getCtx]);

  const scheduler = useCallback(() => {
    const ctx = getCtx();
    const scheduleAheadTime = 0.1;
    while (nextNoteTimeRef.current < ctx.currentTime + scheduleAheadTime) {
      const isAccent = currentBeatRef.current === 0;
      scheduleClick(nextNoteTimeRef.current, isAccent);
      const beatIdx = currentBeatRef.current;
      setTimeout(() => setCurrentBeat(beatIdx), Math.max(0, (nextNoteTimeRef.current - ctx.currentTime) * 1000));
      const secondsPerBeat = 60.0 / bpmRef.current;
      nextNoteTimeRef.current += secondsPerBeat;
      currentBeatRef.current = (currentBeatRef.current + 1) % beatsPerMeasure(tsRef.current);
    }
  }, [getCtx, scheduleClick]);

  const start = useCallback(() => {
    const ctx = getCtx();
    currentBeatRef.current = 0;
    nextNoteTimeRef.current = ctx.currentTime;
    setIsPlaying(true);
    setCurrentBeat(0);
    const id = window.setInterval(scheduler, 25);
    timerRef.current = id;
    scheduler();
  }, [getCtx, scheduler]);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setCurrentBeat(0);
  }, []);

  const setBpm = useCallback((val: number) => {
    bpmRef.current = val;
    setBpmState(val);
  }, []);

  const setTimeSignature = useCallback((ts: TimeSignature) => {
    tsRef.current = ts;
    setTimeSignatureState(ts);
  }, []);

  return { bpm, timeSignature, isPlaying, currentBeat, start, stop, setBpm, setTimeSignature };
};
