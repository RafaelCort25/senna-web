const AGENTS = [
  {
    id: 'supervisor',
    name: 'Supervisor',
    desc: 'Planifica y orquesta',
    color: '#e8c992',
    model: 'llama3.2:3b',
  },
  {
    id: 'dev',
    name: 'DEV',
    desc: 'Programa y refactoriza',
    color: '#9ab8c9',
    model: 'qwen2.5-coder:7b',
  },
  {
    id: 'research',
    name: 'RESEARCH',
    desc: 'Investiga y explica',
    color: '#b8c99a',
    model: 'llama3.2:3b',
  },
  {
    id: 'execute',
    name: 'EXECUTE',
    desc: 'Controla tu PC',
    color: '#c99a9a',
    model: 'llama3.2:3b',
  },
  {
    id: 'chat',
    name: 'CHAT',
    desc: 'Conversa contigo',
    color: '#c9b89a',
    model: 'llama3.2:3b',
  },
];

export default function AgentDiagram() {
  return (
    <div className="w-full max-w-[1100px] mx-auto px-8">
      <div className="text-center mb-16">
        <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-4">
          Multiagente profesional
        </p>
        <h2 className="font-display text-6xl md:text-7xl leading-tight mb-4">
          4 agentes.<br />
          <span className="italic text-gold-bright">Una sola mente.</span>
        </h2>
        <p className="text-text-dim text-lg max-w-2xl mx-auto">
          Cada tarea va al agente especializado. El supervisor planifica, los
          agentes ejecutan, tú solo pides.
        </p>
      </div>

      {/* Supervisor arriba */}
      <div className="flex justify-center mb-12">
        <div
          className="px-8 py-6 rounded-2xl border text-center"
          style={{
            borderColor: `${AGENTS[0].color}40`,
            background: `${AGENTS[0].color}08`,
            minWidth: '280px',
          }}
        >
          <div
            className="font-mono text-[0.65rem] tracking-widest uppercase mb-2"
            style={{ color: AGENTS[0].color }}
          >
            {AGENTS[0].name}
          </div>
          <div className="font-display text-2xl text-cream mb-1">
            {AGENTS[0].desc}
          </div>
          <div className="font-mono text-xs text-text-dim">
            {AGENTS[0].model}
          </div>
        </div>
      </div>

      {/* Línea conectora */}
      <div className="flex justify-center mb-12">
        <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-gold/10" />
      </div>

      {/* 4 agentes en grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {AGENTS.slice(1).map((agent) => (
          <div
            key={agent.id}
            className="p-6 rounded-xl border text-center hover:scale-105 transition-transform duration-300"
            style={{
              borderColor: `${agent.color}40`,
              background: `${agent.color}06`,
            }}
          >
            <div
              className="font-mono text-[0.65rem] tracking-widest uppercase mb-3"
              style={{ color: agent.color }}
            >
              {agent.name}
            </div>
            <div className="font-display text-lg text-cream mb-3">
              {agent.desc}
            </div>
            <div className="font-mono text-[0.65rem] text-text-dim">
              {agent.model}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
