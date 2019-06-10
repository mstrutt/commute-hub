export const colourMap = {
  'tfl-rail': 'rgb(0, 25, 168)',
  'london-overground': 'rgb(239, 123, 16)',
  'dlr': 'rgb(0, 175, 173)',
  'bus': 'rgb(220, 36, 31)',
  'bakerloo': 'rgb(178, 99, 0)',
  'hammersmith-city': 'rgb(244, 169, 190)',
  'piccadilly': 'rgb(0, 25, 168)',
  'central': 'rgb(220, 36, 31)',
  'jubilee': 'rgb(161, 165, 167)',
  'victoria': 'rgb(0, 152, 216)',
  'circle': 'rgb(255, 211, 41)',
  'metropolitan': 'rgb(155, 0, 88)',
  'waterloo-city': 'rgb(147, 206, 186)',
  'district': 'rgb(0, 125, 50)',
  'northern': 'rgb(0, 0, 0)',
};

export const LS_KEY = 'tube-lines';

export class TubeStatus {
  constructor(element) {
    this.element = element;
    this.commuteOptions = [];
    this.update = this.update.bind(this);
    this.lines = [];
    this.init();
  }

  init() {
    this.getChecked();
    this.fetchData();
  }

  update() {
    this.getChecked();
    this.render();
  }

  getChecked() {
    const data = window.localStorage.getItem(LS_KEY);
    if (!data) {
      return;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      return;
    }
    this.commuteOptions = parsed;
  }

  fetchData() {
    fetch('./tube_status')
      .then(response => response.json())
      .then((data) => {
        this.lines = data;
        this.render();
      });
  }

  render() {
    this.element.innerHTML = this.lines
      .filter(line => this.commuteOptions.includes(line.id) || !this.commuteOptions.length)
      .map(line => {
        const primaryStatus = line.lineStatuses[0].statusSeverityDescription;
        const detailedStatus = line.lineStatuses
          .filter((status, i) => i > 0 || status.reason);
        return `
          <li class="card" id="${line.id}" style="border-bottom: 8px solid ${colourMap[line.id]}">
            <div class="card__header">
              <img class="card__avatar card__avatar--tfl" src="./logos/${line.modeName}.svg" alt="${line.modeName}" width="50" height="40" />
              <h3 class="card__title">${line.name}</h3>
              <p class="card__subtitle">${primaryStatus}</p>
            </div>
            ${(() => {
              if (!detailedStatus.length) {
                return '';
              }
              return `<div class="card__detail">
                ${detailedStatus.map(status => `
                  <p class="card__description">
                    ${status.statusSeverityDescription}
                    ${ status.reason ? `- ${status.reason}` : '' }
                  <p>
                `).join('')}
              </div>`;
            })()}
          </li>
        `;
      })
      .join('');
  }
}
