import { useState } from 'react';
import LegalModal from './LegalModal';
import { LEGAL_CONTENT } from '../data/legalContent';

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(null);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (!el) return;
    if (window.lenis) {
      window.lenis.scrollTo(el, { duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = (key) => {
    setModalOpen(key);
  };

  return (
    <>
      <footer className="relative z-20 border-t border-gold/10 px-8 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8 md:mb-12">

            {/* Brand */}
            <div className="md:col-span-2">
              <div className="font-display text-3xl mb-4">
                Senna <span className="italic text-gold font-light">asistente</span>
              </div>
              <p className="text-text-dim text-sm leading-relaxed max-w-md">
                Asistente personal con IA local. Sin suscripciones, sin nube,
                sin compartir tus datos con nadie.
              </p>
            </div>

            {/* Producto */}
            <div>
              <h4 className="font-mono text-xs tracking-widest uppercase text-gold mb-4">
                Producto
              </h4>
              <ul className="space-y-2 text-sm text-text-dim">
                <li>
                  <button
                    onClick={() => scrollTo('#features')}
                    className="hover:text-gold transition-colors cursor-none"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('#agents')}
                    className="hover:text-gold transition-colors cursor-none"
                  >
                    Agentes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('#download')}
                    className="hover:text-gold transition-colors cursor-none"
                  >
                    Descargar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal('changelog')}
                    className="hover:text-gold transition-colors cursor-none"
                  >
                    Changelog
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-mono text-xs tracking-widest uppercase text-gold mb-4">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-text-dim">
                <li>
                  <button
                    onClick={() => openModal('licencia')}
                    className="hover:text-gold transition-colors cursor-none"
                  >
                    Licencia
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal('terminos')}
                    className="hover:text-gold transition-colors cursor-none"
                  >
                    Términos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal('privacidad')}
                    className="hover:text-gold transition-colors cursor-none"
                  >
                    Privacidad
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal('disclaimer')}
                    className="hover:text-gold transition-colors cursor-none"
                  >
                    Disclaimer
                  </button>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <p className="font-mono text-xs text-text-dim">
              © 2026 Rafael Cortijo · Todos los derechos reservados
            </p>
            <p className="font-mono text-xs text-text-dim tracking-widest uppercase">
              Senna · v1.0
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <LegalModal
          content={LEGAL_CONTENT[modalOpen]}
          onClose={() => setModalOpen(null)}
        />
      )}
    </>
  );
}
