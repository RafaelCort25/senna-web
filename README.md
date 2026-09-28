# Senna - Landing Page

Landing page oficial de **Senna**, el asistente personal con IA 100% local para Windows.

## Descripcion

Landing page inmersiva construida con React + Vite + Tailwind CSS, con:
- Fondo espacial animado (Nebula)
- Cursor personalizado
- Animaciones scroll-based
- Grid de skills interactivo
- Diagrama de agentes multiagente
- Contenido legal en modal

## Estructura

    src/
    |-- components/         # Componentes React reutilizables
    |   |-- AgentDiagram.jsx      # Diagrama de multiagente
    |   |-- Constellation.jsx     # Fondo de constelaciones
    |   |-- CustomCursor.jsx      # Cursor personalizado
    |   |-- DarkSide.jsx          # Seccion oscura
    |   |-- Footer.jsx            # Pie de pagina
    |   |-- GlowShell.jsx         # Efecto glow
    |   |-- Header.jsx            # Cabecera
    |   |-- LegalModal.jsx        # Modal con terminos y privacidad
    |   |-- LoadingScreen.jsx     # Pantalla de carga
    |   |-- Marquee.jsx           # Texto en movimiento
    |   |-- NebulaBackground.jsx  # Fondo de nebulosa
    |   |-- Orb.jsx               # Orbe animado
    |   |-- OrbitParticles.jsx    # Particulas orbitando
    |   |-- ScrollUI.jsx          # UI de scroll
    |   |-- SkillsGrid.jsx        # Grid de skills
    |   |-- StatsBlock.jsx        # Bloque de estadisticas
    |   |-- WireShell.jsx         # Estructura visual
    |-- data/
    |   |-- legalContent.js       # Contenido de terminos/privacidad
    |-- App.jsx               # Root
    |-- main.jsx              # Entry point
    |-- index.css             # Estilos globales

## Desarrollo

    # Instalar dependencias
    npm install

    # Arrancar servidor de desarrollo (http://localhost:5173)
    npm run dev

    # Build de produccion
    npm run build

    # Preview del build
    npm run preview

    # Lint
    npm run lint

## Deploy

Desplegado en **Cloudflare Pages** via Wrangler.

    # Deploy manual
    npm run build
    npx wrangler pages deploy dist

## Datos del proyecto (Senna)

- **38 skills** operativas con **338 acciones** totales
- **Multiagente** profesional (Supervisor + DEV / RESEARCH / EXECUTE / CHAT)
- **100% local** - Ollama + ChromaDB (sin nube)
- **Windows 10/11** (64 bits)

## Descarga

El boton de descarga apunta al instalador en:
    https://[tu-r2-bucket].r2.cloudflarestorage.com/SennaSetup.exe

## Enlaces

- **Backend (repo)**: https://github.com/RafaelCort25/jarvis-asistente
- **GUI (repo)**: https://github.com/RafaelCort25/jarvis-electron
- **Landing (este repo)**: https://github.com/RafaelCort25/senna-web

## Licencia

Uso personal. Ver seccion legal de la landing.
