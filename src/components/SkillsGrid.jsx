import { useRef } from 'react';

function SkillCard({ skill }) {
  const cardRef = useRef();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    cardRef.current.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(6px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group p-4 rounded-lg border border-gold/10 bg-void/40 backdrop-blur-sm hover:border-gold/40 hover:bg-gold/5"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, border-color 0.3s, background-color 0.3s',
      }}
    >
      <div className="text-2xl text-gold mb-2 group-hover:text-gold-bright transition-colors">
        {skill.icon}
      </div>
      <div className="font-display text-base text-cream mb-1">
        {skill.name}
      </div>
      <div className="font-mono text-[0.65rem] text-text-dim tracking-wide">
        {skill.desc}
      </div>
    </div>
  );
}

const SKILLS = [
  { icon: '⌘', name: 'Sistema', desc: 'Control total de tu PC' },
  { icon: '◈', name: 'Archivos', desc: 'Búsqueda y gestión' },
  { icon: '⬢', name: 'Dev', desc: 'Código y refactor' },
  { icon: '◐', name: 'CAD/BIM', desc: 'DWG → IFC' },
  { icon: '✦', name: 'Gmail', desc: 'Correo inteligente' },
  { icon: '◉', name: 'Canva', desc: 'Diseño gráfico' },
  { icon: '⋈', name: 'n8n', desc: '12k+ workflows' },
  { icon: '◧', name: 'Vision', desc: 'Análisis de pantalla' },
  { icon: '❋', name: 'Telegram', desc: 'Notificaciones' },
  { icon: '⬟', name: 'Blender', desc: 'Render 3D' },
  { icon: '◈', name: 'FreeCAD', desc: 'Modelado técnico' },
  { icon: '⬢', name: 'Docs', desc: 'RAG local' },
  { icon: '⌬', name: 'Terminal', desc: 'Comandos seguros' },
  { icon: '◬', name: 'Git', desc: 'Control de versiones' },
  { icon: '⊞', name: 'Office', desc: 'Word · Excel · PPT' },
  { icon: '⊕', name: 'Spotify', desc: 'Control de música' },
  { icon: '◒', name: 'Notas', desc: 'Productividad' },
  { icon: '◓', name: 'Programador', desc: 'Tareas programadas' },
  { icon: '⌖', name: 'Clima', desc: 'OpenWeather' },
  { icon: '⌦', name: 'Traducción', desc: '9 idiomas' },
  { icon: '⚠', name: 'Alarmas', desc: 'Recordatorios' },
  { icon: '⌗', name: 'Macro', desc: 'Grabar secuencias' },
  { icon: '⧉', name: 'Editar', desc: 'Modificar archivos' },
  { icon: '◆', name: 'PDF', desc: 'Conversión y lectura' },
  { icon: '◈', name: 'Imagen', desc: 'Generación visual' },
  { icon: '⬡', name: 'Educación', desc: 'PSeInt · diagramas' },
  { icon: '◕', name: 'Entretenimiento', desc: 'Multimedia' },
  { icon: '⋄', name: 'Maps', desc: 'Edificios reales' },
  { icon: '◔', name: 'Docs RAG', desc: 'Pregunta a tus PDFs' },
  { icon: '◑', name: 'Navegador', desc: 'Búsquedas web' },
  { icon: '⬤', name: 'Escritorio', desc: 'Apps y volumen' },
];

export default function SkillsGrid() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-8">
      <div className="text-center mb-16">
        <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-4">
          31 skills nativas
        </p>
        <h2 data-reveal className="font-display text-6xl md:text-7xl leading-tight mb-4">
          Todo integrado.
        </h2>
        <p className="text-text-dim text-lg max-w-2xl mx-auto">
          Sin plugins. Sin APIs externas. Sin permisos. Solo instala y funciona.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {SKILLS.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}
