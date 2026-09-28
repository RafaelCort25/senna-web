import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 38, suffix: '', label: 'Skills nativas' },
  { value: 4, suffix: '', label: 'Agentes IA' },
  { value: 0, suffix: '', label: 'Suscripciones' },
  { value: 100, suffix: '%', label: 'Local' },
];

function StatItem({ value, suffix, label, delay }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const obj = { n: 0 };

    const tween = gsap.to(obj, {
      n: value,
      duration: 1.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => setCurrent(Math.floor(obj.n)),
    });

    return () => {
      tween.kill();
    };
  }, [value, delay]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl lg:text-7xl text-cream leading-none mb-3">
        {current}
        <span className="text-gold-bright">{suffix}</span>
      </div>
      <div className="font-mono text-xs tracking-[0.2em] uppercase text-text-dim">
        {label}
      </div>
    </div>
  );
}

export default function StatsBlock() {
  return (
    <div className="relative z-20 py-24 px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

