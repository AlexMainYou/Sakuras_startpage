class Weather extends Component {
  refs = {
    temperature: ".weather-temperature-value",
    scale: ".weather-temperature-scale",
  };

  location;

  constructor() {
    super();

    this.setDependencies();
    this.setEvents();
  }

  setEvents() {
    this.onclick = this.swapScale;
  }

  setDependencies() {
    this.location = CONFIG.temperature.location;
    this.temperatureScale = CONFIG.temperature.scale;
    this.weatherForecast = new WeatherForecastClient(this.location);
  }

  imports() {
    return [
      this.resources.fonts.roboto,
    ];
  }

  style() {
    return `
      .weather-temperature {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(245, 247, 255, 0.92);
          font: 700 13px 'Roboto', sans-serif;
          white-space: nowrap;
      }

      .weather-temperature-value {
          font-weight: 700;
      }
    `;
  }

  async template() {
    return `
        <p class="+ weather-temperature">
            <span class="weather-temperature-value">--</span>
            &deg;<span class="weather-temperature-scale">${this.temperatureScale}</span>
        </p>`;
  }

  toC(f) { return Math.round((f - 32) * 5 / 9); }

  toF(c) { return Math.round(c * 9 / 5 + 32); }

  swapScale() {
    this.temperatureScale = this.temperatureScale === "C" ? "F" : "C";

    CONFIG.temperature = {
      ...CONFIG.temperature,
      scale: this.temperatureScale,
    };

    this.setTemperature();
  }

  convertScale(temperature) {
    if (this.temperatureScale === "F")
      return this.toF(temperature);

    return temperature;
  }

  async setWeather() {
    this.weather = await this.weatherForecast.getWeather();
    this.setTemperature();
  }

  setTemperature() {
    const { temperature } = this.weather;

    this.refs.temperature = this.convertScale(temperature);
    this.refs.scale = this.temperatureScale;
  }

  async connectedCallback() {
    await this.render();
    await this.setWeather();
  }
}
