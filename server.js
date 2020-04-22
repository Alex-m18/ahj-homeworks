const http = require("http");
const Koa = require("koa");
const koaBody = require("koa-body");
const uuid = require("uuid");

const app = new Koa();

// Set up database
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync', {
    serialize: (data) => encrypt(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decrypt(data))
});
const db = low(new FileSync('db.json'));
if(!db.get('tickets').value()) setDefaultTickets(db);

function setDefaultTickets(db) {
  db.defaults({
    tickets: [
      { id: 1, name: 'Buy a bread', description: 'brown bread', status: false, created: new Date() },
      { id: 2, name: 'Buy a milk', description: '2l', status: true, created: new Date() },
      { id: 3, name: 'Buy a fish', description: 'tuna', status: false, created: new Date() },
      { id: 4, name: 'Buy a car', description: 'something red', status: false, created: new Date() }
    ]
  }).write();
}

// Koa body
app.use(koaBody({
  urlencoded: true,
}));

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
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
    });
    if (ctx.request.get("Access-Control-Request-Headers")) {
      ctx.response.set(
        "Access-Control-Allow-Headers",
        ctx.request.get("Access-Control-Allow-Request-Headers")
      );
    }
    ctx.response.status = 204;
  }
});

// GET /tickets
app.use(async (ctx, next) => {
  if (ctx.request.method === "GET") {
    if (ctx.request.url.startsWith('/tickets')) {
      if (ctx.request.query.id) {
        const ticket = db.get('tickets').filter({ id: ctx.request.query.id }).value();
        if (!ticket.length) {
          ctx.response.status = 404;
          ctx.response.body = 'Ticket not found';
          return await next();
        }
        ctx.response.status = 200;
        ctx.response.body = ticket;
        return await next();
      }

      ctx.response.status = 200;
      const tickets = db.get('tickets').value();
      
      ctx.response.body = Array.from(tickets).map((o) => ({
          id: o.id,
          name: o.name,
          status: o.status,
          created: o.created 
        }));
      return await next();
    }
  }
  return await next();
});

// POST /tickets
app.use(async (ctx, next) => {
  if (ctx.request.method === "POST") {
    if (!ctx.request.url.startsWith('/tickets')) {
      ctx.response.status = 417;
      ctx.response.body = '"/tickets" expected';
      return await next();
    }

    if (!ctx.is( 'application/json')) {
      ctx.response.status = 417;
      ctx.response.body = '"application/json" expected';
      return await next();
    }

    const ticket = ctx.request.body;
    if (!ticket) {
      ctx.response.status = 417;
      ctx.response.body = 'object expected';
      return await next();
    }
    
    ticket.id = uuid.v4();
    ticket.created = new Date();
    db.get('tickets').push(ticket).write();

    ctx.response.status = 200;
    ctx.response.body = 'Ticket created';
  }
  return await next();
});

// PUT /tickets
app.use(async (ctx, next) => {
  if (ctx.request.method === "PUT") {
    if (!ctx.request.url.startsWith('/tickets')) {
      ctx.response.status = 417;
      ctx.response.body = '"/tickets" expected';
      return await next();
    }

    const ticket = ctx.request.body;

    if (!ticket) {
      ctx.response.status = 417;
      ctx.response.body = 'object expected';
      return await next();
    }
    
    if (!db.get('tickets').filter({ id: ticket.id }).value().length) {
      ctx.response.status = 404;
      ctx.response.body = 'Ticket not found';
      return await next();
    }

    db.get('tickets')
      .find({ id: ticket.id })
      .assign(ticket)
      .write();

    ctx.response.status = 200;
    ctx.response.body = 'Ticket updated';
  }
  return await next();
});

// PATCH /tickets
app.use(async (ctx, next) => {
  if (ctx.request.method === "PATCH") {
    if (!ctx.request.url.startsWith('/tickets')) {
      ctx.response.status = 417;
      ctx.response.body = '"/tickets" expected';
      return await next();
    }

    const ticket = db.get('tickets').filter({ id: ctx.request.query.id }).value();
    if (!ticket.length) {
      ctx.response.status = 404;
      ctx.response.body = 'Ticket not found';
      return await next();
    }

    const ticketStatusUpdate = {};
    ticketStatusUpdate.id = ctx.request.body.id;
    ticketStatusUpdate.status = ctx.request.body.status;

    if (!ticketStatusUpdate) {
      ctx.response.status = 417;
      ctx.response.body = 'ticketStatusUpdate object expected';
      return await next();
    }

    if (ticketStatusUpdate.id !== ctx.request.query.id) {
      ctx.response.status = 409;
      ctx.response.body = 'id conflict';
      return await next();
    }

    db.get('tickets')
      .find({ id: ticketStatusUpdate.id })
      .assign(ticketStatusUpdate)
      .write();

    ctx.response.status = 200;
    ctx.response.body = 'Ticket updated';
  }
  return await next();
});

// DELETE /tickets
app.use(async (ctx, next) => {
  if (ctx.request.method === "DELETE") {
    if (!ctx.request.url.startsWith('/tickets')) {
      ctx.response.status = 417;
      ctx.response.body = '"/tickets" expected';
      return await next();
    }

    const ticket = db.get('tickets').filter({ id: ctx.request.query.id }).value();
    if (!ticket.length) {
      ctx.response.status = 404;
      ctx.response.body = 'Ticket not found';
      return await next();
    }
    console.log(ticket);
    db.get('tickets')
      .remove({ id: ctx.request.query.id })
      .write();

    ctx.response.status = 200;
    ctx.response.body = 'Ticket deleted';
  }
  return await next();
});

// Run server
const port = process.env.PORT || 7070;
const server = http.createServer(app.callback()).listen(port);
console.log(`Server is listening on port ${port}`);
