export default function createRequest(options = {}) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        options.callback.call(null, null, xhr.response);
      }
    }
  });

  xhr.responseType = options.responseType ? options.responseType : 'json';
  const url = new URL(options.url);

  if (['GET', 'DELETE'].includes(options.method)) {
    if (options.data) {
      for (const entry of Object.entries(options.data)) {
        url.searchParams.set(entry[0], entry[1]);
      }
    }
    xhr.open(options.method, url);
    try {
      xhr.send();
    } catch (err) {
      options.callback(err);
    }
  }

  if (['POST', 'PUT'].includes(options.method)) {
    if (!options.data) return;

    xhr.open(options.method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    try {
      xhr.send(JSON.stringify(options.data));
    } catch (err) {
      options.callback(err);
    }
  }

  if (options.method === 'PATCH') {
    if (!options.data) return;

    url.searchParams.set('id', options.data.id);

    xhr.open(options.method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    try {
      xhr.send(JSON.stringify(options.data));
    } catch (err) {
      options.callback(err);
    }
  }
}
