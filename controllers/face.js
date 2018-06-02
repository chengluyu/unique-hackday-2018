const mq = require('../libs/mq');

module.exports = {
  post: async (ctx) => {
    const { path } = ctx.file;
    console.log(path);
  }
}