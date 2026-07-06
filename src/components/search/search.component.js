class Search extends Component {
  refs = {
    search: "#search",
    input: "#search input[type=\"text\"]",
    suggestions: ".suggestions",
  };

  constructor() {
    super();
    this.defaultEngine = Object.values(CONFIG.search.engines)[0][0];
    this.suggestions = [];
    this.selectedSuggestion = -1;
    this.suggestionRequest = 0;
    this.suggestionDebounce = null;
    this.suggestionController = null;
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

      .suggestions {
          position: absolute;
          top: calc(100% + 8px);
          right: 8px;
          left: 8px;
          z-index: 30;
          display: none;
          overflow: hidden;
          border: 1px solid rgba(13, 217, 253, 0.22);
          border-radius: 16px;
          background: rgba(2, 4, 8, 0.96);
          box-shadow:
              0 18px 48px rgba(0, 0, 0, 0.46),
              0 0 30px rgba(13, 217, 253, 0.1);
      }

      .suggestions[open] {
          display: block;
      }

      #search .suggestions button {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          height: 36px;
          padding: 0 14px;
          border: 0;
          border-radius: 0;
          background: transparent;
          color: rgba(245, 247, 255, 0.88);
          font: 500 14px 'Roboto', sans-serif;
          text-align: left;
      }

      #search .suggestions button:hover,
      #search .suggestions button[active] {
          background: rgba(13, 217, 253, 0.12);
          color: #fff;
      }

      .suggestions .typed {
          color: rgba(245, 247, 255, 0.82);
      }

      .suggestions .completion {
          color: #0dd9fd;
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
          <div class="suggestions" role="listbox"></div>
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
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.moveSuggestion(1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      this.moveSuggestion(-1);
      return;
    }

    if (event.key === "Escape") {
      this.clearSuggestions();
      return;
    }

    if (event.key === "Enter") {
      if (this.selectedSuggestion >= 0 && this.suggestions[this.selectedSuggestion]) {
        this.search(this.suggestions[this.selectedSuggestion]);
      } else {
        this.search(event.target.value);
      }
    }
  }

  escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;",
    })[char]);
  }

  renderSuggestionText(suggestion, query) {
    const lowerSuggestion = suggestion.toLocaleLowerCase();
    const lowerQuery = query.toLocaleLowerCase();

    if (lowerQuery && lowerSuggestion.startsWith(lowerQuery)) {
      const completion = this.escapeHtml(suggestion.slice(query.length)).replace(/^ /, "&nbsp;");
      return `<span class="typed">${this.escapeHtml(suggestion.slice(0, query.length))}</span><span class="completion">${completion}</span>`;
    }

    return `<span class="completion">${this.escapeHtml(suggestion)}</span>`;
  }

  renderSuggestions(query, suggestions) {
    const list = this.shadow.querySelector(".suggestions");
    this.suggestions = suggestions.slice(0, 8);
    this.selectedSuggestion = -1;

    if (!this.suggestions.length) {
      this.clearSuggestions();
      return;
    }

    list.innerHTML = this.suggestions.map((suggestion, index) => `
      <button type="button" role="option" data-index="${index}">
        ${this.renderSuggestionText(suggestion, query)}
      </button>
    `).join("");
    list.setAttribute("open", "");

    list.querySelectorAll("button").forEach((button) => {
      button.addEventListener("mousedown", (event) => event.preventDefault());
      button.addEventListener("click", () => {
        this.search(this.suggestions[Number(button.dataset.index)]);
      });
    });
  }

  clearSuggestions() {
    const list = this.shadow.querySelector(".suggestions");
    this.suggestions = [];
    this.selectedSuggestion = -1;
    list.innerHTML = "";
    list.removeAttribute("open");
  }

  moveSuggestion(direction) {
    if (!this.suggestions.length) return;

    this.selectedSuggestion = (this.selectedSuggestion + direction + this.suggestions.length) % this.suggestions.length;
    const buttons = this.shadow.querySelectorAll(".suggestions button");
    buttons.forEach((button, index) => {
      button.toggleAttribute("active", index === this.selectedSuggestion);
    });

    const input = this.shadow.querySelector("input[type=\"text\"]");
    input.value = this.suggestions[this.selectedSuggestion];
  }

  fetchSuggestions(query) {
    const value = query.trim();
    window.clearTimeout(this.suggestionDebounce);

    if (!value) {
      this.clearSuggestions();
      return;
    }

    this.suggestionDebounce = window.setTimeout(() => {
      const requestId = ++this.suggestionRequest;
      this.suggestionController?.abort();
      this.suggestionController = new AbortController();

      fetch(`/api/suggest?q=${encodeURIComponent(value)}`, {
        signal: this.suggestionController.signal,
        cache: "no-store",
      })
        .then((response) => response.ok ? response.json() : { suggestions: [] })
        .then((payload) => {
          if (requestId !== this.suggestionRequest) return;
          const suggestions = Array.isArray(payload?.suggestions) ? payload.suggestions : [];
          this.renderSuggestions(value, suggestions);
        })
        .catch((error) => {
          if (error.name !== "AbortError" && requestId === this.suggestionRequest) {
            this.clearSuggestions();
          }
        });
    }, 140);
  }

  setEvents() {
    const input = this.shadow.querySelector("input[type=\"text\"]");
    const button = this.shadow.querySelector("button");

    input.addEventListener("keydown", (event) => this.handleSearch(event));
    input.addEventListener("input", () => this.fetchSuggestions(input.value));
    input.addEventListener("blur", () => {
      window.setTimeout(() => this.clearSuggestions(), 120);
    });
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
