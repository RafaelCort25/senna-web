export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between pointer-events-none">
      <div className="font-display text-xl text-cream pointer-events-auto">
        Senna <span className="italic text-gold font-light">asistente</span>
      </div>
      <nav className="flex items-center gap-8 pointer-events-auto">
        <a
          href="#features"
          className="font-mono text-xs tracking-widest uppercase text-text-dim hover:text-gold transition-colors duration-300"
        >
          Features
        </a>
        <a
          href="#agents"
          className="font-mono text-xs tracking-widest uppercase text-text-dim hover:text-gold transition-colors duration-300"
        >
          Agentes
        </a>
        <a
          href="#download"
          className="font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full border border-gold/30 text-gold-bright hover:bg-gold/10 transition-all duration-300"
        >
          Descargar
        </a>
      </nav>
    </header>
  );
}
