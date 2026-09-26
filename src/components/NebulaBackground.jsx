export default function NebulaBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* Base negra */}
      <div className="absolute inset-0 bg-void" />

      {/* Nebulosa 1 - naranja/dorada (top left) */}
      <div
        className="absolute w-[80vw] h-[80vw] -top-[20vw] -left-[20vw] rounded-full opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(201,166,104,0.35) 0%, rgba(201,166,104,0.08) 30%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'float1 25s ease-in-out infinite',
        }}
      />

      {/* Nebulosa 2 - azul (bottom right) */}
      <div
        className="absolute w-[70vw] h-[70vw] -bottom-[20vw] -right-[15vw] rounded-full opacity-35 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(120,150,200,0.30) 0%, rgba(120,150,200,0.06) 35%, transparent 65%)',
          filter: 'blur(80px)',
          animation: 'float2 30s ease-in-out infinite',
        }}
      />

      {/* Nebulosa 3 - púrpura sutil (center) */}
      <div
        className="absolute w-[60vw] h-[60vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(160,120,180,0.22) 0%, transparent 60%)',
          filter: 'blur(100px)',
          animation: 'float3 35s ease-in-out infinite',
        }}
      />

      {/* Vignette para dar profundidad */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(10,9,8,0.6) 70%, rgba(10,9,8,0.95) 100%)',
        }}
      />

      {/* Estilos de animación */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5vw, 3vw) scale(1.1); }
          66% { transform: translate(-3vw, 5vw) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-6vw, -4vw) scale(1.15); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.25; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.15; }
        }
      `}</style>
    </div>
  );
}
