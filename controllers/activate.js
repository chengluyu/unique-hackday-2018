const UserModel = require('../models/user');
const { ObjectId } = require('mongoose').Types;

module.exports = async (ctx, next) => {
  if(ctx.query) {
    const { token } = ctx.query;
    if(token && token.length === 24) {
      const res = await UserModel.updateOne({ _id: ObjectId(token) }, { $set: { activated: true } });
      if(res.n === 1 && res.ok === 1) {
        ctx.state.data = { msg: '账号激活成功！' };
      } else {
        ctx.state = { code: 602, data: { err: '非法Token' } };
      }
    } else {
      ctx.state = { code: 601, data: { err: '非法参数' } };
    }
  }
}
