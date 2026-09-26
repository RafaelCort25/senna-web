export const LEGAL_CONTENT = {
  changelog: {
    title: 'Changelog',
    subtitle: 'Historial de versiones de Senna',
    content: `
## v1.0.0 — Septiembre 2026

**Primera versión pública.**

### Añadido
- 31 skills nativas (sistema, archivos, dev, CAD, integraciones)
- Sistema multiagente profesional: Supervisor + DEV / RESEARCH / EXECUTE / CHAT
- Selección de modelos en tiempo real desde la GUI
- Historial de conversaciones persistentes con agrupación por día
- Panel de credenciales para Gmail, Canva, n8n, Telegram y Google Maps
- Pipeline CAD/BIM: DWG → análisis → muros 3D → export IFC
- Export IFC abrible en Revit, ArchiCAD y Tekla
- Instalador portable con Python embebido (SennaSetup.exe)
- Landing page inmersiva con orb reactivo al scroll
- Documentación completa (SKILLS.md, README, LICENSE, TERMS, PRIVACY, DISCLAIMER)

### Mejorado
- Rendimiento: cache de respuestas frecuentes
- Prompt del supervisor optimizado (1 paso por defecto)
- Respuestas de identidad locales (sin LLM, instantáneas)

### Corregido
- Bug crítico de \`stream=False\` en cliente Ollama 0.6.2
- Doble confirmación para shutdown/restart (blindado)
- Detección de modelo no instalado en dropdowns
    `,
  },

  licencia: {
    title: 'Licencia de uso',
    subtitle: 'Senna · Copyright © 2026 Rafael Cortijo',
    content: `
## Licencia de uso personal

Senna es propiedad de **Rafael Cortijo** y se distribuye exclusivamente
para uso personal.

### Usos permitidos

- Uso personal en el equipo del usuario autorizado
- Modificaciones privadas para uso propio
- Compartir con personas de confianza para uso personal

### Usos prohibidos

- Venta, alquiler o sublicencia
- Redistribución pública (repositorios, torrents, sitios de descarga)
- Uso comercial sin autorización expresa
- Eliminación de los avisos de copyright

### Sin garantías

El software se proporciona **"TAL CUAL"**, sin garantía de ningún tipo.
El autor no se hace responsable de ningún daño derivado del uso de este software.

Para permisos especiales: contacto a través del repositorio.
    `,
  },

  terminos: {
    title: 'Términos y Condiciones',
    subtitle: 'Última actualización: Septiembre 2026',
    content: `
## 1. Aceptación

Al instalar y usar Senna, aceptas estos términos. Si no estás de acuerdo,
no instales ni uses el software.

## 2. Descripción del servicio

Senna es un asistente personal local que funciona en tu computadora.
Puede controlar el sistema, ejecutar comandos, generar archivos, automatizar
tareas y comunicarse con servicios externos que tú configures.

## 3. Requisitos

- Windows 10/11 (64 bits)
- Ollama instalado con los modelos configurados
- 8 GB RAM mínimo (16 GB recomendado)
- Conexión a internet para integraciones externas (opcional)

## 4. Uso aceptable

Te comprometes a:

- Usar Senna solo para fines lícitos
- No usar Senna para actividades dañinas, ilegales o que violen los
  términos de servicios de terceros (Gmail, Telegram, WhatsApp, etc.)
- Ser responsable de las acciones que Senna ejecute en tu equipo

## 5. Limitaciones

Senna es una herramienta. **No garantizamos** que:

- Funcione sin errores en todos los entornos
- Genere contenido 100% preciso (los modelos de IA pueden alucinar)
- Esté disponible sin interrupciones

**Debes verificar todas las acciones críticas** antes de ejecutarlas
(apagado, borrado de archivos, envío de correos, etc.).

## 6. Modificaciones

Nos reservamos el derecho de actualizar estos términos. Los cambios se
publicarán en el repositorio. El uso continuado implica aceptación.

## 7. Terminación

Puedes dejar de usar Senna en cualquier momento. Basta con desinstalarlo.
No hay obligación de pago ni suscripción.
    `,
  },

  privacidad: {
    title: 'Política de Privacidad',
    subtitle: 'Última actualización: Septiembre 2026',
    content: `
## Resumen

**Senna es 100% local.** No recolectamos, transmitimos ni almacenamos
ningún dato personal en servidores externos.

## Qué datos maneja Senna

### En tu computadora (nunca salen de ahí)

- Conversaciones (\`memory/conversations/*.json\`)
- Preferencias del usuario (\`memory/*.json\`)
- Archivos generados (\`sandbox/\`)
- Historial de trazas (\`memory/traces/*.json\`)
- Logs de ejecución (\`logs/\`)

**Puedes borrar cualquier archivo en cualquier momento.**

### Hacia servicios externos (solo si tú los configuras)

Senna solo se conecta a servicios externos si **TÚ** pegas tus credenciales
en el panel de Configuración:

| Servicio | Qué se envía | Cuándo |
|----------|--------------|--------|
| **Ollama** | Texto de tus prompts | Cada mensaje (local, sin internet) |
| **Telegram** | Mensajes y archivos | Solo cuando lo pidas |
| **Gmail** | Correos enviados/leídos | Solo cuando lo pidas |
| **Canva** | Diseños generados | Solo cuando lo pidas |
| **n8n** | Workflows creados | Solo cuando lo pidas |

**Nunca enviamos tus datos a ningún servidor nuestro.**

### Cómo se guardan las credenciales

- Formato: \`.env.*.tmp\` (texto plano)
- Ubicación: solo en tu PC
- **Recomendación:** no compartas estos archivos

## Menores de edad

Senna no está diseñado para niños. No recolectamos datos de menores.

## Cambios

Podemos actualizar esta política. Los cambios se publicarán en el repositorio.

## Contacto

Si tienes dudas sobre privacidad, abre un issue en el repositorio.
    `,
  },

  disclaimer: {
    title: 'Descargo de Responsabilidad',
    subtitle: 'Última actualización: Septiembre 2026',
    content: `
## Aviso importante

Senna es un asistente basado en inteligencia artificial que puede
**ejecutar acciones reales** en tu computadora. Algunas de estas acciones
son potencialmente destructivas:

- Apagar o reiniciar el equipo
- Borrar archivos y vaciar la papelera
- Ejecutar comandos de terminal
- Enviar correos y mensajes
- Modificar documentos

## Tu responsabilidad

**Tú eres el único responsable** de:

1. Las acciones que Senna ejecute en tu equipo
2. La información que compartas a través de las integraciones
3. Verificar que las respuestas de Senna sean correctas antes de actuar
4. Realizar copias de seguridad antes de ejecutar tareas de riesgo

## Limitaciones de la IA

Senna usa modelos de lenguaje que pueden:

- **Alucinar** información (inventar datos, URLs, citas)
- **Malinterpretar** comandos ambiguos
- **Generar código con bugs**

**NO confíes ciegamente en el output de Senna.** Verifica siempre antes
de ejecutar acciones críticas.

## Sin garantías

Senna se proporciona "TAL CUAL", sin garantía de ningún tipo. El autor
no se hace responsable de:

- Pérdida de datos
- Daños al hardware o software
- Pérdidas económicas
- Violación de términos de servicios de terceros por uso indebido

## Uso de servicios de terceros

Si configuras Gmail, Telegram, Canva, n8n u otros, aceptas sus respectivos
términos de servicio. Senna no se hace responsable de posibles baneos o
violaciones de esos términos por uso indebido.

## Recomendaciones de seguridad

1. No compartas tus archivos \`.env.*.tmp\` con nadie
2. Revisa cada acción antes de confirmar
3. Usa una cuenta de prueba antes de operar con datos reales
4. No uses Senna para spam o actividades que puedan violar términos de servicios
    `,
  },
};
