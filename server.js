const ChatServer = require('./ChatServer');

const http = require("http");

const Koa = require("koa");
const koaBody = require("koa-body");
const Router = require('koa-router');
const router = new Router();
const app = new Koa();

const chat = new ChatServer();

// Koa body initialize
app.use(
  koaBody({
    urlencoded: true,
  })
);

// Preflight
app.use(async (ctx, next) => {
  const headers = { "Access-Control-Allow-Origin": "*" };
  ctx.response.set({ ...headers });

  const origin = ctx.request.get("Origin");
  if (!origin) {
    return await next();
  }

  if (ctx.request.method !== "OPTIONS") {
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }
  if (ctx.request.get("Access-Control-Request-Method")) {
    ctx.response.set({
      ...headers,
      "Access-Control-Allow-Methods": "GET, POST, DELETE",
    });
    if (ctx.request.get("Access-Control-Request-Headers")) {
      ctx.response.set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
    }
    ctx.response.status = 204;
  }
});

router.get('/users', async (ctx) => {
  ctx.response.type = 200;
  ctx.response.body = chat.getConnectedUsers();
});

app.use(router.routes());
app.use(router.allowedMethods());


// Run server
const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());

const WS = require('ws');
const wsServer = new WS.Server({ server });

wsServer.on('connection', (ws, req) => {
  const errCallback = (err) => {
    if (err) {
      // TODO: handle error
      console.log(err);
    }
  };

  ws.on('message', data => {
    // console.log('msg');
    let msg;
    try { msg = JSON.parse(data) }
    catch (e) { console.log(`Error on ${data}`) }
    if (!msg) return;
    if (msg.type === 'register') {
      ws.send(JSON.stringify({ type: 'register', userID: chat.addUser(msg.userName).id }));
      Array.from(wsServer.clients)
          .filter(o => o.readyState === WS.OPEN)
          .forEach(o => o.send(JSON.stringify({
            type: 'users',
            users: chat.getConnectedUsers(),
          })));
      return;
    }
    if (msg.type === 'getPrevious') {
      ws.send(JSON.stringify({ type: 'previous', messages: chat.getPreviousMessages(msg.count) }), errCallback);
      return;
    }
    if (msg.type === 'message') {
      const message = chat.pushMessage(msg.userID, msg.content);
      if (message) {
        Array.from(wsServer.clients)
          .filter(o => o.readyState === WS.OPEN)
          .forEach(o => o.send(JSON.stringify({
            message,
            type: 'message',
          })));
      }
      return;
    }
    ws.send(JSON.stringify({ type: 'error', message: 'unknown type of message' }), errCallback);
  });

  ws.on('close', data => {
    chat.removeUser((JSON.parse(data)).userID);
    Array.from(wsServer.clients)
          .filter(o => o.readyState === WS.OPEN)
          .forEach(o => o.send(JSON.stringify({
            type: 'users',
            users: chat.getConnectedUsers(),
          })));
  });
  // ws.on('error', evt => {
  //   chat.removeUser(JSON.parse(evt.data).userID);
  //   evt.wasClean = true;
  // });

  // ws.send(JSON.stringify({
  //   connectedUsers: chat.getConnectedUsers(),
  //   // previousMessages: chat.getPreviousMessages(20),
  // }), errCallback);
});

server.listen(port);
console.log(`Server is listening on port ${port}`);
