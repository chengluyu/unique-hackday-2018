const mq = require('../libs/mq');

module.exports = {
  post: async (ctx) => {
    const { path } = ctx.req.file;
    console.log(path);
  }
}