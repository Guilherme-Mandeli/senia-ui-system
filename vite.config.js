import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        documentation: resolve(__dirname, 'documentation/index.html'),
        colors: resolve(__dirname, 'documentation/pages/colors.html'),
        typography: resolve(__dirname, 'documentation/pages/typography.html'),
        spacing: resolve(__dirname, 'documentation/pages/spacing.html'),
        radius: resolve(__dirname, 'documentation/pages/radius.html'),
        shadows: resolve(__dirname, 'documentation/pages/shadows.html'),
        zIndex: resolve(__dirname, 'documentation/pages/z-index.html'),
        transitions: resolve(__dirname, 'documentation/pages/transitions.html'),
        breakpoints: resolve(__dirname, 'documentation/pages/breakpoints.html'),
        grids: resolve(__dirname, 'documentation/pages/grids.html'),
        buttons: resolve(__dirname, 'documentation/pages/buttons.html'),
        forms: resolve(__dirname, 'documentation/pages/forms.html'),
        formFields: resolve(__dirname, 'documentation/pages/form-fields.html'),
        cards: resolve(__dirname, 'documentation/pages/cards.html'),
        badges: resolve(__dirname, 'documentation/pages/badges.html'),
        modals: resolve(__dirname, 'documentation/pages/modals.html'),
        tables: resolve(__dirname, 'documentation/pages/tables.html'),
        tooltips: resolve(__dirname, 'documentation/pages/tooltips.html'),
        dropdowns: resolve(__dirname, 'documentation/pages/dropdowns.html'),
        accordions: resolve(__dirname, 'documentation/pages/accordions.html'),
        progress: resolve(__dirname, 'documentation/pages/progress.html'),
        loading: resolve(__dirname, 'documentation/pages/loading.html'),
        inputGroups: resolve(__dirname, 'documentation/pages/input-groups.html'),
        navigation: resolve(__dirname, 'documentation/pages/navigation.html'),
        developerUsage: resolve(__dirname, 'documentation/developer/usage.html'),
        developerFonts: resolve(__dirname, 'documentation/developer/fonts.html'),
        developerConfiguration: resolve(__dirname, 'documentation/developer/configuration.html'),
        developerArchitecture: resolve(__dirname, 'documentation/developer/architecture.html'),
        developerConventions: resolve(__dirname, 'documentation/developer/conventions.html')
      }
    }
  }
});
