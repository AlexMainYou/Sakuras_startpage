class Statusbar extends Component {
  externalRefs = {};

  refs = {
    categories: ".categories ul",
    tabs: "#tabs ul li",
    indicator: ".indicator",
    brandLink: ".brand-link",
  };

  currentTabIndex = 0;

  constructor() {
    super();

    this.setDependencies();
  }

  setDependencies() {
    this.externalRefs = {
      categories: this.parentNode.querySelectorAll(this.refs.categories),
    };
  }

  imports() {
    return [
      this.resources.fonts.roboto,
      this.resources.icons.material,
      this.resources.libs.awoo,
    ];
  }

  style() {
    return `
      *:not(:defined) {
          display: none;
      }

      #tabs {
          width: 100%;
          height: 100%;
          border: 1px solid var(--bottom-bar-border);
          border-radius: 999px;
          background: var(--bottom-bar-bg);
          box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.08),
              0 10px 30px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
      }

      #tabs > cols {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto auto;
          align-items: center;
          height: 100%;
          gap: 12px;
          padding: 0 20px;
      }

      #tabs ul {
          display: flex;
          align-items: center;
          gap: 16px;
          height: 100%;
          min-width: 0;
          list-style: none;
          position: relative;
      }

      #tabs ul li:not(:last-child) {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 36px;
          border: 0;
          border-radius: 0;
          color: var(--text-muted);
          background: transparent;
          font: 700 14px 'Roboto', sans-serif;
          cursor: pointer;
          position: relative;
          transition: color .2s ease, transform .2s ease;
      }

      #tabs ul li button {
          width: 100%;
          height: 100%;
          border: 0;
          border-radius: inherit;
          background: transparent;
          color: inherit;
          font: inherit;
          cursor: pointer;
      }

      #tabs ul li:not(:last-child):hover {
          color: var(--text-primary);
          transform: translateY(-1px);
      }

      #tabs ul li[active]:not(:last-child) {
          color: var(--text-primary);
      }

      #tabs ul li[active]:not(:last-child)::after {
          content: none;
      }

      .tab-underline {
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 0;
          height: 2px;
          border-radius: 999px;
          background: var(--active-tab-indicator);
          box-shadow: 0 0 8px var(--active-tab-indicator), 0 0 18px var(--active-tab-indicator);
          transform: translateX(0);
          transition:
              transform .46s cubic-bezier(.13, 1.12, .24, 1),
              width .46s cubic-bezier(.13, 1.12, .24, 1);
          pointer-events: none;
          will-change: transform, width;
      }

      #tabs ul li:last-child {
          display: none;
      }

      .widgets {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 100%;
          color: #fff;
          transform: translateX(13px);
      }

      .brand-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          top: 3px;
          height: 36px;
          padding: 0 8px;
          border: 0;
          background: transparent;
          color: var(--text-primary);
          font: 700 12px 'Roboto', sans-serif;
          letter-spacing: 0;
          cursor: pointer;
          opacity: 0.86;
          transition: opacity .2s ease, color .2s ease, transform .2s ease;
      }

      .brand-link:hover {
          color: var(--active-tab-indicator);
          opacity: 1;
          transform: translateY(-1px);
      }

      .widget {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          min-width: 64px;
          padding: 0 16px;
          border: 1px solid var(--btn-border);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.03);
      }

      @media (max-width: 520px) {
          #tabs > cols {
              gap: 8px;
              padding-left: 8px;
          }

          #tabs ul {
              gap: 6px;
          }

          #tabs ul li:not(:last-child) {
              width: 34px;
              height: 34px;
          }

          .widget {
              min-width: 58px;
              padding: 0 12px;
          }

          .brand-link {
              padding: 0 4px;
              font-size: 11px;
          }
      }
    `;
  }

  template() {
    return `
        <div id="tabs">
            <cols>
                <ul class="- indicator"></ul>
                <button class="brand-link" type="button">SAKURAST</button>
                <div class="+ widgets col-end">
                    <weather-forecast class="+ widget weather"></weather-forecast>
                </div>
            </cols>
        </div>`;
  }

  setEvents() {
    this.refs.indicator.addEventListener("click", ({ target }) => this.handleTabChange(target));
    this.refs.brandLink.addEventListener("click", () => this.openPrivateButton());

    document.onkeydown = (e) => this.handleKeyPress(e);
    document.onwheel = (e) => this.handleWheelScroll(e);

    if (CONFIG.openLastVisitedTab) {
      window.onbeforeunload = () => this.saveCurrentTab();
    }
  }

  openPrivateButton() {
    const url = window.LOCAL_CONFIG?.privateButton?.url;

    if (url) window.location.href = url;
  }

  saveCurrentTab() {
    localStorage.lastVisitedTab = this.currentTabIndex;
  }

  openLastVisitedTab() {
    if (!CONFIG.openLastVisitedTab) return;
    const key = Number(localStorage.lastVisitedTab);

    if (Number.isInteger(key)) {
      this.activateByKey(key);
    }
  }

  handleTabChange(tab) {
    const item = tab.closest?.("li") ?? tab;
    if (!item || item === this.refs.indicator) return;

    this.activateByKey(Number(item.getAttribute("tab-index")));
  }

  handleWheelScroll(event) {
    if (!event) return;

    let { target, wheelDelta } = event;

    if (target.shadow && target.shadow.activeElement) return;

    let activeTab = -1;
    this.refs.tabs.forEach((tab, index) => {
      if (tab.getAttribute("active") === "") {
        activeTab = index;
      }
    });

    if (wheelDelta > 0) {
      this.activateByKey((activeTab + 1) % (this.refs.tabs.length - 1));
    } else {
      this.activateByKey(
        (activeTab - 1) < 0 ? this.refs.tabs.length - 2 : activeTab - 1,
      );
    }
  }

  handleKeyPress(event) {
    if (!event) return;

    let { target, key } = event;

    if (target.shadow && target.shadow.activeElement) return;

    if (
      Number.isInteger(parseInt(key)) &&
      key <= this.externalRefs.categories.length
    ) {
      this.activateByKey(key - 1);
    }
  }

  activateByKey(key) {
    if (!Number.isInteger(key) || key < 0 || key >= this.externalRefs.categories.length) return;
    this.currentTabIndex = key;

    this.activate(this.refs.tabs, this.refs.tabs[key]);
    this.activate(
      this.externalRefs.categories,
      this.externalRefs.categories[key],
    );
  }

  createTabs() {
    const categoriesCount = this.externalRefs.categories.length;

    for (let i = 0; i <= categoriesCount; i++) {
      const label = i < categoriesCount ? String(i + 1) : "";
      this.refs.indicator.innerHTML += `<li tab-index=${i} data-label="${label}" ${
        i == 0 ? "active" : ""
      }>${label ? `<button type="button" aria-label="Tab ${label}">${label}</button>` : ""}</li>`;
    }

    this.refs.indicator.innerHTML += `<span class="tab-underline"></span>`;
    requestAnimationFrame(() => this.updateTabUnderline());
  }

  activate(target, item) {
    target.forEach((i) => i.removeAttribute("active"));
    item.setAttribute("active", "");

    if (item.parentElement === this.refs.indicator) {
      this.updateTabUnderline();
    }
  }

  updateTabUnderline() {
    const underline = this.shadow.querySelector(".tab-underline");
    const activeTab = this.shadow.querySelector("#tabs ul li[active]:not(:last-child)");
    const list = this.refs.indicator;

    if (!underline || !activeTab || !list) return;

    const listRect = list.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    const width = Math.max(10, Math.round(tabRect.width * 0.8));
    const x = Math.round(tabRect.left - listRect.left + (tabRect.width - width) / 2);

    underline.style.width = `${width}px`;
    underline.style.transform = `translateX(${x}px)`;
  }

  connectedCallback() {
    this.render().then(() => {
      this.createTabs();
      this.setEvents();
      this.openLastVisitedTab();
      window.addEventListener("resize", () => this.updateTabUnderline(), { passive: true });
    });
  }
}
