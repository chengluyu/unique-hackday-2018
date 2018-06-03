const UserModel = require('../models/user');
//const mq = require('../libs/mq');
const config = require('../config').mongodb;
const schemas = require('../schemas');

module.exports = async (ctx, next) => {
  if (schemas.validateRegister(ctx.request.body)) {
    const { username, password, email } = ctx.request.body;
    const user = new UserModel({ username, password, userinfo: { email } });
    console.log(user);
    console.log(ctx.request.body);
    try {
      const res = await user.save();
    } catch(e) {
      const { code, errmsg } = e.toJSON();
      if(code === 11000) {
        if(errmsg.indexOf(config.username_index) !== -1) {
          ctx.state = { code: 501, data: { err: '用户已存在' } };
        } else {
          ctx.state = { code: 502, data: { err: '邮箱已存在' } };
        }
      } else {
        console.warn(e);
        ctx.state = { code: 503, data: { err: '内部错误' } };
      }
    }
  } else {
    ctx.state = { code: 504, data: { err: '非法参数' } };
  }
}
