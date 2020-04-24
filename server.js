const eventMessages = require('./eventMessages');
const Game = require('./Game');

const http = require("http");

const Koa = require("koa");
const koaBody = require("koa-body");
const Router = require('koa-router');
const router = new Router();
const app = new Koa();
const { streamEvents } = require("http-event-stream");

const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const game = new Game(eventMessages);
game.start('Игра началась');

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

router.get("/sse", async (ctx) => {
  streamEvents(ctx.req, ctx.res, {
    async fetch(lastEventId) {
      console.log(lastEventId);
      return game.getEventsFrom(lastEventId).map(o => ({ id: o.id, event: 'message', data: JSON.stringify(o) }));
    },
    stream(sse) {
      const sendEvent = (event) => {
        sse.sendEvent({ id: event.id, event: 'message', data: JSON.stringify(event) });
      }; 
      game.addEventsListener(sendEvent);
      return () => { game.removeEventsListener(sendEvent); };
    },
  });
  ctx.respond = false; // koa не будет обрабатывать ответ
});

app.use(router.routes());
app.use(router.allowedMethods());


// Run server
const port = process.env.PORT || 7070;
const server = http.createServer(app.callback()).listen(port);
console.log(`Server is listening on port ${port}`);
