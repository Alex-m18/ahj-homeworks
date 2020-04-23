import createRequest from './createRequest';

export default class NetApi {
  constructor(url) {
    this.url = url;
  }

  getList(callback) {
    createRequest({
      url: `${this.url}/pics`,
      method: 'GET',
      callback: (err, response) => {
        if (response) callback.call(null, response);
      },
    });
  }

  postPic(formData, callback) {
    createRequest({
      url: `${this.url}/pics`,
      method: 'POST',
      responseType: 'text',
      data: formData,
      callback: (err, response) => {
        if (response) callback.call(null, response);
      },
    });
  }

  deletePic(name, callback) {
    createRequest({
      url: `${this.url}/pics`,
      method: 'DELETE',
      responseType: 'text',
      data: { name },
      callback: (err, response) => {
        if (response) callback.call(null, response);
      },
    });
  }
}
