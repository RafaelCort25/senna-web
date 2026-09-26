import { useEffect } from 'react';
import { useOrbStore } from '../store/orbStore';

export function useOrbMouseReactive() {
  const setMouseOffset = useOrbStore((s) => s.setMouseOffset);

  useEffect(() => {
    if (!setMouseOffset) return;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseOffset(x, y);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [setMouseOffset]);
}
