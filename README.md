# Тёплый сад

Стартовый проект сайта психолога на Next.js, TypeScript и Tailwind CSS. Главная страница проверяет статический экспорт, адаптивные стили и подключение кнопки shadcn/ui.

## Локальная разработка

Используйте Node.js 24 и npm. Версия Node.js, на которой проверена сборка, указана в `.nvmrc`.

```sh
npm ci --ignore-scripts
npm run dev
```

Откройте `http://localhost:3000`.

```sh
npm run typecheck
npm run build
```

Next.js складывает готовый сайт в `out/`. Для раздачи этого каталога достаточно статического веб-сервера. Изображения следует оптимизировать до включения в проект, поскольку экспорт отключает встроенный оптимизатор Next.js.

## Timeweb Cloud

Для App Platform выберите тип Frontend и фреймворк Next.js. Оставьте поддержку SSR выключенной, корень проекта — корнем репозитория. Для установки зависимостей используйте `npm ci --ignore-scripts`, для сборки — `npm run build`. Если панель предлагает единое поле команды, укажите `npm ci --ignore-scripts && npm run build`. Директория сборки — `out`. Для окружения сборки выберите Node.js 24. [Инструкция Timeweb](https://timeweb.cloud/docs/apps/deploying-frontend-apps)

## Инструменты дизайна

- shadcn/ui настроен вручную через `components.json`, CSS-переменные в `src/app/globals.css` и алиас `@/`. Исходник кнопки находится в `src/components/ui/button.tsx`. [Ручная настройка shadcn/ui](https://ui.shadcn.com/docs/installation/manual)
- Motion Primitives и React Bits подключаются по одному компоненту после выбора конкретного сценария. Перед добавлением проверьте исходник, его зависимости и поведение при `prefers-reduced-motion`. [Motion Primitives](https://motion-primitives.com/docs/installation) · [React Bits](https://reactbits.dev/get-started/installation)
- Codex загружает навыки из `.agents/skills/`. Источники и ревизии записаны в `skills-lock.json`. UI UX Pro Max использует локальный Python 3 для поиска по каталогу. [Документация Codex](https://learn.chatgpt.com/docs/build-skills)
- Spline MCP доступен в виде плагина Codex или через `https://mcp.spline.design/mcp` с OAuth. Подключение понадобится для редактирования 3D-сцены. Для самой страницы достаточно выбранного способа экспорта сцены и статичной иллюстрации для мобильных устройств и режима уменьшенного движения. [Spline MCP](https://docs.spline.design/generate/spline-mcp-server)
- 21st MCP поддерживает Codex через плагин или HTTP с API-ключом. Подключение отложено до согласования. [21st MCP](https://github.com/21st-dev/magic-mcp)
