let saved_config = JSON.parse(localStorage.getItem("CONFIG"));

const default_config = {
  overrideStorage: true,
  temperature: {
    location: 'Izhevsk, Russia',
    scale: "C",
  },
  clock: {
    format: "h:i p",
    iconColor: "#ea6962",
  },
  search: {
    engines: {
      g: ["https://yandex.ru/search/?text=", "Yandex"],
      d: ["https://duckduckgo.com/html?q=", "DuckDuckGo"],
      y: ["https://youtube.com/results?search_query=", "Youtube"],
      r: ["https://www.reddit.com/search/?q=", "Reddit"],
      p: ["https://www.pinterest.es/search/pins/?q=", "Pinterest"],
    },
  },
  keybindings: {
    "s": "search-bar",
    "ы": "search-bar",
    "q": "config-tab",
  },
  disabled: [],
  localIcons: false,
  fastlink: "https://openrouter.ai/",
  openLastVisitedTab: true,
  tabs: [
    {
      name: "Дом", // ИЗМЕНЕНО
      background_url: "src/img/banners/ost1.png",
      categories: [{
        name: "Связь", // НОВАЯ ГРУППИРОВКА
        links: [
          {
            name: "vk",
            url: "https://vk.com/im",
            icon: "brand-vk",
            icon_color: "#7daea3",
          },
          {
            name: "youtube",
            url: "https://youtube.com/",
            icon: "brand-youtube",
            icon_color: "#ea6962",
          },
          {
            name: "gmail",
            url: "https://mail.google.com/mail/u/0/",
            icon: "brand-gmail",
            icon_color: "#ea6962",
          },
          {
            name: "mail.ru",
            url: "https://mail.ru/",
            icon: "mail-filled",
            icon_color: "#7daea3",
          },
          {
            name: "yandex mail",
            url: "https://mail.yandex.ru/",
            icon: "brand-yandex",
            icon_color: "#e78a4e",
          },
        ],
      }, {
        name: "Сервисы", // НОВАЯ ГРУППИРОВКА
        links: [
          {
            name: "ozon",
            url: "https://www.ozon.ru/",
            icon: "package",
            icon_color: "#7daea3",
          },
          {
            name: "aliexpress",
            url: "https://aliexpress.ru/",
            icon: "building-store",
            icon_color: "#e78a4e",
          },
          {
            name: "авито",
            url: "https://www.avito.ru/",
            icon: "shopping-cart",
            icon_color: "#a9b665",
          },
          {
            name: "drive",
            url: "https://drive.google.com/drive/u/0/my-drive",
            icon: "brand-google-drive",
            icon_color: "#e78a4e",
          },
          {
            name: "weather",
            url: "https://yandex.ru/pogoda/ru/izhevsk",
            icon: "cloud",
            icon_color: "#7daea3",
          },
          {
            name: "gosuslugi",
            url: "https://esia.gosuslugi.ru",
            icon: "id",
            icon_color: "#ea6962",
          },
          {
            name: "yandex music",
            url: "https://music.yandex.ru/collection",
            icon: "music",
            icon_color: "#d3869b",
          },
          {
            name: "tbank",
            url: "https://www.tbank.ru/mybank/",
            icon: "building-bank",
            icon_color: "#d3869b",
          },
        ],
      }],
    },
    {
      name: "tools", // ИЗМЕНЕНО
      background_url: "src/img/banners/ost2.png",
      categories: [
        {
          name: "AI Чаты",
          links: [
            {
              name: "openrouter",
              url: "https://openrouter.ai/",
              icon: "robot",
              icon_color: "#89b482",
            },
            {
              name: "qwen",
              url: "https://chat.qwen.ai/",
              icon: "message-chatbot",
              icon_color: "#7daea3",
            },
            {
              name: "lm arena",
              url: "https://arena.ai/",
              icon: "sword",
              icon_color: "#ea6962",
            },
          ],
        },
        {
          name: "Инструменты",
          links: [
            {
              name: "переводчик",
              url: "https://translate.yandex.ru/",
              icon: "language",
              icon_color: "#a9b665",
            },
            {
              name: "cobalt",
              url: "https://cobalt.tools/",
              icon: "tool",
              icon_color: "##e78a4e",
            },
            {
              name: "uprograms", // ИЗМЕНЕНО
              url: "https://utorrentsoft.ru/",
              icon: "download",
              icon_color: "#7daea3",
            },
            {
              name: "github",
              url: "https://github.com/",
              icon: "brand-github",
              icon_color: "#d3869b",
            },
            {
              name: "proxys",
              url: "https://proxys.io/",
              icon: "shield",
              icon_color: "#89b482",
            },
          ],
        },
      ],
    },
    {
      name: "Разное",
      background_url: "src/img/banners/ost3.png",
      categories: [
        {
          name: "Прочее",
          links: [
            {
              name: "0xcheats",
              url: "https://0xcheats.net",
              icon: "ghost-2",
              icon_color: "#d3869b",
            },
            {
              name: "eshe pizza",
              url: "https://eshe.pizza/izhevsk",
              icon: "pizza",
              icon_color: "#e78a4e",
            },
            {
              name: "telegram",
              url: "https://web.telegram.org/k/",
              icon: "brand-telegram",
              icon_color: "#7daea3",
            },
            {
              name: "vtb",
              url: "https://online.vtb.ru/",
              icon: "building-bank",
              icon_color: "#89b482",
            },
            {
              name: "sheets",
              url: "https://docs.google.com/spreadsheets",
              icon: "file-spreadsheet",
              icon_color: "#89b482",
            },
          ],
        },
      ],
    },
  ],
};

const CONFIG = new Config(saved_config ?? default_config);
// const CONFIG = new Config(default_config);

(function() {
  var css = document.createElement('link');
  css.href = 'src/css/tabler-icons.min.css';
  css.rel = 'stylesheet';
  css.type = 'text/css';
  if (!CONFIG.config.localIcons)
    document.getElementsByTagName('head')[0].appendChild(css);
})();
