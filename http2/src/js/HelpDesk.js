export default class HelpDesk {
  constructor(server, widget, ticketForm, confirmForm) {
    this.widget = widget;
    this.ticketForm = ticketForm;
    this.confirmForm = confirmForm;
    this.server = server;
    this.tickets = [];
  }

  init() {
    this.widget.addOnAddEventListener(this.onAdd.bind(this));
    this.widget.addOnEditEventListener(this.onEdit.bind(this));
    this.widget.addOnDeleteEventListener(this.onDelete.bind(this));
    this.widget.addOnTicketClickEventListener(this.onTicketClick.bind(this));
    this.widget.addOnStatusChangedEventListener(this.onStatusChanged.bind(this));

    this.update();
  }

  update() {
    this.server.getTickets((tickets) => {
      this.tickets = tickets;
      this.widget.update(this.tickets);
    });
  }

  onAdd() {
    const onSuccess = (data) => {
      const ticket = {
        name: data.name,
        description: data.description,
        status: false,
      };
      this.ticketForm.hide();
      this.server.postTicket(ticket, () => this.update());
    };
    this.ticketForm.show(
      onSuccess,
      () => this.ticketForm.hide(),
      { title: 'Новый тикет' },
    );
  }

  onEdit(id) {
    this.server.getTicket(id, (ticket) => {
      const onSuccess = (data) => {
        this.ticketForm.hide();
        this.server.updateTicket(
          {
            id: ticket.id,
            name: data.name,
            description: data.description,
          },
          () => this.update(),
        );
      };

      this.ticketForm.show(
        onSuccess,
        () => this.ticketForm.hide(),
        {
          title: 'Редактирование тикета',
          name: ticket.name,
          description: ticket.description,
        },
      );
    });
  }

  onDelete(id) {
    this.confirmForm.show(
      () => {
        this.confirmForm.hide();
        this.server.deleteTicket(id, () => this.update());
      },
      () => this.confirmForm.hide(),
      { message: 'Вы уверены?<br>Тикет будет удален без возможности восстановления' },
    );
  }

  onTicketClick(id) {
    const toggleDescription = (ticket) => {
      this.widget.toggleDescription(ticket);
    };

    const ticket = this.tickets.find((o) => o.id === id);
    if (!ticket.description) {
      this.server.getTicket(id, (t) => {
        ticket.description = t.description;
        toggleDescription(ticket);
      });
      return;
    }
    toggleDescription(ticket);
  }

  onStatusChanged(id, status) {
    this.server.setStatus(id, status, () => this.update());
  }
}
