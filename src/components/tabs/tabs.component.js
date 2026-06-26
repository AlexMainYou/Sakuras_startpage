class Links extends Component {
  constructor() {
    super();
  }

  static getIcon(link) {
    const defaultColor = "#726f6f";

    return link.icon
      ? `<i class="ti ti-${link.icon} link-icon"
            style="color: ${link.icon_color ?? defaultColor}"></i>`
      : "";
  }

  static getAll(tabName, tabs) {
    const { categories } = tabs.find((f) => f.name === tabName);

    return `
      ${
      categories.map(({ name, links }) => {
        return `
          <li>
            <h1>${name}</h1>
              <div class="links-wrapper">
              ${
          links.map((link) => `
                  <div class="link-info">
                    <a href="${link.url}">
                      ${Links.getIcon(link)}
                      ${
            link.name ? `<p class="link-name">${link.name}</p>` : ""
          }
                    </a>
                </div>`).join("")
        }
            </div>
          </li>`;
      }).join("")
    }
    `;
  }
}

class Category extends Component {
  constructor() {
    super();
  }

  static getBackgroundStyle(url) {
    return `style="background-image: url(${url}); background-repeat: no-repeat;background-size: contain;"`;
  }

  static getAll(tabs) {
    return `
      ${
      tabs.map(({ name, background_url }, index) => {
        return `<ul class="${name}" ${
          Category.getBackgroundStyle(background_url)
        } ${index == 0 ? "active" : ""}>
            <div class="banner"></div>
            <div class="links">${Links.getAll(name, tabs)}</div>
          </ul>`;
      }).join("")
    }
    `;
  }
}

class Tabs extends Component {
  refs = {};

  constructor() {
    super();
    this.tabs = CONFIG.tabs;
  }

  imports() {
    return [
      this.resources.icons.material,
      this.resources.icons.tabler,
      this.resources.fonts.roboto,
      this.resources.fonts.raleway,
      this.resources.libs.awoo,
    ];
  }

  style() {
    return `
      status-bar {
          bottom: -70px;
          height: 32px;
          background: #282828;
          border-radius: 4px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, .25);
      }

      #panels, #panels ul,
      #panels .links {
          position: absolute;
      }

      .nav {
          color: #fff;
      }

      #panels {
          border-radius: 5px 0 0 5px;
          width: 90%;
          max-width: 1200px;
          height: 450px;
          right: 0;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
          background: #282828;
      }

      .categories {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          border-radius: 10px 0 0 10px;
          display: flex;
          flex-direction: column;
      }

      /* Контейнер для контента вкладок, чтобы он был ПОД поиском */
      .tabs-container {
          position: relative;
          width: 100%;
          height: calc(100% - 60px); /* Вычитаем высоту поиска */
          flex-grow: 1;
      }

      .categories ul {
          --panelbg: transparent;
          --flavour: var(--accent);
          width: 100%;
          height: 100%;
          right: 100%;
          background: #282828;
          transition: all .6s;
          position: absolute;
          top: 0;
      }

      .categories ul:nth-child(2) { --flavour: #e78a4e; }
      .categories ul:nth-child(3) { --flavour: #ea6962; }
      .categories ul:nth-child(4) { --flavour: #7daea3; }
      .categories ul:nth-child(5) { --flavour: #d3869b; }
      .categories ul:nth-child(6) { --flavour: #d3869b; }
      /* ... остальные цвета по желанию ... */

      .categories ul[active] {
          right: 0;
          z-index: 1;
      }

      .categories .links {
          right: 0;
          width: 70%;
          height: 100%;
          background: #282828;
          padding: 3% 5%; /* Чуть меньше отступ сверху */
          flex-wrap: wrap;
          overflow-y: auto; /* Добавляем скролл если ссылок много */
      }
      
      /* Скрываем скроллбар для красоты */
      .categories .links::-webkit-scrollbar { width: 0; }

      .categories .links li {
          list-style: none;
      }

      .categories ul .links a {
          color: #d4be98;
          text-decoration: none;
          font: 700 18px 'Roboto', sans-serif;
          transition: all .2s;
          display: inline-flex;
          align-items: center;
          padding: .4em .7em;
          background: #32302f;
          box-shadow: 0 4px rgba(50, 48, 47, 0.5), 0 5px 10px rgb(0 0 0 / 20%);
          border-radius: 2px;
          margin-bottom: .7em;
      }
      
      .categories .link-name {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
      }

      .categories .link-info {
          display: inline-flex;
      }

      .categories .link-info:not(:last-child) { margin-right: .5em; }

      .categories ul .links a:hover {
          transform: translate(0, 4px);
          box-shadow: 0 0 rgba(0, 0, 0, 0.25), 0 0 0 rgba(0, 0, 0, .5), 0 -0px 5px rgba(0, 0, 0, .1);
          color: var(--flavour);
      }

      .categories ul::after {
          content: attr(class);
          position: absolute;
          display: flex;
          text-transform: uppercase;
          overflow-wrap: break-word;
          width: 25px;
          padding: 1em;
          margin: auto;
          left: calc(5% - 42.5px);
          bottom: 0;
          top: 0;
          background: linear-gradient(to top, rgb(50 48 47 / 90%), transparent);
          color: var(--flavour);
          letter-spacing: 1px;
          font: 600 30px 'Montserrat', sans-serif;
          text-align: center;
          flex-wrap: wrap;
          word-break: break-all;
          align-items: center;
          backdrop-filter: blur(3px);
          -webkit-text-stroke: 7px black;
          paint-order: stroke fill;
      }

      .categories .links li:not(:last-child) {
          box-shadow: 0 1px 0 rgba(212, 190, 152, .25);
          padding: 0 0 .5em 0;
          margin-bottom: 1.5em;
      }

      .categories .links li h1 {
          color: #d4be98;
          opacity: 0.5;
          font-size: 13px;
          margin-bottom: 1em;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Montserrat', sans-serif;
      }

      .categories .link-icon {
          font-size: 27px;
          color: #726f6f;
      }

      .categories .link-icon + .link-name {
          margin-left: 10px;
      }

      .categories .links-wrapper {
          display: flex;
          flex-wrap: wrap;
      }

      /* Стили для кнопки Sakurast */
      .sakura-hub-btn {
          position: absolute;
          top: 0;
          right: -60px; /* Выносим вправо за пределы основного блока */
          width: 50px;
          height: 50px;
          background: #32302f;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
          transition: all .2s;
          text-decoration: none;
          border: 1px solid transparent;
      }

      .sakura-hub-btn:hover {
          background: #282828;
          border-color: #a9b665;
          transform: translateY(2px);
      }

      .sakura-hub-btn i {
          color: #a9b665; /* Цвет иконки */
          font-size: 25px;
      }

      .ti {
          animation: fadeInAnimation ease .5s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
      }

      @keyframes fadeInAnimation {
          0% { opacity: 0; }
          100% { opacity: 1; }
      }
    `;
  }

  template() {
    return `
      <div id="links" class="-">
        <div id="panels">
          
          <!-- Кнопка Hub вынесена из categories, но привязана к panels -->
          <a href="https://sakurast.ru" class="sakura-hub-btn" title="Sakurast Hub">
             <i class="ti ti-cherry-filled"></i> <!-- Иконка вишни, подходит под Sakura -->
          </a>

          <div class="categories">
            <!-- Поиск теперь внутри потока, сверху -->
            <search-bar></search-bar>
            
            <!-- Контейнер для вкладок -->
            <div class="tabs-container">
                ${Category.getAll(this.tabs)}
            </div>
            
            <config-tab></config-tab>
          </div>
          <status-bar class="!-"></status-bar>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}