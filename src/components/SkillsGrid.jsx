import { useRef, useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { SKILLS, CATEGORIES } from '../data/skills';
import SkillModal from './SkillModal';

// Icono de Lucide por nombre (con fallback)
function SkillIcon({ name, className }) {
  const Icon = Icons[name] || Icons.Circle;
  return <Icon className={className} strokeWidth={1.5} />;
}

function SkillCard({ skill, onClick }) {
  const cardRef = useRef();
  const accent = CATEGORIES[skill.category]?.color || '#c9a668';

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
  };

  return (
    <button
      ref={cardRef}
      onClick={() => onClick(skill)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group text-left p-4 rounded-lg border border-gold/10 bg-void/40 backdrop-blur-sm hover:border-gold/40 hover:bg-gold/5 cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, border-color 0.3s, background-color 0.3s',
      }}
    >
      <div
        className="w-9 h-9 mb-3 flex items-center justify-center rounded-md border"
        style={{
          color: accent,
          borderColor: accent + '33',
          backgroundColor: accent + '0d',
        }}
      >
        <SkillIcon name={skill.icon} className="w-4 h-4" />
      </div>
      <div className="font-display text-base text-cream mb-1">
        {skill.name}
      </div>
      <div className="font-mono text-[0.65rem] text-text-dim tracking-wide leading-relaxed">
        {skill.tagline}
      </div>
    </button>
  );
}

export default function SkillsGrid() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filteredSkills = useMemo(() => {
    let list = SKILLS;
    if (activeCategory !== 'all') {
      list = list.filter((s) => s.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, query]);

  // Conteo por categoria (para mostrar en los botones)
  const categoryCounts = useMemo(() => {
    const counts = { all: SKILLS.length };
    Object.keys(CATEGORIES).forEach((cat) => {
      counts[cat] = SKILLS.filter((s) => s.category === cat).length;
    });
    return counts;
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-8">
      <div className="text-center mb-12">
        <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-4">
          {SKILLS.length} skills nativas
        </p>
        <h2 data-reveal className="font-display text-6xl md:text-7xl leading-tight mb-4">
          Todo integrado.
        </h2>
        <p className="text-text-dim text-lg max-w-2xl mx-auto">
          Sin plugins. Sin APIs externas. Sin permisos. Solo instala y funciona.
        </p>
      </div>

      {/* Barra de búsqueda */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="relative">
          <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar skill..."
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gold/15 bg-void/60 backdrop-blur-sm text-cream placeholder:text-text-dim font-mono text-sm focus:outline-none focus:border-gold/40 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-cream transition-colors"
            >
              <Icons.X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filtros de categoria */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full font-mono text-xs tracking-wide border transition-all ${
            activeCategory === 'all'
              ? 'border-gold bg-gold/10 text-gold-bright'
              : 'border-gold/15 text-text-dim hover:border-gold/30 hover:text-cream'
          }`}
        >
          Todas ({categoryCounts.all})
        </button>
        {Object.entries(CATEGORIES).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 rounded-full font-mono text-xs tracking-wide border transition-all ${
              activeCategory === key
                ? 'border-gold bg-gold/10 text-gold-bright'
                : 'border-gold/15 text-text-dim hover:border-gold/30 hover:text-cream'
            }`}
          >
            {label} ({categoryCounts[key] || 0})
          </button>
        ))}
      </div>

      {/* Grid de skills */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} onClick={setSelectedSkill} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-text-dim">
          <Icons.SearchX className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p className="font-mono text-sm">No encontre skills con "{query}"</p>
        </div>
      )}

      {/* Modal */}
      {selectedSkill && (
        <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
      )}
    </div>
  );
}
