<div align="center">
    <img src="src/img/favico.svg" width="220" alt="Sakura startpage logo"><br>
    <a href="https://github.com/AlexMainYou/Sakuras_startpage/stargazers">
        <img src="https://img.shields.io/github/stars/AlexMainYou/Sakuras_startpage?color=a9b665&style=for-the-badge&logo=starship" alt="GitHub stars">
    </a>
    <a href="https://github.com/AlexMainYou/Sakuras_startpage/issues">
        <img src="https://img.shields.io/github/issues/AlexMainYou/Sakuras_startpage?color=ea6962&style=for-the-badge&logo=codecov" alt="GitHub issues">
    </a>
    <a href="https://github.com/AlexMainYou/Sakuras_startpage/network/members">
        <img src="https://img.shields.io/github/forks/AlexMainYou/Sakuras_startpage?color=7daea3&style=for-the-badge&logo=jfrog-bintray" alt="GitHub forks">
    </a>
    <a href="https://github.com/AlexMainYou/Sakuras_startpage/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-orange.svg?color=d4be98&style=for-the-badge&logo=archlinux" alt="MIT license">
    </a>
</div>

# Sakuras Startpage

Персональная стартовая страница для браузера: компактная панель с вкладками, постерами, быстрыми ссылками, поиском, часами и погодой. Проект основан на [tartarus-startpage](https://github.com/AllJavi/tartarus-startpage), но адаптирован под личный набор сервисов, русскую раскладку и локальный запуск на Windows.

## Превью

https://github.com/user-attachments/assets/0b875261-403e-4f26-b527-d68e3d111974

## Что внутри

- Три вкладки с постерами и группами ссылок: дом, инструменты и прочее.
- Быстрый поиск через Yandex по умолчанию, с запуском по Enter или кнопкой мышью.
- Поиск закреплен над правой областью плиток и не уезжает при переключении вкладок.
- Локальные баннеры в `src/img/banners`.
- Иконки Tabler Icons и Material Icons.
- Погода для Ижевска.
- Конфиг ссылок и поведения в `userconfig.js`.

## Быстрый запуск

```powershell
python webserver.py
```

После запуска открой:

```text
http://127.0.0.1:1111/
```

На Windows можно использовать `webserver_starter.bat` и добавить ярлык на него в автозагрузку, чтобы страница поднималась после входа в систему.

## Настройка браузера

Для Firefox удобно использовать расширение `New Tab Override`:

1. Запусти локальный сервер через `webserver.py` или `webserver_starter.bat`.
2. Установи `New Tab Override`.
3. Укажи URL новой вкладки: `http://127.0.0.1:1111/`.
4. При необходимости добавь папку `php` в `PATH`, если используешь старый PHP-способ запуска.

## Конфигурация

Основной файл настроек: `userconfig.js`.

В нем меняются:

- `temperature.location` и `temperature.scale` для погоды.
- `clock.format` и `clock.iconColor` для часов.
- `search.engines` для поисковых систем.
- `keybindings` для горячих клавиш.
- `fastlink` для быстрой ссылки.
- `localIcons`, если нужно использовать локальный набор иконок.
- `tabs`, `categories` и `links` для вкладок, групп и плиток.

Пример ссылки:

```js
{
  name: "github",
  url: "https://github.com/",
  icon: "brand-github",
  icon_color: "#d3869b",
}
```

## Поиск

Поиск находится над правой областью плиток. Он не является частью анимируемой вкладки, поэтому при переключении постеров остается на месте.

По умолчанию используется первый движок из `CONFIG.search.engines`:

```js
g: ["https://yandex.ru/search/?text=", "Yandex"]
```

Запустить поиск можно двумя способами:

- нажать `Enter`;
- нажать кнопку с иконкой поиска.

## Горячие клавиши

| Клавиша | Действие |
| --- | --- |
| Цифры, колесо мыши, клик | Переключение вкладок |
| `s` или `ы` | Фокус на поиске |
| `q` | Открыть конфигурацию |
| `Esc` | Закрыть диалог |

## Структура проекта

```text
.
├── index.html
├── userconfig.js
├── webserver.py
├── webserver_starter.bat
├── src/
│   ├── components/
│   │   ├── search/
│   │   ├── tabs/
│   │   ├── clock/
│   │   ├── weather/
│   │   └── statusbar/
│   ├── css/
│   ├── fonts/
│   └── img/
└── php/
```

## Баннеры

Баннеры лежат в `src/img/banners`:

- `ost1.png`
- `ost2.png`
- `ost2-.png`
- `ost3.png`

Чтобы заменить фон вкладки, поменяй `background_url` в `userconfig.js`.

## Благодарности

- Основа проекта: [Tartarus Startpage by AllJavi](https://github.com/AllJavi/tartarus-startpage)
- Оригинальная идея: [Dawn Startpage by b-coimbra](https://github.com/b-coimbra/dawn)

## Лицензия

[MIT License](./LICENSE)
