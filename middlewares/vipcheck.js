const moment = require('moment');
const UserModel = require('../models/user');

const vipCheckMiddleware = async (ctx, next) => {
  try {
    const user = await UserModel.findById(ctx.session.passport.user);
    if(user.userinfo.vipExpireDate && moment().isBefore(user.userinfo.vipExpireDate)) {
      return next();
    } else {
      ctx.state = { code: 401, data: { err: '请充值vip' } };
    }
  } catch (e) {
    console.warn(e);
    ctx.state = { code: 1000, data: { err: '内部错误' } };
  }
}

module.exports = {
  vipCheckMiddleware,
}