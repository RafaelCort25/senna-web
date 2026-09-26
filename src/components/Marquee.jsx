const KEYWORDS = [
  'Sistema', 'Dev', 'CAD/BIM', 'Gmail', 'Canva', 'n8n',
  'Vision', 'Telegram', 'Blender', 'FreeCAD', 'Docs', 'Terminal',
  'Git', 'Office', 'Spotify', 'Clima', 'Traducción', 'Macros',
];

export default function Marquee() {
  return (
    <div className="relative z-20 py-12 overflow-hidden border-y border-gold/10 bg-void/30 backdrop-blur-sm">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

      <div className="flex gap-12 whitespace-nowrap marquee-track">
        {[...KEYWORDS, ...KEYWORDS].map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="font-display italic text-2xl md:text-3xl text-gold/70 flex items-center gap-12"
          >
            {word}
            <span className="text-gold/30">◆</span>
          </span>
        ))}
      </div>

      <style>{`
        .marquee-track {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
