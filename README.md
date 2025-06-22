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

https://github.com/user-attachments/assets/0b875261-403e-4f26-b527-d68e3d111974

Это моя кастомная версия стартовой страницы, основанная на репозитории [tartarus-startpage от AllJavi](https://github.com/AllJavi/tartarus-startpage). Я адаптировал стиль, русифицировал категории, изменил некоторые стандартные ссылки на более актуальные для себя и добавил новые фоновые изображения.

## ⌨️ Горячие клавиши
| Горячая клавиша                                              | Действие             |
| ------------------------------------------------------------ | -------------------- |
| <kbd>Цифры</kbd> \| <kbd>Колесо мыши</kbd> \| <kbd>Клик</kbd> | Переключение вкладок |
| <kbd>s</kbd> или <kbd>ы</kbd>                                | Диалог поиска        |
| <kbd>q</kbd>                                                 | Диалог конфигурации  |
| <kbd>Esc</kbd>                                               | Закрыть диалоги      |

## ⚙️ Настройка Firefox
1. закинуть в автозагрузку webserver_starter.bat (только ярлык старта) и в первый раз запустить файл, тк автозапуск только при входе в систему
2. Подключите разширение "New Tab Override"
3. Там вставьте "http://127.0.0.1:9990/"
4. В path добавить папку "php"

## ⚙️ Диалог конфигурации

![firefox_axpy9RnarK](https://github.com/user-attachments/assets/d4698078-16b5-4bb2-aefe-9c072382241a)


Файл конфигурации по умолчанию — `userconfig.js`. Вы можете изменить его в диалоге конфигурации. Доступные компоненты: вкладки, часы и погода. Также есть две новые опции:
- `fastlink`: для установки ссылки на кнопку с покеболом.
- `localIcons`: для оптимизации времени загрузки иконок.

## 🔍 Диалог поиска

![firefox_FscJM1oc2D](https://github.com/user-attachments/assets/06f620b1-4015-431c-92d4-3cb71d8052e9)

Диалог поиска позволяет отображать строку поиска с различными поисковыми системами, определенными в конфигурации. Чтобы выбрать каждую из них, просто добавьте префикс `!<id>` к вашему запросу.
По умолчанию определены следующие поисковые системы:
- `!g`: Yandex
- `!d`: DuckDuckGo
- `!y`: Youtube
- `!r`: Reddit
- `!p`: Pinterest

## 🖼 Доступные баннеры

![ost3](https://github.com/user-attachments/assets/d2aa9a16-9c2b-49ec-8abd-f1e50d5a5609)
![ost2-](https://github.com/user-attachments/assets/88e267a5-a838-488a-8b03-7268611cb475)
![ost2](https://github.com/user-attachments/assets/a77da565-0c06-4d50-b003-30e1a2f4bea4)
![ost1](https://github.com/user-attachments/assets/8cf622b6-d2a1-4872-b966-bf348c5469aa)

## Локальные иконки

Если вы хотите уменьшить время загрузки, вы можете установить [шрифт с иконками](src/fonts) локально и активировать опцию `"localIcons": true` в конфигурации, чтобы отключить загрузку стилей из интернета.

## Благодарности
- Основа проекта: [Tartarus Startpage by AllJavi](https://github.com/AllJavi/tartarus-startpage)
- Оригинальный проект: [Dawn Startpage by b-coimbra](https://github.com/b-coimbra/dawn) ([превью](https://startpage.metaphoric.dev/))

## Лицензия
[MIT License](./LICENSE)
