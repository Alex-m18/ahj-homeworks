export default class HelpDeskWidget {
  constructor() {
    this.container = null;
    this.element = null;
    this.addEventListeners = [];
    this.editEventListeners = [];
    this.deleteEventListeners = [];
    this.ticketClickEventListeners = [];
    this.statusChangedEventListeners = [];
  }

  init() {
    if (!this.container) throw new Error('container not set');

    this.element = document.createElement('div');
    this.element.id = 'help_desk_widget';
    this.element.classList.add('help_desk_widget');
    this.container.appendChild(this.element);

    this.addButtonEl = document.createElement('div');
    this.addButtonEl.id = 'ticket_add_btn';
    this.addButtonEl.classList.add('ticket_add_btn');
    this.addButtonEl.textContent = 'Добавить тикет';
    this.element.appendChild(this.addButtonEl);

    this.ticketsAreaEl = document.createElement('div');
    this.ticketsAreaEl.id = 'tickets_area';
    this.ticketsAreaEl.classList.add('tickets_area');
    this.element.appendChild(this.ticketsAreaEl);

    this.addButtonEl.addEventListener('click', this.onAdd.bind(this));
    this.ticketsAreaEl.addEventListener('click', this.onTicketsAreaClick.bind(this));
  }

  update(tickets = []) {
    Array.from(this.ticketsAreaEl.children)
      .forEach((o) => this.ticketsAreaEl.removeChild(o));

    for (const ticket of tickets) {
      const ticketEl = document.createElement('div');
      ticketEl.classList.add('ticket');
      ticketEl.setAttribute('data-id', ticket.id);
      this.ticketsAreaEl.appendChild(ticketEl);

      const ticketMainEl = document.createElement('div');
      ticketMainEl.classList.add('ticket_main');
      ticketEl.appendChild(ticketMainEl);

      const ticketDescriptionEl = document.createElement('div');
      ticketDescriptionEl.classList.add('ticket_description');
      ticketDescriptionEl.textContent = ticket.description ? ticket.description : '';
      ticketEl.appendChild(ticketDescriptionEl);

      // Ticket main row
      const ticketStatusEl = document.createElement('div');
      const ticketNameEl = document.createElement('div');
      const ticketCreatedEl = document.createElement('div');

      ticketStatusEl.classList.add('ticket_status');
      ticketNameEl.classList.add('ticket_name');
      ticketCreatedEl.classList.add('ticket_time_stamp');

      if (ticket.status) ticketStatusEl.classList.add('checked');
      ticketNameEl.textContent = ticket.name;
      ticketCreatedEl.textContent = HelpDeskWidget.formatDate(new Date(ticket.created));

      ticketMainEl.appendChild(ticketStatusEl);
      ticketMainEl.appendChild(ticketNameEl);
      ticketMainEl.appendChild(ticketCreatedEl);

      // Ticket actions buttons
      const ticketActionsEl = document.createElement('div');
      ticketActionsEl.classList.add('ticket_action');
      ticketMainEl.appendChild(ticketActionsEl);

      const ticketEditEl = document.createElement('div');
      ticketEditEl.classList.add('ticket_edit');
      ticketActionsEl.appendChild(ticketEditEl);

      const ticketDeleteEl = document.createElement('div');
      ticketDeleteEl.classList.add('ticket_delete');
      ticketActionsEl.appendChild(ticketDeleteEl);
    }
  }

  toggleDescription(ticket) {
    [...this.ticketsAreaEl.children]
      .filter((o) => o.getAttribute('data-id') !== ticket.id)
      .forEach((o) => o.querySelector('.ticket_description').classList.remove('show'));

    const ticketEl = this.ticketsAreaEl
      .querySelector(`[data-id="${ticket.id}"]`)
      .querySelector('.ticket_description');

    ticketEl.textContent = ticket.description;
    ticketEl.classList.toggle('show');
  }

  bindToDOM(container) {
    this.container = container;
  }

  addOnAddEventListener(callback) {
    this.addEventListeners.push(callback);
  }

  addOnEditEventListener(callback) {
    this.editEventListeners.push(callback);
  }

  addOnDeleteEventListener(callback) {
    this.deleteEventListeners.push(callback);
  }

  addOnTicketClickEventListener(callback) {
    this.ticketClickEventListeners.push(callback);
  }

  addOnStatusChangedEventListener(callback) {
    this.statusChangedEventListeners.push(callback);
  }

  onTicketsAreaClick(event) {
    const id = event.target.closest('.ticket').getAttribute('data-id');

    if (event.target.classList.contains('ticket_edit')) {
      this.onEdit(id);
      return;
    }
    if (event.target.classList.contains('ticket_delete')) {
      this.onDelete(id);
      return;
    }
    if (event.target.classList.contains('ticket_status')) {
      const status = !event.target.classList.contains('checked');
      this.onStatusChanged(id, status);
      return;
    }

    if (id) this.onTicketClick(id);
  }

  onAdd() {
    this.addEventListeners.forEach((o) => o.call(null));
  }

  onEdit(id) {
    this.editEventListeners.forEach((o) => o.call(null, id));
  }

  onDelete(id) {
    this.deleteEventListeners.forEach((o) => o.call(null, id));
  }

  onTicketClick(id) {
    this.ticketClickEventListeners.forEach((o) => o.call(null, id));
  }

  onStatusChanged(id, status) {
    this.statusChangedEventListeners.forEach((o) => o.call(null, id, status));
  }
}

HelpDeskWidget.formatDate = (date) => {
  const addZero = (x) => ((x < 10) ? `0${x}` : x);

  const DD = addZero(date.getDate());
  const MM = addZero(date.getMonth() + 1);
  const YY = addZero(date.getFullYear() % 100);
  const HH = addZero(date.getHours());
  const mm = addZero(date.getMinutes());

  return `${DD}.${MM}.${YY} ${HH}:${mm}`;
};
