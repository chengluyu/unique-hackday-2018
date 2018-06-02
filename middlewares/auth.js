const passport = require('koa-passport');

const authorizationMiddleware = async (ctx, next) => {
  if(ctx.query === undefined) {
    return ctx.state = { code: 120, data: { err: 'err' } };
  }
  return passport.authenticate('local', async (err, user, info, status) => {
    if(err || user === false) {
      ctx.loginState = {};
    } else if(user.activated === false) {
      ctx.loginState = { notActivated: true };
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