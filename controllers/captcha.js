const ccap = require('ccap');

const captcha = ccap();

module.exports = async (ctx, next) => {
  const cap = captcha.get();
  ctx.session.captcha = cap[0];
  ctx.body = cap[1];
}
