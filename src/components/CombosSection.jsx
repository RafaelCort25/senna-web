import * as Icons from 'lucide-react';
import { FEATURED_COMBOS, SKILLS, CATEGORIES } from '../data/skills';

function SkillIcon({ name, className }) {
  const Icon = Icons[name] || Icons.Circle;
  return <Icon className={className} strokeWidth={1.5} />;
}

function ComboCard({ combo }) {
  // Resolver los skills del combo
  const comboSkills = combo.skills
    .map((id) => SKILLS.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div
      className="group relative p-6 rounded-2xl border border-gold/10 bg-void/40 backdrop-blur-sm hover:border-gold/30 transition-all overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${combo.accent}0a 0%, transparent 60%), rgba(20,17,13,0.65)`,
      }}
    >
      {/* Glow de fondo */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
        style={{ backgroundColor: combo.accent }}
      />

      <div className="relative">
        {/* Iconos de skills */}
        <div className="flex items-center gap-2 mb-5">
          {comboSkills.map((skill, i) => {
            const skillAccent = CATEGORIES[skill.category]?.color || '#c9a668';
            return (
              <div key={skill.id} className="flex items-center gap-2">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg border"
                  style={{
                    color: skillAccent,
                    borderColor: skillAccent + '33',
                    backgroundColor: skillAccent + '0d',
                  }}
                  title={skill.name}
                >
                  <SkillIcon name={skill.icon} className="w-5 h-5" />
                </div>
                {i < comboSkills.length - 1 && (
                  <Icons.Plus className="w-3 h-3 text-gold/40" />
                )}
              </div>
            );
          })}
        </div>

        {/* Titulo */}
        <h3 className="font-display text-2xl text-cream leading-tight mb-1">
          {combo.title}
        </h3>
        <p
          className="font-mono text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: combo.accent }}
        >
          {combo.subtitle}
        </p>

        {/* Descripcion */}
        <p className="text-text-dim text-sm leading-relaxed mb-5">
          {combo.description}
        </p>

        {/* Ejemplo */}
        <div className="pt-5 border-t border-gold/10">
          <div className="flex items-start gap-2">
            <Icons.MessageSquareQuote className="w-3.5 h-3.5 text-gold/50 mt-0.5 shrink-0" />
            <span className="font-mono text-xs text-cream/80 leading-relaxed italic">
              "{combo.example}"
            </span>
          </div>
        </div>

        {/* Nombres de las skills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {comboSkills.map((skill) => (
            <span
              key={skill.id}
              className="font-mono text-[0.6rem] text-text-dim tracking-wide px-2 py-0.5 rounded border border-gold/10"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CombosSection() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-4">
          Combos que potencian Senna
        </p>
        <h2 className="font-display text-6xl md:text-7xl leading-tight mb-4">
          El poder está en
          <br />
          <span className="italic text-gold-bright">combinar.</span>
        </h2>
        <p className="text-text-dim text-lg max-w-2xl mx-auto">
          Las skills por sí solas son útiles. Juntas, son imparables. Estos son
          algunos flujos que puedes pedirle a Senna en lenguaje natural.
        </p>
      </div>

      {/* Grid de combos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURED_COMBOS.map((combo) => (
          <ComboCard key={combo.id} combo={combo} />
        ))}
      </div>

      {/* Hint final */}
      <div className="mt-12 text-center">
        <p className="font-mono text-xs text-text-dim tracking-wide">
          Y así con las {SKILLS.length} skills. Pídele lo que necesites en lenguaje natural.
        </p>
      </div>
    </div>
  );
}
