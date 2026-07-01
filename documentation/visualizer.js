/* ==========================================================================
   Senia UI Showcase - Visualizer Interactivity Script
   Handles theme toggles, modal dialog toggling, interactive navigation,
   and the interactive 3D z-index visualizer.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initModals();
  initNavigation();
  initConventionsTabs();
  initZIndexVisualizer();
});

/**
 * Theme Manager
 * Persistent Light / Dark theme selector saving states in localStorage.
 */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('senia-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('theme-dark');
    themeToggle.checked = true;
  } else {
    document.documentElement.classList.remove('theme-dark');
    themeToggle.checked = false;
  }

  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      document.documentElement.classList.add('theme-dark');
      localStorage.setItem('senia-theme', 'dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
      localStorage.setItem('senia-theme', 'light');
    }
  });
}

/**
 * Modal Manager
 * Binds buttons with data attributes to open and close standard classes or HTML5 dialogs.
 */
function initModals() {
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-modal-target');
      const overlay = document.getElementById(targetId);
      if (overlay) {
        overlay.classList.add('c-modal-overlay--open');
      }
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(closer => {
    closer.addEventListener('click', () => {
      const overlay = closer.closest('.c-modal-overlay');
      if (overlay) {
        overlay.classList.remove('c-modal-overlay--open');
      }
    });
  });

  document.querySelectorAll('[data-dialog-target]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-dialog-target');
      const dialog = document.getElementById(targetId);
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    });
  });

  document.querySelectorAll('[data-dialog-close]').forEach(closer => {
    closer.addEventListener('click', () => {
      const dialog = closer.closest('dialog');
      if (dialog && typeof dialog.close === 'function') {
        dialog.close();
      }
    });
  });
}

/**
 * Dynamic Sidebar Navigation Generator
 * Automatically builds the unified navigation on all pages.
 */
function initNavigation() {
  const sidebar = document.querySelector('.v-sidebar');
  if (!sidebar) return;

  // Detect paths level (root vs pages/developer subfolders)
  const isSubfolder = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/developer/');
  const rootPrefix = isSubfolder ? '../' : './';

  // Helper to check if a link is active
  const isActive = (pageName) => {
    const cleanPath = window.location.pathname.replace(/\\/g, '/');
    return cleanPath.endsWith('/' + pageName) || (pageName === 'index.html' && cleanPath.endsWith('/documentation/'));
  };

  // Helper to open details tag if current page is inside it
  const isOpenGroup = (groupName) => {
    const cleanPath = window.location.pathname.replace(/\\/g, '/');
    if (groupName === 'tokens') {
      return cleanPath.includes('/pages/') && (
        cleanPath.includes('colors') || 
        cleanPath.includes('typography') || 
        cleanPath.includes('breakpoints')
      );
    }
    if (groupName === 'utilities') {
      return cleanPath.includes('/pages/') && (
        cleanPath.includes('spacing') || 
        cleanPath.includes('radius') || 
        cleanPath.includes('outlines') || 
        cleanPath.includes('shadows') || 
        cleanPath.includes('z-index') || 
        cleanPath.includes('transitions') || 
        cleanPath.includes('grids') ||
        cleanPath.includes('effects')
      );
    }
    if (groupName === 'components') {
      return cleanPath.includes('/pages/') && (
        cleanPath.includes('buttons') || 
        cleanPath.includes('forms') || 
        cleanPath.includes('cards') || 
        cleanPath.includes('badges') || 
        cleanPath.includes('modals') || 
        cleanPath.includes('tables') ||
        cleanPath.includes('tooltips') ||
        cleanPath.includes('dropdowns') ||
        cleanPath.includes('accordions') ||
        cleanPath.includes('progress') ||
        cleanPath.includes('loading') ||
        cleanPath.includes('navigation') ||
        cleanPath.includes('input-groups')
      );
    }
    if (groupName === 'developer') {
      return cleanPath.includes('/developer/');
    }
    return false;
  };

  sidebar.innerHTML = `
    <!-- Inicio Link Section -->
    <div class="v-sidebar__section">
      <ul class="v-sidebar__nav">
        <li>
          <a href="${rootPrefix}index.html" class="v-sidebar__link ${isActive('index.html') ? 'v-sidebar__link--active' : ''}">
            Inicio
          </a>
        </li>
      </ul>
    </div>
    
    <!-- Bases y Tokens Collapsible Submenu -->
    <details class="v-sidebar__submenu" ${isOpenGroup('tokens') ? 'open' : ''}>
      <summary class="v-sidebar__submenu-trigger">Tokens y Bases</summary>
      <ul class="v-sidebar__submenu-nav">
        <li><a href="${rootPrefix}pages/colors.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('colors.html') ? 'v-sidebar__link--active' : ''}">Colores</a></li>
        <li><a href="${rootPrefix}pages/typography.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('typography.html') ? 'v-sidebar__link--active' : ''}">Tipografía</a></li>
        <li><a href="${rootPrefix}pages/breakpoints.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('breakpoints.html') ? 'v-sidebar__link--active' : ''}">Breakpoints</a></li>
      </ul>
    </details>

    <!-- Utilidades CSS Atómicas Collapsible Submenu -->
    <details class="v-sidebar__submenu" ${isOpenGroup('utilities') ? 'open' : ''}>
      <summary class="v-sidebar__submenu-trigger">Utilidades CSS Atómicas</summary>
      <ul class="v-sidebar__submenu-nav">
        <li><a href="${rootPrefix}pages/spacing.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('spacing.html') ? 'v-sidebar__link--active' : ''}">Espaciado (Margin & Padding)</a></li>
        <li><a href="${rootPrefix}pages/grids.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('grids.html') ? 'v-sidebar__link--active' : ''}">Alineación (Flex & Grid)</a></li>
        <li><a href="${rootPrefix}pages/radius.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('radius.html') ? 'v-sidebar__link--active' : ''}">Radios de Bordes</a></li>
        <li><a href="${rootPrefix}pages/outlines.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('outlines.html') ? 'v-sidebar__link--active' : ''}">Contornos (Outlines)</a></li>
        <li><a href="${rootPrefix}pages/shadows.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('shadows.html') ? 'v-sidebar__link--active' : ''}">Sombras (Shadows)</a></li>
        <li><a href="${rootPrefix}pages/z-index.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('z-index.html') ? 'v-sidebar__link--active' : ''}">Diseño & Z-Index</a></li>
        <li><a href="${rootPrefix}pages/transitions.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('transitions.html') ? 'v-sidebar__link--active' : ''}">Transiciones Atómicas</a></li>
        <li><a href="${rootPrefix}pages/effects.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('effects.html') ? 'v-sidebar__link--active' : ''}">Efectos, Blur & Filtros</a></li>
      </ul>
    </details>
    
    <!-- Componentes Collapsible Submenu -->
    <details class="v-sidebar__submenu" ${isOpenGroup('components') ? 'open' : ''}>
      <summary class="v-sidebar__submenu-trigger">Componentes (BEM)</summary>
      <ul class="v-sidebar__submenu-nav">
        <li><a href="${rootPrefix}pages/buttons.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('buttons.html') ? 'v-sidebar__link--active' : ''}">Botones</a></li>
        <li><a href="${rootPrefix}pages/forms.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('forms.html') ? 'v-sidebar__link--active' : ''}">Formularios</a></li>
        <li><a href="${rootPrefix}pages/form-fields.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('form-fields.html') ? 'v-sidebar__link--active' : ''}">Campos Avanzados</a></li>
        <li><a href="${rootPrefix}pages/input-groups.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('input-groups.html') ? 'v-sidebar__link--active' : ''}">Grupos de Input</a></li>
        <li><a href="${rootPrefix}pages/cards.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('cards.html') ? 'v-sidebar__link--active' : ''}">Tarjetas</a></li>
        <li><a href="${rootPrefix}pages/badges.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('badges.html') ? 'v-sidebar__link--active' : ''}">Etiquetas</a></li>
        <li><a href="${rootPrefix}pages/modals.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('modals.html') ? 'v-sidebar__link--active' : ''}">Modales</a></li>
        <li><a href="${rootPrefix}pages/tables.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('tables.html') ? 'v-sidebar__link--active' : ''}">Tablas</a></li>
        <li><a href="${rootPrefix}pages/tooltips.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('tooltips.html') ? 'v-sidebar__link--active' : ''}">Tooltips</a></li>
        <li><a href="${rootPrefix}pages/dropdowns.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('dropdowns.html') ? 'v-sidebar__link--active' : ''}">Dropdowns</a></li>
        <li><a href="${rootPrefix}pages/accordions.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('accordions.html') ? 'v-sidebar__link--active' : ''}">Acordeones</a></li>
        <li><a href="${rootPrefix}pages/progress.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('progress.html') ? 'v-sidebar__link--active' : ''}">Progreso</a></li>
        <li><a href="${rootPrefix}pages/loading.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('loading.html') ? 'v-sidebar__link--active' : ''}">Cargas / Spinners</a></li>
        <li><a href="${rootPrefix}pages/navigation.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('navigation.html') ? 'v-sidebar__link--active' : ''}">Navegación</a></li>
      </ul>
    </details>
    
    <!-- Developer Collapsible Submenu -->
    <details class="v-sidebar__submenu" ${isOpenGroup('developer') ? 'open' : ''}>
      <summary class="v-sidebar__submenu-trigger">Desarrolladores</summary>
      <ul class="v-sidebar__submenu-nav">
        <li><a href="${rootPrefix}developer/usage.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('usage.html') ? 'v-sidebar__link--active' : ''}">Primeros Pasos</a></li>
        <li><a href="${rootPrefix}developer/configuration.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('configuration.html') ? 'v-sidebar__link--active' : ''}">Personalización de Temas</a></li>
        <li><a href="${rootPrefix}developer/architecture.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('architecture.html') ? 'v-sidebar__link--active' : ''}">Arquitectura</a></li>
        <li><a href="${rootPrefix}developer/conventions.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('conventions.html') ? 'v-sidebar__link--active' : ''}">Convenciones</a></li>
        <li><a href="${rootPrefix}developer/fonts.html" class="v-sidebar__link v-sidebar__link--submenu ${isActive('fonts.html') ? 'v-sidebar__link--active' : ''}">Uso de Fuentes</a></li>
      </ul>
    </details>
  `;
}

/**
 * Conventions Page Tab Navigation
 * Leverages URL Hash parameters to load sub-convention panels instantly.
 */
function initConventionsTabs() {
  const navContainer = document.querySelector('.l-conventions-nav');
  if (!navContainer) return;

  const links = navContainer.querySelectorAll('.l-conventions-nav__link');
  const sections = document.querySelectorAll('.l-conventions-section');

  function switchTab(hash) {
    const targetHash = hash || '#filosofia';
    let targetLink = navContainer.querySelector(`[href="${targetHash}"]`);
    
    // Si no es un enlace de tab de primer nivel, comprobar si es un sub-anclaje (ej. #fuentes-escala empieza con #fuentes-)
    if (!targetLink) {
      const parentHash = Array.from(links)
        .map(l => l.getAttribute('href'))
        .find(h => targetHash.startsWith(h + '-'));
      
      if (parentHash) {
        targetLink = navContainer.querySelector(`[href="${parentHash}"]`);
      }
    }

    // Si aún así no es un hash válido del sistema de tabs, ignoramos la acción de cambio (mantiene activa la pestaña actual)
    if (!targetLink) return;

    const targetSectionId = 'sec-' + targetLink.getAttribute('href').replace('#', '');
    const targetSection = document.getElementById(targetSectionId);

    // Reset states
    links.forEach(l => l.classList.remove('l-conventions-nav__link--active'));
    sections.forEach(s => s.classList.remove('l-conventions-section--active'));

    // Apply active state
    targetLink.classList.add('l-conventions-nav__link--active');
    if (targetSection) {
      targetSection.classList.add('l-conventions-section--active');
    }
  }

  // Listen to hash changes
  window.addEventListener('hashchange', () => {
    switchTab(window.location.hash);
  });

  // Init on load
  switchTab(window.location.hash);
}

/**
 * Interactive 3D z-index Stacking Visualizer
 */
function initZIndexVisualizer() {
  const visualizer = document.querySelector('.v-zindex-visualizer');
  if (!visualizer) return;

  const layers = visualizer.querySelectorAll('.v-zindex-layer');
  const detailsCard = document.getElementById('zindex-details-card');

  // Layer description dictionary
  const zIndexDatabase = {
    'hide': {
      value: '-1',
      variable: '--z-index-hide',
      title: 'Hide (Ocultar)',
      description: 'Se utiliza para colocar elementos deliberadamente detrás del flujo de contenido normal. Útil para decoraciones de fondo o efectos visuales que no deben interceptar eventos del puntero.',
      example: 'Efectos de paralaje, formas abstractas flotantes tras el texto.'
    },
    'base': {
      value: '0',
      variable: '--z-index-base',
      title: 'Base',
      description: 'La capa de apilamiento por defecto para todos los elementos de la interfaz. Representa el nivel estándar del suelo de nuestro diseño plano.',
      example: 'Estructuras de layout habituales, texto, tarjetas estándar.'
    },
    'dropdown': {
      value: '1000',
      variable: '--z-index-dropdown',
      title: 'Dropdown',
      description: 'Reservado para menús desplegables contextuales, selectores nativos estilizados y autocompletados. Es la primera capa aérea sobre el contenido base.',
      example: 'Menú de perfil del header, dropdowns de formularios.'
    },
    'sticky': {
      value: '1020',
      variable: '--z-index-sticky',
      title: 'Sticky',
      description: 'Asignado a cabeceras u otros elementos "adhesivos" que deben persistir en pantalla al hacer scroll pero permitir que diálogos, overlays o modales se superpongan encima.',
      example: 'Cabecera global del visualizador (.v-header), barras laterales fijas.'
    },
    'fixed': {
      value: '1030',
      variable: '--z-index-fixed',
      title: 'Fixed',
      description: 'Para elementos globales permanentemente fijos en pantalla (ej. avisos flotantes de cookies, widgets de soporte o alertas globales fijas).',
      example: 'Chatbox flotante de asistencia, banner superior de aviso.'
    },
    'modal-backdrop': {
      value: '1040',
      variable: '--z-index-modal-backdrop',
      title: 'Modal Backdrop (Overlay)',
      description: 'El fondo translúcido y desenfocado que cubre toda la pantalla del usuario. Bloquea las interacciones con el fondo y enfoca la atención en el modal activo.',
      example: 'Fondo oscurecido en la apertura de modales (.c-modal-overlay).'
    },
    'modal': {
      value: '1050',
      variable: '--z-index-modal',
      title: 'Modal Dialog',
      description: 'La ventana de diálogo central en sí misma. Flota sobre el backdrop bloqueando y centrando por completo el flujo de usuario actual.',
      example: 'Ventanas emergentes interactivas (.c-modal).'
    },
    'popover': {
      value: '1060',
      variable: '--z-index-popover',
      title: 'Popover',
      description: 'Contenedores emergentes con flujos muy específicos y urgentes que pueden requerir superponerse incluso por encima de diálogos activos estándar.',
      example: 'Selectors de fecha dentro de modales, alertas enriquecidas contextuales.'
    },
    'tooltip': {
      value: '1070',
      variable: '--z-index-tooltip',
      title: 'Tooltip',
      description: 'La capa superior absoluta. Garantiza que las pequeñas etiquetas aclaratorias que aparecen bajo eventos hover de ratón nunca se recorten por ningún contenedor.',
      example: 'Mensajes de ayuda emergentes al pasar el cursor por encima de botones.'
    }
  };

  function updateDetails(layerKey) {
    const data = zIndexDatabase[layerKey];
    if (!data) return;

    // Apply active class to selected layer in 3D
    layers.forEach(l => l.classList.remove('v-zindex-layer--active'));
    const activeLayer = visualizer.querySelector(`[data-layer="${layerKey}"]`);
    if (activeLayer) activeLayer.classList.add('v-zindex-layer--active');

    // Update details card content
    detailsCard.innerHTML = `
      <div class="v-zindex-details-card__content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-iii);">
          <h3 style="margin: 0; font-size: var(--font-size-md); color: var(--color-text-heading);">${data.title}</h3>
          <span class="v-zindex-layer__value" style="font-size: var(--font-size-iv);">${data.value}</span>
        </div>
        <div style="font-family: var(--font-family-mono); font-size: var(--font-size-ii); color: var(--color-highlight); margin-bottom: var(--space-iv); font-weight: 600;">
          ${data.variable}
        </div>
        <p class="u-text-iv u-text-muted" style="margin-bottom: var(--space-iv); line-height: 1.5;">
          ${data.description}
        </p>
        <div style="border-top: 1px solid var(--color-border-subtle); padding-top: var(--space-iii);">
          <span style="font-size: var(--font-size-3xs); font-weight: bold; text-transform: uppercase; color: var(--color-neutral-400); display: block; margin-bottom: 2px;">
            Ejemplo de Uso:
          </span>
          <code style="font-size: var(--font-size-ii); color: var(--color-neutral-600); .theme-dark & { color: var(--color-neutral-300); }">${data.example}</code>
        </div>
      </div>
    `;
  }

  // Layer keys sorted from bottom to top
  const layerKeys = ['hide', 'base', 'dropdown', 'sticky', 'fixed', 'modal-backdrop', 'modal', 'popover', 'tooltip'];
  let currentIdx = layerKeys.indexOf('modal');

  // Click handler for 3D layers
  layers.forEach(layer => {
    layer.addEventListener('click', () => {
      const layerKey = layer.getAttribute('data-layer');
      currentIdx = layerKeys.indexOf(layerKey);
      updateDetails(layerKey);
    });
  });

  // Prev / Next button listeners
  const prevBtn = document.getElementById('zindex-prev-btn');
  const nextBtn = document.getElementById('zindex-next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIdx = (currentIdx - 1 + layerKeys.length) % layerKeys.length;
      updateDetails(layerKeys[currentIdx]);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % layerKeys.length;
      updateDetails(layerKeys[currentIdx]);
    });
  }

  // Select 'modal' as the default view
  updateDetails('modal');
}
