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
      #search {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 60px; /* Высота панели поиска */
          background: #282828;
          z-index: 20;
          position: relative;
          border-bottom: 1px solid #32302f;
      }

      #search div {
          position: relative;
          width: 90%;
      }

      #search input {
          border: 0;
          outline: 0;
          width: 100%;
          padding: .5em 0;
          background: none;
          font: 500 18px 'Roboto', sans-serif;
          letter-spacing: 1px;
          color: #d4be98;
          text-align: center; /* Центрируем текст */
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
          <div>
            <input type="text" spellcheck="false" placeholder="Что ищем?">
          </div>
        </div>
    `;
  }

  handleSearch(event) {
    const { target, key } = event;

    // Если нажат Enter, ищем сразу через дефолтный поисковик
    if (key === 'Enter') {
      const query = target.value;
      if (query) {
        window.location = this.defaultEngine + encodeURI(query);
      }
    }
  }

  setEvents() {
    this.refs.search.onkeyup = (e) => this.handleSearch(e);
  }

  connectedCallback() {
    this.render().then(() => {
      this.setEvents();
      // Автофокус при загрузке
      setTimeout(() => {
        this.refs.input.focus();
      }, 200);
    });
  }
}