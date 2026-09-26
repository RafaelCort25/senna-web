import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let mounted = true;
    let p = 0;

    const interval = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          if (mounted) setHidden(true);
        }, 400);
      }
      setProgress(Math.min(100, p));
    }, 200);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-void flex flex-col items-center justify-center transition-opacity duration-700 ${
        hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Glow de fondo */}
      <div
        className="absolute w-[60vw] h-[60vw] rounded-full opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(201,166,104,0.4) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Logo */}
      <div className="relative z-10 text-center">
        <div className="font-display text-[clamp(3rem,8vw,6rem)] leading-none text-cream mb-2">
          Senna
        </div>
        <div className="font-display italic text-gold text-lg mb-12">
          asistente personal
        </div>

        {/* Barra de progreso */}
        <div className="w-64 h-[2px] bg-gold/20 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-gold to-gold-bright transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="font-mono text-[0.7rem] text-text-dim tracking-widest mt-4">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
