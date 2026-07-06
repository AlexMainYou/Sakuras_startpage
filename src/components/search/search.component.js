class Search extends Component {
  refs = {
    search: "#search",
    input: "#search input[type=\"text\"]",
  };

  constructor() {
    super();
    this.defaultEngine = Object.values(CONFIG.search.engines)[0][0];
  }

  style() {
    return `
      :host {
          display: block;
          width: 100%;
      }

      #search {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 48px;
          background: var(--btn-bg);
          z-index: 20;
          position: relative;
          border: 1px solid var(--btn-border);
          border-radius: 999px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
      }

      #search:focus-within {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(13, 217, 253, 0.46);
          box-shadow:
              0 0 0 2px rgba(13, 217, 253, 0.2),
              0 0 15px rgba(13, 217, 253, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }

      #search .search-box {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 38px;
          align-items: center;
          gap: 8px;
          position: relative;
          width: 100%;
          padding: 0 6px 0 16px;
      }

      #search input {
          border: 0;
          outline: 0;
          width: 100%;
          padding: .5em 0;
          background: none;
          font: 500 16px 'Roboto', sans-serif;
          letter-spacing: 0;
          color: rgba(245, 247, 255, 0.94);
          text-align: left;
      }

      #search button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border: 1px solid var(--btn-border);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          color: rgba(245, 247, 255, 0.9);
          cursor: pointer;
          transition: border-color .15s ease, color .15s ease, background .15s ease;
      }

      #search button:hover,
      #search button:focus {
          border-color: #0dd9fd;
          color: #0dd9fd;
          background: rgba(13, 217, 253, 0.1);
          outline: 0;
      }

      #search button .material-icons {
          font-size: 22px;
          line-height: 1;
      }

      #search input::placeholder {
          color: rgba(245, 247, 255, 0.34);
      }

      #search input::selection {
          background: #0dd9fd;
          color: #05070c;
      }
    `;
  }

  imports() {
    return [
      this.resources.fonts.roboto,
      this.resources.icons.material,
    ];
  }

  template() {
    return `
        <div id="search">
          <div class="search-box">
            <input type="text" spellcheck="false" placeholder="Search">
            <button type="button" title="Search" aria-label="Search">
              <i class="material-icons">search</i>
            </button>
          </div>
        </div>
    `;
  }

  search(query) {
    const value = query.trim();
    if (value) {
      window.location = this.defaultEngine + encodeURI(value);
    }
  }

  handleSearch(event) {
    if (event.key === "Enter") {
      this.search(event.target.value);
    }
  }

  setEvents() {
    const input = this.shadow.querySelector("input[type=\"text\"]");
    const button = this.shadow.querySelector("button");

    input.addEventListener("keyup", (event) => this.handleSearch(event));
    button.addEventListener("click", () => this.search(input.value));
  }

  connectedCallback() {
    this.render().then(() => {
      this.setEvents();
      setTimeout(() => {
        this.shadow.querySelector("input[type=\"text\"]").focus();
      }, 200);
    });
  }
}
