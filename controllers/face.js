const mq = require('../libs/mq');

module.exports = {
  post: async (ctx) => {
    console.log('face post');
    console.log(ctx.req.files);
  }
}