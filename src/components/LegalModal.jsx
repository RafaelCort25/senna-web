import { useEffect, useRef } from 'react';

export default function LegalModal({ content, onClose }) {
  const contentRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    // Guardar estado previo
    document.body.classList.add('modal-open');

    // Pausar Lenis (scroll suave)
    const lenis = window.lenis;
    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop();
    }

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    };
  }, [onClose]);

  // Bloquear la propagacion del wheel para que Lenis NO intercepte el scroll
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const stopWheel = (e) => {
      // Permitir scroll natural del contenedor; evitar que Lenis lo capture
      e.stopPropagation();
    };

    el.addEventListener('wheel', stopWheel, { passive: true });
    el.addEventListener('touchmove', stopWheel, { passive: true });

    return () => {
      el.removeEventListener('wheel', stopWheel);
      el.removeEventListener('touchmove', stopWheel);
    };
  }, []);

  return (
    <div
      className="legal-modal-root fixed inset-0 z-[500] flex items-center justify-center px-4 py-8"
      style={{ background: 'rgba(10,9,8,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={contentRef}
        data-lenis-prevent
        className="legal-modal-content relative w-full max-w-[720px] max-h-[88vh] overflow-y-auto rounded-2xl border"
        style={{
          background: 'rgba(20,17,13,0.98)',
          borderColor: 'rgba(201,166,104,0.25)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
          cursor: 'auto',
        }}
      >
        <div className="sticky top-0 z-10 px-8 py-6 border-b border-gold/15 flex items-start justify-between"
             style={{ background: 'rgba(20,17,13,0.98)', backdropFilter: 'blur(8px)' }}>
          <div>
            <h2 className="font-display text-3xl text-cream mb-1">{content.title}</h2>
            <p className="font-mono text-[0.7rem] text-text-dim tracking-wide">{content.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-gold/20 text-text-dim hover:text-gold hover:border-gold/50 transition-all flex items-center justify-center text-lg"
          >X</button>
        </div>

        <div className="px-8 py-8">
          <div className="legal-content">
            {renderMarkdown(content.content)}
          </div>
        </div>
      </div>

      <style>{LEGAL_CSS}</style>
      <style>{`
        .legal-modal-content {
          overflow-y: auto !important;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
}

const LEGAL_CSS = `
  .legal-content h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 1.25rem; color: #e8c992; margin-top: 1.75em; margin-bottom: 0.6em; }
  .legal-content h2:first-child { margin-top: 0; }
  .legal-content h3 { font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; color: #c9a668; margin-top: 1.6em; margin-bottom: 0.5em; }
  .legal-content p { font-size: 0.92rem; line-height: 1.7; color: rgba(239,233,222,0.75); margin-bottom: 0.9em; }
  .legal-content strong { color: #efe9de; font-weight: 600; }
  .legal-content em { color: #c9a668; font-style: italic; }
  .legal-content ul { margin: 0.5em 0 1em 1.4em; padding: 0; }
  .legal-content li { font-size: 0.9rem; line-height: 1.7; color: rgba(239,233,222,0.7); margin: 0.3em 0; }
  .legal-content table { width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 0.85rem; }
  .legal-content th, .legal-content td { padding: 8px 12px; text-align: left; border-bottom: 1px solid rgba(201,166,104,0.15); }
  .legal-content th { font-weight: 600; color: #c9a668; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
  .legal-content td { color: rgba(239,233,222,0.7); }
`;

function renderMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let listBuffer = [];
  let tableBuffer = [];
  let key = 0;

  const flushList = () => {
    if (listBuffer.length) {
      elements.push(
        <ul key={'ul-' + (key++)}>
          {listBuffer.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inline(item) }} />
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  const flushTable = () => {
    if (tableBuffer.length >= 2) {
      const header = tableBuffer[0];
      const rows = tableBuffer.slice(2);
      elements.push(
        <table key={'tbl-' + (key++)}>
          <thead>
            <tr>{header.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} dangerouslySetInnerHTML={{ __html: inline(cell) }} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    tableBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith('|') && line.endsWith('|')) {
      flushList();
      const cells = line.slice(1, -1).split('|').map((c) => c.trim());
      tableBuffer.push(cells);
      continue;
    } else {
      flushTable();
    }

    if (line.startsWith('- ')) {
      listBuffer.push(line.slice(2));
      continue;
    } else {
      flushList();
    }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} dangerouslySetInnerHTML={{ __html: inline(line.slice(3)) }} />);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} dangerouslySetInnerHTML={{ __html: inline(line.slice(4)) }} />);
    } else if (line === '') {
      // skip
    } else {
      elements.push(<p key={key++} dangerouslySetInnerHTML={{ __html: inline(line) }} />);
    }
  }

  flushList();
  flushTable();
  return elements;
}

function inline(text) {
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  return html;
}
