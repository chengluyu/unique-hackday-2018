const UserModel = require('../models/user');
const mq = require('../libs/mq');
const config = require('../config').mongodb;

const validateUserName = (username) => {
  return /^(\d|[0-9]|[a-z]|[A-Z]|\_){3,20}$/.test(username);
}

const validatePassword = (password) => {
  return /^\S{6,20}$/.test(password);
}

const validateEmail = (email) => {
  return /^[A-Za-z0-9\u4e00-\u9fa5]+@((qq)|(163)|(126)|(gmail))\.com$/.test(email);
}

module.exports = async (ctx, next) => {
  const { username, password, email } = ctx.request.body;
  if(username && password && email && validateUserName(username) && validatePassword(password) && validateEmail(email)) {
    const user = new UserModel({ username, password, userinfo: { email } });
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