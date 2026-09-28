import { useEffect } from 'react';
import * as Icons from 'lucide-react';
import { SKILLS, CATEGORIES } from '../data/skills';

function SkillIcon({ name, className }) {
  const Icon = Icons[name] || Icons.Circle;
  return <Icon className={className} strokeWidth={1.5} />;
}

// Iconos por riesgo
const RISK_INFO = {
  low: { label: 'Riesgo bajo', color: '#7fb069', icon: 'ShieldCheck', desc: 'No requiere confirmacion.' },
  medium: { label: 'Riesgo medio', color: '#e0a458', icon: 'ShieldAlert', desc: 'Pide confirmacion al usuario.' },
  high: { label: 'Riesgo alto', color: '#c95454', icon: 'ShieldX', desc: 'Requiere confirmacion con advertencia.' },
};

export default function SkillModal({ skill, onClose }) {
  // Cerrar con ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const category = CATEGORIES[skill.category];
  const accent = category?.color || '#c9a668';
  const risk = RISK_INFO[skill.risk] || RISK_INFO.low;

  // Resolver combos (ids -> objetos de skills)
  const combosSkills = (skill.combos || [])
    .map((id) => SKILLS.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-void/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gold/20 bg-[#0d0b09] shadow-2xl"
        style={{ boxShadow: '0 20px 60px -10px rgba(201,166,104,0.15)' }}
      >
        {/* Header */}
        <div
          className="relative p-8 pb-6 border-b border-gold/10"
          style={{
            background: `linear-gradient(135deg, ${accent}0d 0%, transparent 60%)`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full border border-gold/20 text-text-dim hover:text-cream hover:border-gold/40 transition-all"
            aria-label="Cerrar"
          >
            <Icons.X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3 md:gap-4 md:gap-5">
            <div
              className="w-16 h-16 flex items-center justify-center rounded-xl border shrink-0"
              style={{
                color: accent,
                borderColor: accent + '40',
                backgroundColor: accent + '10',
              }}
            >
              <SkillIcon name={skill.icon} className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div
                className="font-mono text-[0.65rem] tracking-[0.25em] uppercase mb-2"
                style={{ color: accent }}
              >
                {category?.label || skill.category}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-cream leading-tight mb-2">
                {skill.name}
              </h3>
              <p className="text-text-dim text-base">
                {skill.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">

          {/* Descripcion */}
          <section>
            <h4 className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-3">
              Descripcion
            </h4>
            <p className="text-cream/90 leading-relaxed">
              {skill.description}
            </p>
          </section>

          {/* Ejemplos */}
          {skill.examples?.length > 0 && (
            <section>
              <h4 className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                <Icons.Terminal className="w-3 h-3" />
                Ejemplos de uso
              </h4>
              <div className="space-y-2">
                {skill.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg border border-gold/10 bg-void/40"
                  >
                    <span className="font-mono text-xs text-gold/60 mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-sm text-cream/90 leading-relaxed">
                      "{ex}"
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Combos */}
          {combosSkills.length > 0 && (
            <section>
              <h4 className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                <Icons.GitMerge className="w-3 h-3" />
                Combina bien con
              </h4>
              <div className="flex flex-wrap gap-2">
                {combosSkills.map((combo) => {
                  const comboAccent = CATEGORIES[combo.category]?.color || '#c9a668';
                  return (
                    <div
                      key={combo.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                      style={{
                        borderColor: comboAccent + '33',
                        backgroundColor: comboAccent + '0a',
                      }}
                    >
                      <SkillIcon
                        name={combo.icon}
                        className="w-3.5 h-3.5"
                        // eslint-disable-next-line
                      />
                      <span className="font-mono text-xs text-cream/90">
                        {combo.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Nivel de riesgo */}
          <section>
            <h4 className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
              <Icons.Shield className="w-3 h-3" />
              Nivel de riesgo
            </h4>
            <div
              className="flex items-start gap-3 p-4 rounded-lg border"
              style={{
                borderColor: risk.color + '33',
                backgroundColor: risk.color + '0a',
              }}
            >
              <div
                className="w-9 h-9 flex items-center justify-center rounded-lg border shrink-0"
                style={{ color: risk.color, borderColor: risk.color + '40' }}
              >
                {(() => {
                  const RiskIcon = Icons[risk.icon] || Icons.Shield;
                  return <RiskIcon className="w-4 h-4" />;
                })()}
              </div>
              <div>
                <div
                  className="font-mono text-sm mb-1"
                  style={{ color: risk.color }}
                >
                  {risk.label}
                </div>
                <div className="text-xs text-text-dim">
                  {risk.desc}
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gold/10 flex items-center justify-between">
          <span className="font-mono text-[0.65rem] text-text-dim tracking-wide">
            ID: <span className="text-gold/60">{skill.id}</span>
          </span>
          <button
            onClick={onClose}
            className="font-mono text-xs text-text-dim hover:text-cream transition-colors tracking-wide"
          >
            Cerrar [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
