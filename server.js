const http = require("http");

const Koa = require("koa");
const koaBody = require("koa-body");
const app = new Koa();

const path = require('path');
const fs = require('fs');
const uuid = require("uuid");
const public = path.join(__dirname, '/public')

// Set up multer
const multer = require('koa-multer');
const dstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4());
  },
});
const upload = multer({ storage: dstorage }).single('file');

app.use(koaBody({
  urlencoded: true,
}));

const koaStatic = require('koa-static');
app.use(koaStatic('./public'));

// Sync database
if (fs.existsSync('db.json')) fs.unlinkSync('db.json');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync', {
  serialize: (data) => encrypt(JSON.stringify(data)),
  deserialize: (data) => JSON.parse(decrypt(data))
});
const db = low(new FileSync('db.json'));
if(!db.get('pics').value()) db.defaults({ pics: [] }).write();
let pubDir = fs.opendirSync(public);
let f;
while (f = pubDir.readSync()) {
  if (f.name !== '.gitkeep') {
    const pic = { name: f.name };
    db.get('pics').push(pic).write();
  }
}
pubDir = null;

// Koa static initialize
app.use(koaStatic(public));

// Koa body initialize

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
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      );
    }
    ctx.response.status = 204;
  }
});

// GET /pics
app.use(async (ctx, next) => {
  if (ctx.request.method === "GET") {
    if (ctx.request.url.startsWith('/pics')) {

      ctx.response.status = 200;
      const pics = db.get('pics').value();
      
      ctx.response.body = pics.map((o) => ({ name: o.name }));
      return await next();
    }
  }
  return await next();
});

// POST /pics
app.use(async (ctx, next) => {
  if (ctx.request.method === "POST") {
    if (!ctx.request.url.startsWith('/pics')) {
      ctx.response.status = 417;
      ctx.response.body = '"/pics" expected';
      return await next();
    }

    if (!ctx.is('multipart/form-data')) {
      ctx.response.status = 417;
      ctx.response.body = '"multipart/form-data" expected';
      return await next();
    }

    if (!ctx.request.body) {
      ctx.response.status = 417;
      ctx.response.body = 'object expected';
      return await next();
    }

    return await upload(ctx, function(err) {
      console.log();

      const pic = { name: ctx.req.file.filename };

      db.get('pics').push(pic).write();

      ctx.response.status = 200;
      ctx.response.body = { name: pic.name };
    });
  }
  return await next();
});

// DELETE /pics
app.use(async (ctx, next) => {
  if (ctx.request.method === "DELETE") {
    if (!ctx.request.url.startsWith('/pics')) {
      ctx.response.status = 417;
      ctx.response.body = '"/pics" expected';
      return await next();
    }

    const pic = db.get('pics').filter({ name: ctx.request.query.name }).value()[0];
    if (!pic) {
      ctx.response.status = 404;
      ctx.response.body = 'Pic not found';
      return await next();
    }

    fs.unlinkSync(`./public/${ctx.request.query.name}`);

    db.get('pics')
      .remove({ name: ctx.request.query.name })
      .write();

    ctx.response.status = 200;
    ctx.response.body = 'Pic deleted';
  }
  return await next();
});

// Run server
const port = process.env.PORT || 7070;
const server = http.createServer(app.callback()).listen(port);
console.log(`Server is listening on port ${port}`);
