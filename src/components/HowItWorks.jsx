import * as Icons from 'lucide-react';

const STEPS = [
  {
    n: '01',
    icon: 'MessageSquare',
    title: 'Tú pides',
    desc: 'Escribes o hablas en lenguaje natural. Sin comandos, sin sintaxis rara. "Apunta reunión el lunes" o "Analiza este plano DWG".',
    color: '#c9a668',
  },
  {
    n: '02',
    icon: 'GitBranch',
    title: 'Supervisor planifica',
    desc: 'Un agente supervisor interpreta tu petición, decide qué skills activar y en qué orden. Si hace falta combinar varias, las encadena.',
    color: '#9ab8c9',
  },
  {
    n: '03',
    icon: 'Zap',
    title: 'Agente ejecuta',
    desc: 'Las skills se ejecutan localmente en tu PC. Control del sistema, generación de imágenes, CAD, transcripción, ofimática... todo sin salir de casa.',
    color: '#b8c99a',
  },
  {
    n: '04',
    icon: 'Sparkles',
    title: 'Respuesta',
    desc: 'Recibes el resultado en texto, imagen, audio o archivo. Y si quieres, Senna te lo responde por voz con su propio tono.',
    color: '#c99a9a',
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-8">
      <div className="text-center mb-16">
        <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-4">
          Cómo funciona
        </p>
        <h2 className="font-display text-6xl md:text-7xl leading-tight mb-4">
          De una frase
          <br />
          <span className="italic text-gold-bright">a la acción.</span>
        </h2>
        <p className="text-text-dim text-lg max-w-2xl mx-auto">
          Detrás de Senna hay un sistema multiagente que planifica, ejecuta y verifica.
          Todo local, todo tuyo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((step, i) => {
          const Icon = Icons[step.icon] || Icons.Circle;
          return (
            <div key={step.n} className="relative">
              <div
                className="group relative h-full p-6 rounded-2xl border border-gold/10 bg-void/40 backdrop-blur-sm hover:border-gold/30 transition-all overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${step.color}0a 0%, transparent 60%), rgba(20,17,13,0.65)`,
                }}
              >
                <div
                  className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none"
                  style={{ backgroundColor: step.color }}
                />

                <div className="relative">
                  <div
                    className="font-mono text-xs tracking-[0.3em] mb-4"
                    style={{ color: step.color }}
                  >
                    {step.n}
                  </div>

                  <div
                    className="w-11 h-11 mb-5 flex items-center justify-center rounded-lg border"
                    style={{
                      color: step.color,
                      borderColor: step.color + '40',
                      backgroundColor: step.color + '0d',
                    }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>

                  <h3 className="font-display text-2xl text-cream mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-text-dim text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <Icons.ChevronRight className="w-4 h-4 text-gold/30" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-14 text-center">
        <p className="font-mono text-xs text-text-dim tracking-wide">
          Sin la nube. Sin telemetría. Sin suscripciones. Tu PC, tus datos, tus reglas.
        </p>
      </div>
    </section>
  );
}
