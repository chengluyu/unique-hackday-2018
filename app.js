const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const response = require('./middlewares/response');
const cors = require('koa2-cors');
const session = require('koa-session2');
const { RedisStore } = require('./session');
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const db = require('./libs/db');
const mq = require('./libs/mq');

app.use(cors({ credentials: true }));

app.use(serve('./public', { maxage: 21600000 }));

app.use(session({ key: 'sQzfaZc', store: new RedisStore() }));

app.use(response);

app.use(bodyParser({ multipart: true }));

require('./passport');
const passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());

const router = require('./routes');
app.use(router.routes());

mq.open();

require('./libs/recommend');

db(() => {
  app.listen(config.port, () => console.log(`listening on port ${config.port}`));
});
