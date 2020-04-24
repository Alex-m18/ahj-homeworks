import formatDate from './formatDate';

export default class OnlineReportWidget {
  constructor(url) {
    this.url = url;
    this.container = null;
    this.element = null;
    this.messagesContainer = null;
  }

  init() {
    // Make html
    this.element = document.createElement('div');
    this.element.classList.add('online_report_widget');
    this.element.id = 'online_report_widget';
    this.container.appendChild(this.element);

    this.messagesContainer = document.createElement('div');
    this.messagesContainer.classList.add('report_area');
    this.element.appendChild(this.messagesContainer);

    // Add event listeners
    this.eventSource = new EventSource(this.url);
    this.eventSource.addEventListener('message', this.onAdd.bind(this));
    this.eventSource.addEventListener('open', (evt) => {
      console.log('connected');
    });
    this.eventSource.addEventListener('error', (evt) => {
      console.log('error');
    });
  }

  createReport(event) {
    const reportEl = document.createElement('div');
    reportEl.classList.add('report');
    reportEl.innerHTML = `
      <div class="report_time">${formatDate(event.date)}</div>
      <div class="content">
        <div class="report_status ${event.type}"></div>
        <div class="report_content">${event.message}</div>
      </div>
    `;
    return reportEl;
  }

  bindToDOM(container) {
    this.container = container;
  }

  onAdd(evt) {
    const flag = this.messagesContainer.scrollTop === (this.messagesContainer.scrollHeight - this.messagesContainer.clientHeight);
    this.messagesContainer.appendChild(
      this.createReport(JSON.parse(evt.data))
    );
    if (flag) this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  onDeletePreview(id) {
    this.deleteEventListeners.forEach((c) => c.call(null, id));
  }
}
