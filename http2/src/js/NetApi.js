import createRequest from './createRequest';

export default class NetApi {
  constructor(url) {
    this.url = url;
  }

  getTickets(callback) {
    createRequest({
      url: `${this.url}/tickets`,
      method: 'GET',
      callback: (err, response) => {
        if (response) callback.call(null, response);
      },
    });
  }

  getTicket(id, callback) {
    createRequest({
      url: `${this.url}/tickets`,
      method: 'GET',
      data: { id },
      callback: (err, response) => {
        if (response) callback.call(null, response);
      },
    });
  }

  postTicket(ticket, callback) {
    createRequest({
      url: `${this.url}/tickets`,
      method: 'POST',
      responseType: 'text',
      data: ticket,
      callback: (err, response) => {
        if (response) callback.call(null, response);
      },
    });
  }

  updateTicket(ticket, callback) {
    createRequest({
      url: `${this.url}/tickets`,
      method: 'PUT',
      responseType: 'text',
      data: ticket,
      callback: (err, response) => {
        if (response) callback.call(null, response);
      },
    });
  }

  deleteTicket(id, callback) {
    createRequest({
      url: `${this.url}/tickets`,
      method: 'DELETE',
      responseType: 'text',
      data: { id },
      callback: (err, response) => {
        if (response) callback.call(null, response);
      },
    });
  }

  setStatus(id, status, callback) {
    createRequest({
      url: `${this.url}/tickets`,
      method: 'PATCH',
      responseType: 'text',
      data: { id, status },
      callback: (err, response) => {
        if (response) callback.call(null, response);
      },
    });
  }
}
