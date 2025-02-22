const Redis = require('ioredis');
const { Store } = require('koa-session2');

class RedisStore extends Store {
  constructor() {
    super();
    this.redis = new Redis();
  }

  async get(sid, ctx) {
    const data = await this.redis.get(`SESSION:${sid}`);
    return JSON.parse(data);
  }

  async set(session, { sid = this.getID(24), maxAge = 2592000000 } = {}, ctx) {
    try {
      await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
    } catch (e) {}
    return sid
  }

  async destory(sid, ctx) {
    return await this.redis.del(`SESSION:${sid}`);
  }
}

module.exports = { RedisStore };