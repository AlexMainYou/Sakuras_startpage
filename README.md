<div align="center">
    <img src="src/img/favico.svg" width="300"/><br/>
    <a href="https://github.com/AlexMainYou/Sakuras_startpage/stargazers">
        <img src="https://img.shields.io/github/stars/AlexMainYou/Sakuras_startpage?color=a9b665&style=for-the-badge&logo=starship">
    </a>
    <a href="https://github.com/AlexMainYou/Sakuras_startpage/issues">
        <img src="https://img.shields.io/github/issues/AlexMainYou/Sakuras_startpage?color=ea6962&style=for-the-badge&logo=codecov">
    </a>
    <a href="https://github.com/AlexMainYou/Sakuras_startpage/network/members">
        <img src="https://img.shields.io/github/forks/AlexMainYou/Sakuras_startpage?color=7daea3&style=for-the-badge&logo=jfrog-bintray">
    </a>
    <a href="https://github.com/AlexMainYou/Sakuras_startpage/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-orange.svg?color=d4be98&style=for-the-badge&logo=archlinux">
    </a>
</div>


## 💻 Превью

-------------------------------------------------видиопре

Это моя кастомная версия стартовой страницы, основанная на репозитории [tartarus-startpage от AllJavi](https://github.com/AllJavi/tartarus-startpage). Я адаптировал стиль, русифицировал категории, изменил некоторые стандартные ссылки на более актуальные для себя и добавил новые фоновые изображения.

## ⌨️ Горячие клавиши
| Горячая клавиша                                              | Действие             |
| ------------------------------------------------------------ | -------------------- |
| <kbd>Цифры</kbd> \| <kbd>Колесо мыши</kbd> \| <kbd>Клик</kbd> | Переключение вкладок |
| <kbd>s</kbd> или <kbd>ы</kbd>                                | Диалог поиска        |
| <kbd>q</kbd>                                                 | Диалог конфигурации  |
| <kbd>Esc</kbd>                                               | Закрыть диалоги      |

## ⚙️ Диалог конфигурации
-------------------------------конигур

Файл конфигурации по умолчанию — `userconfig.js`. Вы можете изменить его в диалоге конфигурации. Доступные компоненты: вкладки, часы и погода. Также есть две новые опции:
- `fastlink`: для установки ссылки на кнопку с покеболом.
- `localIcons`: для оптимизации времени загрузки иконок.

## 🔍 Диалог поиска
-----------------------диадада

Диалог поиска позволяет отображать строку поиска с различными поисковыми системами, определенными в конфигурации. Чтобы выбрать каждую из них, просто добавьте префикс `!<id>` к вашему запросу.
По умолчанию определены следующие поисковые системы:
- `!g`: Yandex
- `!d`: DuckDuckGo
- `!y`: Youtube
- `!r`: Reddit
- `!p`: Pinterest

## 🖼 Доступные баннеры







## Локальные иконки

Если вы хотите уменьшить время загрузки, вы можете установить [шрифт с иконками](src/fonts) локально и активировать опцию `"localIcons": true` в конфигурации, чтобы отключить загрузку стилей из интернета.

## Благодарности
- Основа проекта: [Tartarus Startpage by AllJavi](https://github.com/AllJavi/tartarus-startpage)
- Оригинальный проект: [Dawn Startpage by b-coimbra](https://github.com/b-coimbra/dawn) ([превью](https://startpage.metaphoric.dev/))

## Лицензия
[MIT License](./LICENSE)
