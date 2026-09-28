# Senna - Landing Page

Landing page oficial de **Senna**, el asistente personal con IA 100% local para Windows.

## Descripcion

Landing page inmersiva construida con React + Vite + Tailwind CSS, con:
- Fondo espacial animado (Nebula) con parallax multicapa
- Cursor personalizado
- Animaciones scroll-based
- **Grid de 38 skills** interactivo (filtros por categoria + busqueda + modal con detalle)
- **Seccion "Como funciona"** - flujo visual multiagente
- **Seccion "El poder esta en combinar"** - 6 flujos destacados que combinan skills
- **Diagrama de agentes** multiagente (Supervisor + DEV / RESEARCH / EXECUTE / CHAT)
- **Contenido legal** en modal (Terminos, Privacidad)
- **Botón de descarga** que apunta a GitHub Releases (auto-actualizado)
- **Responsive** para movil/tablet/desktop

## Estructura

    src/
    |-- components/         # Componentes React reutilizables
    |   |-- AgentDiagram.jsx       # Diagrama de multiagente
    |   |-- CombosSection.jsx      # Seccion "El poder esta en combinar" (6 flujos)
    |   |-- Constellation.jsx      # Fondo de constelaciones
    |   |-- CustomCursor.jsx       # Cursor personalizado
    |   |-- DarkSide.jsx           # Seccion oscura
    |   |-- Footer.jsx             # Pie de pagina
    |   |-- GlowShell.jsx          # Efecto glow
    |   |-- Header.jsx             # Cabecera
    |   |-- HowItWorks.jsx         # Seccion "Como funciona" (flujo multiagente)
    |   |-- LegalModal.jsx         # Modal con terminos y privacidad
    |   |-- LoadingScreen.jsx      # Pantalla de carga
    |   |-- Marquee.jsx            # Texto en movimiento
    |   |-- NebulaBackground.jsx   # Fondo de nebulosa
    |   |-- Orb.jsx                # Orbe animado
    |   |-- OrbitParticles.jsx     # Particulas orbitando
    |   |-- ScrollUI.jsx           # UI de scroll
    |   |-- SkillModal.jsx         # Modal con detalle de cada skill (38)
    |   |-- SkillsGrid.jsx         # Grid interactivo con filtros y busqueda
    |   |-- StatsBlock.jsx         # Bloque de estadisticas
    |   |-- WireShell.jsx          # Estructura visual
    |-- data/
    |   |-- legalContent.js        # Contenido de terminos/privacidad
    |   |-- skills.js              # Base de datos de las 38 skills
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
