export default function DarkSide() {
  return (
    <div className="w-full max-w-[1100px] mx-auto px-8">
      <div className="text-center">

        {/* Etiqueta */}
        <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8"
           style={{ color: '#d08a8a' }}>
          Modo alternativo
        </p>

        {/* Titulo grande */}
        <h2
          data-reveal
          className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] mb-6"
          style={{ color: '#f0e0e0' }}
        >
          El lado
        </h2>
        <h2
          data-reveal
          className="font-display italic text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] mb-12"
          style={{
            color: '#c97a7a',
            textShadow: '0 0 40px rgba(180,80,80,0.4)',
          }}
        >
          oscuro.
        </h2>

        {/* Descripcion */}
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-16"
          style={{ color: 'rgba(239,233,222,0.55)' }}
        >
          Cuando necesitas respuestas directas. Sin sermones.
          Sin "<em>no puedo ayudarte con eso</em>".
          Sin moralismo innecesario.
        </p>

        {/* Cards de features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 text-left max-w-4xl mx-auto">

          <div
            className="p-6 rounded-xl border"
            style={{
              borderColor: 'rgba(201,122,122,0.2)',
              background: 'rgba(20,10,10,0.4)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="text-2xl mb-3" style={{ color: '#c97a7a' }}>
              &#9670;
            </div>
            <div className="font-display text-lg mb-2" style={{ color: '#f0e0e0' }}>
              Sin filtros
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(239,233,222,0.5)' }}>
              El modelo responde lo que preguntas. Sin rehusarse.
            </p>
          </div>

          <div
            className="p-6 rounded-xl border"
            style={{
              borderColor: 'rgba(201,122,122,0.2)',
              background: 'rgba(20,10,10,0.4)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="text-2xl mb-3" style={{ color: '#c97a7a' }}>
              &#10038;
            </div>
            <div className="font-display text-lg mb-2" style={{ color: '#f0e0e0' }}>
              Sin juicios
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(239,233,222,0.5)' }}>
              Discusiones filosóficas, escritura sin restricciones, temas técnicos.
            </p>
          </div>

          <div
            className="p-6 rounded-xl border"
            style={{
              borderColor: 'rgba(201,122,122,0.2)',
              background: 'rgba(20,10,10,0.4)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="text-2xl mb-3" style={{ color: '#c97a7a' }}>
              &#9672;
            </div>
            <div className="font-display text-lg mb-2" style={{ color: '#f0e0e0' }}>
              Tu control
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(239,233,222,0.5)' }}>
              Tú decides cuándo activarlo. Senna sigue siendo tu asistente.
            </p>
          </div>

        </div>

        {/* Modelo destacado */}
        <div
          className="inline-flex items-center gap-4 px-6 py-3 rounded-full mb-12"
          style={{
            border: '1px solid rgba(201,122,122,0.3)',
            background: 'rgba(20,10,10,0.5)',
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#c97a7a' }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#c97a7a' }}>
            Dolphin Mistral 7B
          </span>
          <span className="font-mono text-[0.65rem] tracking-wider" style={{ color: 'rgba(239,233,222,0.3)' }}>
            sin censura · 4.1 GB
          </span>
        </div>

        {/* Disclaimer suave */}
        <p
          className="font-mono text-[0.7rem] tracking-wide max-w-lg mx-auto"
          style={{ color: 'rgba(239,233,222,0.25)' }}
        >
          &#8226; Uso responsable. El usuario es el único responsable del contenido solicitado.
        </p>

      </div>
    </div>
  );
}
