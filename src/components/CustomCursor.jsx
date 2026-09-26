import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef();
  const ringRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    const animate = () => {
      // Smooth follow del anillo
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px, 0)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    const rafId = requestAnimationFrame(animate);

    // Efecto de hover: el anillo crece sobre links y botones
    const handleEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '60px';
        ringRef.current.style.height = '60px';
        ringRef.current.style.borderColor = 'rgba(232, 201, 146, 0.9)';
      }
    };
    const handleLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '40px';
        ringRef.current.style.height = '40px';
        ringRef.current.style.borderColor = 'rgba(201, 166, 104, 0.4)';
      }
    };

    const attachHover = () => {
      document.querySelectorAll('a, button, .chip').forEach((el) => {
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    };
    const timer = setTimeout(attachHover, 1000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Dot pequeño */}
      <div
        ref={dotRef}
        className="custom-cursor-dot fixed top-0 left-0 w-2 h-2 rounded-full bg-gold-bright pointer-events-none z-[9999] mix-blend-screen"
        style={{
          boxShadow: '0 0 10px rgba(232,201,146,0.9), 0 0 20px rgba(201,166,104,0.5)',
          transition: 'transform 0.05s linear',
        }}
      />
      {/* Anillo exterior */}
      <div
        ref={ringRef}
        className="custom-cursor-ring fixed top-0 left-0 w-10 h-10 rounded-full border border-gold/40 pointer-events-none z-[9998] mix-blend-screen"
        style={{
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
        }}
      />

      {/* Ocultar cursor nativo en desktop */}
      <style>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
