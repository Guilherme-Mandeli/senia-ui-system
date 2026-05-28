# Senia UI - CDN de Fuentes Locales

Esta carpeta `public/fonts/` está configurada para servir fuentes optimizadas de manera local y actuar como un CDN de fuentes para el framework y otros proyectos del grupo.

Cualquier archivo de fuente que coloques en esta carpeta estará disponible de manera pública en la raíz del proyecto cuando esté en ejecución o compilado (por ejemplo, en `http://localhost:5173/fonts/[nombre-de-fuente]`).

## Estructura Recomendada

Para mantener el orden, se recomienda organizar las fuentes en subcarpetas por familia tipográfica:

```
public/fonts/
├── inter/
│   ├── inter-300.woff2
│   ├── inter-400.woff2
│   ├── inter-500.woff2
│   ├── inter-600.woff2
│   └── inter-700.woff2
├── outfit/
│   ├── outfit-400.woff2
│   ├── outfit-500.woff2
│   ├── outfit-600.woff2
│   ├── outfit-700.woff2
│   └── outfit-800.woff2
└── jetbrains-mono/
    ├── jetbrains-mono-400.woff2
    └── jetbrains-mono-500.woff2
```

## Formatos Recomendados

Utiliza principalmente el formato **WOFF2** (.woff2), ya que ofrece una compresión hasta un 30% superior en comparación con WOFF tradicional y es soportado por el 99%+ de los navegadores modernos.

---

## ¿Cómo activarlo en Senia UI?

1. **Descarga y coloca las fuentes:** Puedes descargar las fuentes oficiales en formato `.woff2` desde plataformas como [google-webfonts-helper](https://gwfh.style/bootstrap-cdn/projects/) y colócalas en sus respectivas carpetas dentro de `public/fonts/`.
2. **Habilita el archivo de fuentes local:** Edita el archivo `src/base/fonts.css` y descomenta las declaraciones `@font-face`.
3. **Desactiva la llamada externa:** En el archivo `src/base/base.css`, comenta o elimina la línea `@import url('https://fonts.googleapis.com/css2?...')` para evitar dobles peticiones y mejorar el rendimiento de carga y la privacidad de los usuarios.
