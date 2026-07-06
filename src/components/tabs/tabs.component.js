class Links extends Component {
  constructor() {
    super();
  }

  static getIcon(link) {
    const defaultColor = "#f5f7ff";

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

  static getAll(tabs) {
    return `
      ${
      tabs.map(({ name }, index) => {
        return `<ul class="${name}" ${index == 0 ? "active" : ""}>
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
      :host {
          display: block;
          width: 100%;
          height: 100%;
      }

      .page-shader {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: #000;
          pointer-events: none;
      }

      .page-shader::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: transparent;
      }

      .page-shader::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background: transparent;
      }

      .page-shader canvas,
      .panel-shader canvas {
          position: absolute !important;
          inset: 0 !important;
          z-index: 1 !important;
          display: block;
          width: 100% !important;
          height: 100% !important;
          border-radius: inherit;
      }

      #links {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          padding: 32px;
      }

      status-bar {
          position: absolute;
          right: 0;
          bottom: 24px;
          left: 0;
          width: min(500px, calc(100% - 48px));
          height: 48px;
          margin: 0 auto;
          z-index: 4;
      }

      #panels,
      #panels ul,
      #panels .links {
          position: absolute;
      }

      #panels {
          width: clamp(836px, calc(60vw + 76px), 976px);
          height: clamp(431px, calc(60vh + 1px), 541px);
          border-radius: 28px;
          overflow: visible;
          isolation: isolate;
      }

      .panel-shader {
          position: absolute;
          inset: -92px;
          z-index: 2;
          overflow: hidden;
          border-radius: 80px;
          background: transparent;
          filter: saturate(1.25);
          mix-blend-mode: screen;
          opacity: 1;
          pointer-events: none;
      }

      .panel-shader::after {
          content: "";
          position: absolute;
          inset: 90px;
          z-index: 2;
          pointer-events: none;
          border-radius: 30px;
          box-shadow: none;
      }

      .panel-shader::before {
          content: "";
          position: absolute;
          inset: 92px;
          z-index: 2;
          pointer-events: none;
          border-radius: 28px;
          background: #000;
      }

      .panel-core {
          position: absolute;
          inset: 3.5px;
          z-index: 3;
          overflow: hidden;
          border: 1px solid var(--card-border-fallback);
          border-radius: 28px;
          background: var(--card-glass);
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
      }

      .panel-core::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: transparent;
      }

      .panel-core > .categories {
          position: relative;
          z-index: 4;
      }

      .panel-core > status-bar {
          z-index: 5;
      }

      .categories {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          border-radius: 28px;
      }

      .tabs-container {
          position: relative;
          width: 100%;
          height: 100%;
      }

      .categories ul {
          --flavour: var(--accent);
          width: 100%;
          height: 100%;
          right: 100%;
          top: 0;
          background: transparent;
          opacity: 0;
          transition: right .5s cubic-bezier(.2, .8, .2, 1), opacity .35s ease;
      }

      .categories ul:nth-child(2) { --flavour: #f06bff; }
      .categories ul:nth-child(3) { --flavour: #eeff38; }
      .categories ul:nth-child(4) { --flavour: #ff1500; }

      .categories ul[active] {
          right: 0;
          z-index: 1;
          opacity: 1;
      }

      .categories .links {
          inset: 104px 32px 96px;
          width: auto;
          height: auto;
          box-sizing: border-box;
          padding: 0 6px 8px;
          flex-wrap: wrap;
          overflow-y: auto;
      }

      .categories > search-bar {
          display: block;
          position: absolute;
          top: 32px;
          right: 32px;
          left: 32px;
          width: auto;
          z-index: 3;
      }

      .categories .links::-webkit-scrollbar {
          width: 0;
      }

      .categories .links li {
          list-style: none;
      }

      .categories ul .links a {
          color: var(--text-primary);
          text-decoration: none;
          font: 700 15px 'Roboto', sans-serif;
          transition: transform .2s cubic-bezier(.16, 1, .3, 1), border-color .25s ease, background .25s ease, color .25s ease, box-shadow .25s ease;
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          padding: 0 14px;
          background: var(--btn-bg);
          border: 1px solid var(--btn-border);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          margin-bottom: 10px;
      }

      .categories .link-name {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
      }

      .categories .link-info {
          display: inline-flex;
      }

      .categories .link-info:not(:last-child) {
          margin-right: 10px;
      }

      .categories ul .links a:hover {
          transform: translateY(-2px);
          background: var(--btn-bg-hover);
          border-color: var(--btn-border-hover);
          color: var(--flavour);
          box-shadow:
              0 10px 28px rgba(0, 0, 0, 0.22),
              0 0 20px color-mix(in srgb, var(--flavour), transparent 78%),
              inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }

      .categories .links li:not(:last-child) {
          padding: 0 0 18px 0;
          margin-bottom: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .categories .links li h1 {
          color: var(--text-muted);
          font-size: 12px;
          margin-bottom: 12px;
          font-weight: 600;
          letter-spacing: 0;
          text-transform: uppercase;
          font-family: 'Montserrat', sans-serif;
      }

      .categories .link-icon {
          font-size: 22px;
          color: #f5f7ff;
      }

      .categories .link-icon + .link-name {
          margin-left: 10px;
      }

      .categories .links-wrapper {
          display: flex;
          flex-wrap: wrap;
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

      @media (max-width: 760px) {
          #links {
              padding: 18px;
          }

          #panels {
              width: 90vw;
              height: 75vh;
              min-height: 520px;
          }

          .categories .links {
              inset: 88px 20px 92px;
          }

          .categories > search-bar {
              top: 20px;
              left: 20px;
              right: 20px;
          }

          status-bar {
              left: 16px;
              right: 16px;
          }
      }
    `;
  }

  template() {
    return `
      <div class="page-shader" data-paper-shader="page"></div>
      <div id="links" class="-">
        <div id="panels">
          <div class="panel-shader" data-paper-shader="panel"></div>

          <div class="panel-core">
            <div class="categories">
              <search-bar></search-bar>

              <div class="tabs-container">
                ${Category.getAll(this.tabs)}
              </div>

              <config-tab></config-tab>
            </div>
            <status-bar class="!-"></status-bar>
          </div>
        </div>
      </div>
    `;
  }

  setTabClickFallback() {
    this.addEventListener("click", (event) => {
      const status = this.shadow.querySelector("status-bar");
      const statusRoot = status?.shadowRoot;
      const buttons = statusRoot?.querySelectorAll("#tabs ul li[tab-index]");

      if (!buttons?.length) return;

      for (const button of buttons) {
        const key = Number(button.getAttribute("tab-index"));
        if (!Number.isInteger(key) || key >= this.tabs.length) continue;

        const rect = button.getBoundingClientRect();
        const inside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;

        if (inside) {
          status.activateByKey(key);
          break;
        }
      }
    });
  }

  connectedCallback() {
    this.render().then(() => this.setTabClickFallback());
  }
}
