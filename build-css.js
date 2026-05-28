import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const entrypoints = [
  {
    input: path.resolve(__dirname, 'src/essential.css'),
    outputName: 'senia-essential',
  },
  {
    input: path.resolve(__dirname, 'src/style.css'),
    outputName: 'senia-full',
  },
];

const distDir = path.resolve(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

async function build() {
  const pluginsDev = [postcssImport(), postcssNesting(), autoprefixer()];
  const pluginsProd = [...pluginsDev, cssnano()];

  for (const entry of entrypoints) {
    const css = fs.readFileSync(entry.input, 'utf8');

    // 1. Build unminified (.css)
    const devResult = await postcss(pluginsDev).process(css, {
      from: entry.input,
      to: path.resolve(distDir, `${entry.outputName}.css`),
    });
    fs.writeFileSync(path.resolve(distDir, `${entry.outputName}.css`), devResult.css);
    console.log(`✓ Built dist/${entry.outputName}.css`);

    // 2. Build minified (.min.css)
    const prodResult = await postcss(pluginsProd).process(css, {
      from: entry.input,
      to: path.resolve(distDir, `${entry.outputName}.min.css`),
    });
    fs.writeFileSync(path.resolve(distDir, `${entry.outputName}.min.css`), prodResult.css);
    console.log(`✓ Built dist/${entry.outputName}.min.css`);
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
