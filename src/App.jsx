import { useRef, useEffect } from 'react';
import Scene from './scenes/Scene';
import Header from './components/Header';
import SkillsGrid from './components/SkillsGrid';
import AgentDiagram from './components/AgentDiagram';
import Footer from './components/Footer';
import NebulaBackground from './components/NebulaBackground';
import CustomCursor from './components/CustomCursor';
import ScrollUI from './components/ScrollUI';
import LoadingScreen from './components/LoadingScreen';
import Marquee from './components/Marquee';
import StatsBlock from './components/StatsBlock';
import DarkSide from './components/DarkSide';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useTextReveal } from './hooks/useTextReveal';
import { useOrbMouseReactive } from './hooks/useOrbMouseReactive';
import { useOrbStore } from './store/orbStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useSmoothScroll();
  useOrbMouseReactive();

  const setOrb = useOrbStore((s) => s.setOrb);
  const mainRef = useRef();
  const revealRef = useTextReveal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = mainRef.current.querySelectorAll('[data-orb-state]');

      sections.forEach((section) => {
        const state = {
          scale: parseFloat(section.dataset.scale || '1'),
          x: parseFloat(section.dataset.x || '0'),
          y: parseFloat(section.dataset.y || '0'),
          energy: parseFloat(section.dataset.energy || '0.35'),
          color: section.dataset.color || '#c9a668',
          wireOpacity: parseFloat(section.dataset.wire || '0.08'),
          glowOpacity: parseFloat(section.dataset.glow || '0.05'),
          shape: parseFloat(section.dataset.shape || '0.5'),
          noiseScale: parseFloat(section.dataset.noise || '1.6'),
        };

        const applyState = () => {
          setOrb({
            scale: state.scale,
            position: [state.x, state.y, 0],
            energy: state.energy,
            color: state.color,
            wireOpacity: state.wireOpacity,
            glowOpacity: state.glowOpacity,
            shape: state.shape,
            noiseScale: state.noiseScale,
          });
        };

        ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: applyState,
          onEnterBack: applyState,
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, [setOrb]);

  return (
    <div className="relative min-h-screen bg-void text-cream overflow-x-hidden">

      <LoadingScreen />
      <CustomCursor />
      <ScrollUI />
      <Header />

      <NebulaBackground />

      <div className="fixed inset-0 z-10 pointer-events-none">
        <Scene />
      </div>

      <main ref={(el) => { mainRef.current = el; if (revealRef) revealRef.current = el; }} className="relative z-20">

        <section
          data-orb-state
          data-scale="1"
          data-x="0"
          data-y="0"
          data-energy="0.35"
          data-color="#c9a668"
          data-wire="0.08"
          data-glow="0.05"
          data-shape="0.3"
          data-noise="1.6"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="text-center px-6">
            <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.9] text-cream">
              Senna
            </h1>
            <p className="font-display italic text-[clamp(1rem,2vw,1.4rem)] text-gold mt-2 mb-12">
              asistente personal
            </p>
            <a
              href="#download"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gold/40 text-gold-bright font-mono text-xs tracking-widest uppercase hover:bg-gold/10 transition-all duration-300"
            >
              Probar ahora
              <span className="text-[0.65rem] opacity-60">↓</span>
            </a>
          </div>
        </section>

        <section
          data-orb-state
          data-scale="0.6"
          data-x="3"
          data-y="0"
          data-energy="0.55"
          data-color="#e8c992"
          data-wire="0.15"
          data-glow="0.1"
          data-shape="0.55"
          data-noise="1.8"
          className="min-h-screen flex items-center"
        >
          <div className="max-w-[600px] px-12 ml-[5vw]">
            <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-6">
              Bienvenido a la nueva era
            </p>
            <h2 data-reveal className="font-display text-5xl md:text-6xl leading-tight mb-8">
              No es una app. <br />
              <span className="italic text-gold-bright">Es Senna.</span>
            </h2>
            <p className="text-lg text-text-dim leading-relaxed">
              Un asistente personal que vive en tu computadora. Sin suscripciones,
              sin nube, sin compartir tus datos con nadie. Solo tú y tu IA.
            </p>
          </div>
        </section>

        <Marquee />

        <section
          id="features"
          data-orb-state
          data-scale="2.5"
          data-x="0"
          data-y="0"
          data-energy="0.25"
          data-color="#c9a668"
          data-wire="0.04"
          data-glow="0.03"
          data-shape="1.0"
          data-noise="2.8"
          className="min-h-screen flex items-center py-32"
        >
          <SkillsGrid />
        </section>

        <StatsBlock />

        <section
          id="agents"
          data-orb-state
          data-scale="0.5"
          data-x="-3"
          data-y="0"
          data-energy="0.7"
          data-color="#9ab8c9"
          data-wire="0.2"
          data-glow="0.12"
          data-shape="0.15"
          data-noise="1.4"
          className="min-h-screen flex items-center py-32"
        >
          <AgentDiagram />
        </section>

        <section
          data-orb-state
          data-scale="0.7"
          data-x="0"
          data-y="0"
          data-energy="0.85"
          data-color="#c97a7a"
          data-wire="0.25"
          data-glow="0.2"
          data-shape="0.8"
          data-noise="2.2"
          className="min-h-screen flex items-center py-32"
        >
          <DarkSide />
        </section>

        <section
          id="download"
          data-orb-state
          data-scale="0.4"
          data-x="0"
          data-y="-1.5"
          data-energy="0.4"
          data-color="#c9a668"
          data-wire="0.05"
          data-glow="0.03"
          data-shape="0.4"
          data-noise="1.5"
          className="min-h-screen flex flex-col items-center justify-center"
        >
          <div className="text-center px-6">
            <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-6">
              Disponible ahora
            </p>
            <h2 data-reveal className="font-display text-6xl md:text-7xl leading-tight mb-12">
              Lista cuando tú <br />
              <span className="italic text-gold-bright">lo estés.</span>
            </h2>
            <a
              href="#"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full border border-gold/40 text-gold-bright font-mono text-sm tracking-widest uppercase hover:bg-gold/10 transition-all duration-300"
            >
              Descargar para Windows
              <span className="text-xs opacity-60">v1.0 · 1.4 GB</span>
            </a>
            <p className="mt-8 font-mono text-xs text-text-dim">
              Windows 10/11 · 8 GB RAM mínimo · Ollama
            </p>
          </div>
        </section>

        <section
          data-orb-state
          data-scale="0.15"
          data-x="0"
          data-y="-3.5"
          data-energy="0.15"
          data-color="#c9a668"
          data-wire="0.02"
          data-glow="0.02"
          data-shape="0.3"
          data-noise="1.4"
        >
          <Footer />
        </section>

      </main>
    </div>
  );
}
