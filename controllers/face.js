const mq = require('../libs/mq');

module.exports = {
  post: async (ctx) => {
    const { file } = ctx.req;
    console.log(file);
  }
}