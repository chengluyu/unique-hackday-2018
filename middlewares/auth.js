const passport = require('koa-passport');

const authorizationMiddleware = async (ctx, next) => {
  if(ctx.query === undefined || ctx.query.captcha === undefined || ctx.session.captcha === undefined || ctx.query.captcha.toUpperCase() != ctx.session.captcha.toUpperCase()) {
    return ctx.state = { code: 120, data: { err: '验证码错误' } };
  }
  return passport.authenticate('local', async (err, user, info, status) => {
    if(err || user === false) {
      ctx.loginState = {};  
    } else if(user.activated === false) {
      ctx.loginState = { notActivated: true }
    } else {
      ctx.loginState = { success: true, userinfo: { ...user.userinfo, username: user.username } };
      await ctx.login(user);
    }
    return next();
  })(ctx);
}

const validationMiddleware = async (ctx, next) => {
  if(ctx.isAuthenticated()) {
    return next();
  } else {
    ctx.state = { code: 110, data: '请先登录' };
  }
}

module.exports = {
  authorizationMiddleware,
  validationMiddleware,
}