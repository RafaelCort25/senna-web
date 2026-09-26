import { useEffect, useState } from 'react';
import { useOrbStore } from '../store/orbStore';

const SECTIONS = ['Hero', 'Intro', 'Skills', 'Agentes', 'Oscuro', 'Descarga'];

export default function ScrollUI() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, scrollTop / docHeight));
      setProgress(p);

      // Detectar sección activa
      const section = Math.floor(p * SECTIONS.length);
      setActiveSection(Math.min(section, SECTIONS.length - 1));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Barra de progreso arriba */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-gold/40 via-gold-bright to-gold/40 transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Indicador de sección derecha */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 items-end">
        {SECTIONS.map((sec, i) => (
          <div key={sec} className="flex items-center gap-3 group">
            <span
              className={`font-mono text-[0.65rem] tracking-widest uppercase transition-all duration-300 ${
                activeSection === i
                  ? 'text-gold-bright opacity-100'
                  : 'text-text-dim opacity-40 group-hover:opacity-80'
              }`}
            >
              {sec}
            </span>
            <div
              className={`transition-all duration-300 rounded-full ${
                activeSection === i
                  ? 'w-8 h-[2px] bg-gold-bright'
                  : 'w-2 h-[2px] bg-gold/30 group-hover:bg-gold/60'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Número de sección abajo izquierda */}
      <div className="fixed bottom-8 left-8 z-50 hidden md:block">
        <div className="font-mono text-xs text-text-dim tracking-widest">
          <span className="text-gold-bright">0{activeSection + 1}</span>
          <span className="mx-2 opacity-30">/</span>
          <span>0{SECTIONS.length}</span>
        </div>
      </div>
    </>
  );
}
