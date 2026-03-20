# CrisGO's Core

Portfolio personal con estética cyberpunk, efectos 3D interactivos e integración con Spotify.

**[Ver en vivo](https://crisgo0510.github.io/My-Webcore-Blog/)**

## Stack

- **Vue 3** + TypeScript + Composition API
- **Quasar Framework** — componentes UI
- **Three.js** — corazones 3D wireframe
- **SCSS** — estilos con variables cyberpunk
- **Pinia** — estado global persistente
- **vue-i18n** — español / inglés

## Secciones

- **Home** — hub de navegación con eye-tracker interactivo
- **About Me** — bio, herramientas, apps y workspace
- **Projects** — proyectos con estado (en proceso / finalizado / archivado)
- **Music** — playlists y canciones desde Spotify (datos estáticos generados por script)
- **Games** — juegos favoritos organizados por género

## Desarrollo

```bash
npm install
npm run dev
```

## Spotify

Los datos de música se generan con un script que conecta con la API de Spotify:

```bash
# Configurar .env con SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
npx tsx scripts/fetch-spotify.ts
```

Un GitHub Action actualiza los datos automáticamente cada semana.

## Licencia

[MIT](./LICENSE)
