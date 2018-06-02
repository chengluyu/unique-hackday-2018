module.exports = async (ctx, next) => {
  if(ctx.loginState.success) {
    ctx.state.data = { userinfo: ctx.loginState.userinfo, time: Math.floor(Date.now() / 1000) };
  } else {
    ctx.state = { code: 100, data: { err: '登录失败' } };
  }
}
