class Search extends Component {
  refs = {
    search: '#search',
    input: '#search input[type="text"]'
  };

  constructor() {
    super();
    // Берем первый движок из конфига как дефолтный (обычно это Yandex/Google)
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
          height: 52px;
          background: #282828;
          z-index: 20;
          position: relative;
          border-bottom: 1px solid #32302f;
      }

      #search .search-box {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 40px;
          align-items: center;
          gap: 8px;
          position: relative;
          width: 100%;
      }

      #search input {
          border: 0;
          outline: 0;
          width: 100%;
          padding: .5em 0;
          background: none;
          font: 500 18px 'Roboto', sans-serif;
          letter-spacing: 0;
          color: #d4be98;
          text-align: center; /* Центрируем текст */
      }

      #search button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid #3c3836;
          border-radius: 6px;
          background: #32302f;
          color: #d4be98;
          cursor: pointer;
          transition: border-color .15s ease, color .15s ease, background .15s ease;
      }

      #search button:hover,
      #search button:focus {
          border-color: #e78a4e;
          color: #e78a4e;
          background: #3c3836;
          outline: 0;
      }

      #search button .material-icons {
          font-size: 22px;
          line-height: 1;
      }

      #search input::placeholder {
          color: rgba(212, 190, 152, 0.3);
      }

      #search input:focus {
          /* Подсветка при наборе */
          border-bottom: 1px solid #d4be98;
      }

      #search input::selection {
          background: #e78a4e;
          color: #32302f;
      }
    `;
  }

  imports() {
    return [
      this.resources.fonts.roboto,
      this.resources.icons.material
    ];
  }

  template() {
    return `
        <div id="search">
          <div class="search-box">
            <input type="text" spellcheck="false" placeholder="Что ищем?">
            <button type="button" title="Искать" aria-label="Искать">
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
    if (event.key === 'Enter') {
      this.search(event.target.value);
    }
  }

  setEvents() {
    const input = this.shadow.querySelector('input[type="text"]');
    const button = this.shadow.querySelector('button');

    input.addEventListener('keyup', (event) => this.handleSearch(event));
    button.addEventListener('click', () => this.search(input.value));
  }

  connectedCallback() {
    this.render().then(() => {
      this.setEvents();
      // Автофокус при загрузке
      setTimeout(() => {
        this.shadow.querySelector('input[type="text"]').focus();
      }, 200);
    });
  }
}
