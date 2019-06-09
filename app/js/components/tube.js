export class TubeStatus {
  constructor(element) {
    this.element = element;
    this.commuteOptions = [
      'dlr',
      'jubilee',
      'northern',
      'victoria'
    ];
    this.init();
  }

  init() {
    this.fetchData();
  }

  fetchData() {
    fetch('./tube_status')
      .then(response => response.json())
      .then((data) => {
        const filteredData = data
          .filter(line => this.commuteOptions.includes(line.id));
        this.render(filteredData);
      });
  }

  render(lines) {
    this.element.innerHTML = lines.map(line => `
      <li id="${line.id}">
        <h3>${line.name} - ${line.modeName}</h3>
        ${line.lineStatuses.map(status => `
          <p>
            ${status.statusSeverityDescription}
            ${ status.reason ? `<p>${status.reason}</p>` : '' }
          <p>
        `).join('')}
      </li>
    `)
    .join('');
  }
}
