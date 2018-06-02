const UserModel = require('../models/user');

module.exports = {
  get: async (ctx) => {
    const user = await UserModel.findById(ctx.session.passport.user);
    if(user) {
      ctx.state.data = user.userinfo;
    } else {
      ctx.state = { code: 200, data: { err: '' } };
    }
  },

  post: async (ctx) => {

  }
}