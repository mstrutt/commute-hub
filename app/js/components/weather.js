export class WeatherStatus {
  constructor(element) {
    this.element = element;
    this.location = '44418';
    this.init();
  }

  init() {
    this.fetchData();
  }

  formatTemp(temp) {
    return `${(Math.round(temp * 10) / 10).toFixed(1)}°C`;
  }

  formatSpeed(speed) {
    return `${(Math.round(speed * 10) / 10).toFixed(1)}mph`;
  }

  formatDistance(distance) {
    return `${(Math.round(distance * 10) / 10).toFixed(1)} miles`;
  }

  fetchData() {
    fetch(`./weather?location=${this.location}`)
      .then(response => response.json())
      .then((data) => {
        const today = data.consolidated_weather[0];
        this.render(today);
      });
  }

  render(data) {
    this.element.innerHTML = `
      <div class="card">
        <div class="card__header">
          <img class="card__avatar" src="https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg" alt="${data.weather_state_name}" height="40" widht="40" />
          <h2 class="card__title">${this.formatTemp(data.the_temp)}, ${data.weather_state_name}</h2>
          <p class="card__subtitle">Wind speed: ${this.formatSpeed(data.wind_speed)} ${data.wind_direction_compass}</p>
        </div>
        <div class="card__detail">
          <ul class="h-unstyled-list card__description">
            <li>Range: ${this.formatTemp(data.min_temp)} - ${this.formatTemp(data.max_temp)}</li>
            <li>Humidity: ${data.humidity}%</li>
            <li>Visibility: ${this.formatDistance(data.visibility)}</li>
            <li>Predictability: ${data.predictability}%</li>
          </ul>
        </div>
      </div>
    `;
  }
}