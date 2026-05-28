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
        grids: resolve(__dirname, 'documentation/pages/grids.html'),
        buttons: resolve(__dirname, 'documentation/pages/buttons.html'),
        forms: resolve(__dirname, 'documentation/pages/forms.html'),
        cards: resolve(__dirname, 'documentation/pages/cards.html'),
        badges: resolve(__dirname, 'documentation/pages/badges.html'),
        modals: resolve(__dirname, 'documentation/pages/modals.html'),
        tables: resolve(__dirname, 'documentation/pages/tables.html'),
        developerUsage: resolve(__dirname, 'documentation/developer/usage.html'),
        developerFonts: resolve(__dirname, 'documentation/developer/fonts.html'),
        developerArchitecture: resolve(__dirname, 'documentation/developer/architecture.html'),
        developerConventions: resolve(__dirname, 'documentation/developer/conventions.html')
      }
    }
  }
});
