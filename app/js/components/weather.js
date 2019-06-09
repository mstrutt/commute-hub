export class WeatherStatus {
  constructor(element) {
    this.element = element;
    this.location = '44418';
    this.init();
  }

  init() {
    this.fetchData();
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
    this.element.innerHTML = JSON.stringify(data, null, 2);
  }
}