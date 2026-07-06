# Sakuras Startpage

Персональная стартовая страница для браузера: одна центральная карточка с тремя вкладками сервисов, поиском, температурой и светящейся обводкой на базе Paper Design Shaders.

Проект вырос из [tartarus-startpage](https://github.com/AllJavi/tartarus-startpage), но сейчас заточен под локальный запуск на Windows и личный набор ссылок.

## Что внутри

- Центральная карточка с тремя вкладками и группами ссылок.
- Живой `PulsingBorder` из `paper-design/shaders`, подключенный локально из `src/vendor/paper-shaders`.
- Темная прозрачная карточка поверх внешнего цветного свечения.
- Поиск через Yandex по умолчанию.
- Подсказки поисковых запросов из Yandex Suggest во время ввода.
- Нижняя панель с переключателем вкладок, кнопкой `SAKURAST` и температурой.
- Конфигурация ссылок, вкладок и горячих клавиш в `userconfig.js`.
- Локальный приватный оверлей через `localconfig.js`, который не попадает в git.

## Быстрый запуск

```powershell
python webserver.py
```

Открой:

```text
http://127.0.0.1:1111/
```

На Windows можно запускать `webserver_starter.bat` и добавить ярлык в автозагрузку, чтобы стартовая страница поднималась вместе с системой.

## Важно про поиск

Подсказки работают через локальный endpoint:

```text
/api/suggest?q=текст
```

Браузер не обращается к Yandex Suggest напрямую. `webserver.py` делает серверный запрос к `https://suggest.yandex.ru/suggest-ff.cgi`, возвращает чистый JSON и тем самым обходит браузерные ограничения на прямой JSONP/CORS-запрос.

Если открыть `index.html` как файл без локального сервера, сама страница может отрисоваться, но поисковые подсказки работать не будут.

## Paper shader

Основной фон-обводка находится в `src/common/paper-shader.js`.

Текущие настройки:

```js
colors: ["#0dd9fd", "#f06bff", "#ff1500cc", "#eeff38"]
colorBack: "#000000"
roundness: 0.25
thickness: 0.22
softness: 1
intensity: 1
bloom: 0.66
spots: 4
pulse: 0.53
smoke: 0.53
smokeSize: 0.61
speed: 0.14
scale: 0.6
```

Шейдер монтируется на элемент карточки после загрузки web components. Если WebGL или модуль шейдера не поднимется, страница покажет диагностическое сообщение внизу экрана.

## Конфигурация

Основной публичный конфиг:

```text
userconfig.js
```

В нем меняются:

- `temperature.location` и `temperature.scale`;
- `search.engines`;
- `keybindings`;
- `tabs`, `categories` и `links`;
- локальные иконки и настройки поведения страницы.

Приватный локальный конфиг:

```text
localconfig.js
```

Этот файл указан в `.gitignore`. Используй его для личных ссылок, URL и настроек, которые не должны попадать в публичный репозиторий.

## Горячие клавиши

| Клавиша | Действие |
| --- | --- |
| `s` или `ы` | Фокус на поиске |
| `q` | Открыть конфигурацию |
| Цифры, колесо мыши, клик | Переключение вкладок |
| `Esc` | Закрыть диалог или подсказки поиска |

## Структура проекта

```text
.
├── index.html
├── userconfig.js
├── localconfig.js          # локальный файл, игнорируется git
├── webserver.py            # локальный сервер и proxy для suggest
├── webserver_starter.bat
├── src/
│   ├── common/
│   │   └── paper-shader.js
│   ├── components/
│   │   ├── search/
│   │   ├── statusbar/
│   │   ├── tabs/
│   │   └── weather/
│   ├── css/
│   ├── fonts/
│   ├── img/
│   └── vendor/
│       └── paper-shaders/
└── php/
```

## Проверка перед коммитом

```powershell
python -m py_compile webserver.py
node --check src/components/search/search.component.js
node --check src/components/statusbar/statusbar.component.js
node --check src/components/tabs/tabs.component.js
```

Если `node` не установлен в системном `PATH`, можно использовать bundled Node из Codex runtime или другой локальный Node.js.

## Благодарности

- [Paper Design Shaders](https://github.com/paper-design/shaders) за `PulsingBorder`.
- [Tartarus Startpage](https://github.com/AllJavi/tartarus-startpage) за исходную основу.
- [Dawn Startpage](https://github.com/b-coimbra/dawn) за первоначальную идею.

## Лицензия

[MIT License](./LICENSE)
