# Senia UI CSS Framework — Grupo Sénia

Infraestructura base de arquitectura CSS moderna, sistema de tokens de diseño y componentes UI reutilizables diseñado como el núcleo de diseño (Design System) multi-proyecto para **Grupo Sénia**.

Este proyecto no es una web final, sino un **CSS Framework interno y propietario** pensado para ser escalable, de alto rendimiento y mantenible a lo largo de los años.

---

## 🏛️ Arquitectura CSS y Organización

El framework aprovecha las capacidades más avanzadas de CSS moderno, separando responsabilidades mediante **Cascading Layers (`@layer`)**. Esto asegura que las prioridades de cascada estén garantizadas a nivel de navegador, resolviendo colisiones de especificidad de forma nativa:

```css
@layer reset, tokens, base, utilities, components, layouts, themes;
```

### Estructura de Directorios (`/src`)

- **`/core`**:
  - `layers.css`: Declaración y orden estricto de las capas de cascada.
  - `reset.css`: Reset tipográfico y de caja moderno (inspirado en _modern-normalize_, Andy Bell y Josh Comeau) con mejoras críticas de accesibilidad y soporte para reducción de movimiento.
- **`/tokens`**: Variables de diseño globales (Custom Properties) en `:root`.
  - `colors.css`: Paletas de color armónicas parametrizadas mediante **HSL** (Primary Royal Indigo, Secondary Soft Teal, Neutral Slate y estados semánticos).
  - `typography.css`: Definición de fuentes corporativas (Outfit para títulos, Inter para textos) y escala modular de tamaños y pesos.
  - `spacing.css`: Regla fluida de espaciados (4px/8px relacionales en rem).
  - `radius.css` & `shadows.css`: Bordes modulares y elevaciones realistas multi-capa.
  - `transitions.css`, `z-index.css` & `breakpoints.css`: Motion, apilamiento y viewports de referencia.
- **`/base`**:
  - `base.css`: Estilado y normalización por defecto de etiquetas HTML puras.
- **`/themes`**: Mapeo de variables semánticas.
  - `light.css` & `dark.css`: Gestión del contraste Claro/Oscuro de la interfaz mediante la inyección de la clase `.theme-dark` en el elemento raíz del HTML.
- **`/utilities`**: Clases auxiliares atómicas (flexbox, grids, paddings/margins, display y alineaciones) de baja especificidad con prefijo `u-`.
- **`/components`**: Componentes de interfaz encapsulados e independientes construidos bajo la convención **BEM Simplificado** con prefijo `c-`:
  - `button.css` (Botones), `input.css` (Formularios y selectores), `card.css` (Tarjetas de contenido e interactivas), `badge.css` (Etiquetas de estado), `modal.css` (Ventanas de diálogo clásicas y nativas `<dialog>`), `table.css` (Tablas cebradas y responsivas).
- **`/layouts`**: Skeletons estructurales de página (`.l-container`, `.l-grid--3col`, `.l-sidebar-layout`) con prefijo `l-`.

---

## 🧪 Documentation Showcase (Laboratorio UI)

El entorno `/documentation` es un espacio interno interactivo que sirve como laboratorio y showcase de pruebas para los desarrolladores. Está **estilado en su totalidad por el propio framework** y permite inspeccionar visualmente:

- La paleta de colores HSL y su comportamiento interactivo.
- La escala tipográfica y los rulers de espaciado.
- Grillas responsivas y layouts dinámicos.
- Variantes, estados (normal, hover, disabled, loading) y tamaños de todos los componentes.
- Playground interactivo para desencadenar la apertura de modales (clásicos y nativos) y un conmutador persistente de **Modo Oscuro** respaldado en `localStorage`.

---

## 🛠️ Guía del Desarrollador (Instalación & Compilación)

### 📌 Requisitos Previos

- **Node.js**: Versión LTS (Recomendado v18 o superior).
- **NPM / PNPM**: Gestor de paquetes compatible.

---

### 🚀 Comandos Rápidos de Consola

1.  **Instalar Dependencias:**
    Ejecuta el siguiente comando para descargar y compilar físicamente todas las dependencias (incluyendo el compilador nativo de `esbuild` para Vite) directamente en la carpeta local `node_modules` del proyecto:

    ```bash
    npm install
    ```

2.  **Entorno de Desarrollo (HMR):**
    Levanta el servidor local de desarrollo de Vite para visualizar cambios cromáticos y de layout en tiempo real con refresco instantáneo en el navegador:

    ```bash
    npm run dev
    ```

    - Una vez levantado, abre: `http://localhost:5173/visualizer/index.html`

3.  **Compilar para Producción:**
    Procesa, optimiza y empaqueta el CSS utilizando la tubería de **PostCSS** (anidamientos nativos, resolución de `@import` recursivos, prefijos automáticos del navegador mediante `autoprefixer` y minificación extrema con `cssnano`):

    ```bash
    npm run build
    ```

    - **Resultado:** Generará el bundle optimizado minificado en `dist/assets/visualizer-[hash].css` y páginas HTML limpias e independientes del laboratorio listas para producción en la carpeta `/dist`.

4.  **Previsualizar Compilado:**
    Comprueba el comportamiento estático de producción directamente desde el servidor local de previsualización de Vite:
    ```bash
    npm run preview
    ```

---

## 🎨 Visualización Local Directa (`file://`)

Gracias a una re-estructuración completa de rutas relativas (`../` y `../../`), cualquier desarrollador o diseñador puede visualizar el laboratorio UI al 100% de su capacidad **haciendo doble clic** en:

```
E:\tu-ruta-de-carpetas\senia-ui-system\visualizer\index.html
```

Esto permite realizar revisiones estéticas rápidas sin necesidad de abrir una terminal de comandos, cargar servidores locales o tener dependencias de Node.js instaladas.

---

## 📈 ¿Cómo Extender el Sistema?

- **¿Quieres añadir un nuevo color?** Modifica `src/tokens/colors.css` declarando su base HSL, y luego mapea sus usos semánticos en `src/themes/light.css` y `src/themes/dark.css`.
- **¿Quieres añadir un nuevo componente BEM?** Crea un archivo en `src/components/mi-componente.css` bajo la convención `.c-mi-componente` e impórtalo en `src/components/index.css` para que se incorpore automáticamente en la capa `@layer components`.

---

Copyright (c) SENIA FOOD AND BEVERAGE, S.L.U. (CIF: B55254569)

All rights reserved.

This software and associated files are proprietary and confidential.
Unauthorized copying, modification, distribution, or use is prohibited
without prior written permission from Grupo Sénia.
